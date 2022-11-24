import { getNewWeek, destructServices } from "../tools/tools";
import { url, apiKey, urlUser } from "../../config/config";
import axios from "axios";

export const sendSelectedDate = (selectDate, setTreeWeek) => {
  let token = document?.cookie.split("=")[1];
  const apiUrl = url + "/event/calendar?cal_date=" + String(selectDate);
  axios
    .get(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => {
      const newTree = resp.data;
      setTreeWeek(newTree);
    });
};

export const getCurrentWeek = (setTreeWeek) => {
  let token = document?.cookie.split("=")[1];
  const date = new Date().toLocaleDateString("fr-CA");
  const apiUrl = url + "/event/calendar?cal_date=" + String(date);
  console.log("date", date);
  axios
    .get(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => {
      const newTree = resp.data;
      console.log("response", newTree);
      setTreeWeek(newTree);
    });
};

export const changeWeek = (treeWeek, setTreeWeek, direction) => {
  let token = document?.cookie.split("=")[1];
  const date = getNewWeek(treeWeek, direction);
  const apiUrl = url + "/event/calendar?cal_date=" + String(date);
  axios
    .get(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => {
      const newTree = resp.data;
      console.log("response", newTree);
      setTreeWeek(newTree);
    });
};

export const getServices = (setServices) => {
  let token = document?.cookie.split("=")[1];
  const apiUrl = url + "/service";
  axios
    .get(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => {
      console.log("getServices", resp);
      const newServices = resp.data;
      setServices(newServices);
    });
};

export const deleteEvent = (
  eventId,
  setTreeWeek,
  setDeleteState,
  setEventModalActive,
  setRepeatSettingsClass,
  setEventForm
) => {
  let token = document?.cookie.split("=")[1];
  const apiUrl = url + "/event/event_day/?event_day_id=" + String(eventId);
  axios
    .delete(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => {
      const newTree = resp.data;
      console.log("response", newTree);
      setTreeWeek(newTree);
      setDeleteState && setDeleteState(false);
      setEventModalActive({ active: false, event: false });
      setRepeatSettingsClass("");
      setEventForm({
        name: "",
        dateStart: "",
        dateEnd: "",
        timeStart: "",
        timeEnd: "",
        selection: [],
        repeatEnd: "",
        repeatWeek: [],
        id: "",
        global_id: "",
      });
    });
};

export const setEvent = (
  eventForm,
  setTreeWeek,
  setEventModalActive,
  setRepeatSettingsClass,
  setEventForm
) => {
  let token = document?.cookie.split("=")[1];
  const apiUrl = url + "/event";
  const data = {
    name: eventForm.name,
    day_start: eventForm.dateStart,
    day_end: eventForm.dateEnd,
    day_end_repid: eventForm.repeatEnd ? eventForm.repeatEnd : "",
    time_start: eventForm.timeStart,
    time_end: eventForm.timeEnd,
    service_this_day: destructServices(eventForm.selection),
    weekday_list: eventForm.repeatWeek,
    status_repid_day: eventForm.repeatWeek.length > 0,
  };
  axios
    .post(apiUrl, data, {
      headers: {
        "X-API-KEY": apiKey,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => {
      setEventModalActive({ active: false, event: false });
      setRepeatSettingsClass("");
      setEventForm({
        name: "",
        dateStart: "",
        dateEnd: "",
        timeStart: "",
        timeEnd: "",
        selection: [],
        repeatEnd: "",
        repeatWeek: [],
        id: "",
        global_id: "",
      });
      const newTree = resp.data;
      setTreeWeek(newTree);
    });
};

export const postNewService = async (newService) => {
  let token = document?.cookie.split("=")[1];
  const apiUrl = url + "/service";
  const data = {
    all_adder: [
      {
        name_service: newService.name_service,
        price: Number(newService.price_service),
        duration: newService.duration,
        max_booking: Number(newService.max_booking),
      },
    ],
  };
  let response = await axios.post(apiUrl, data, {
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updateEvent = async (
  event,
  setTreeWeek,
  setEventModalActive,
  setRepeatSettingsClass,
  setEventForm,
  cutStatus
) => {
  let token = document?.cookie.split("=")[1];
  const apiUrl =
    url +
    `/event/update_rapid/?event_set_id=${event.global_id}&event_day_id=${event.id}` +
    (cutStatus ? `&status_pulling=${cutStatus}` : "");
  const data = {
    name: event.name,
    day_start: event.dateStart,
    day_end: event.dateEnd,
    day_end_repid: event.repeatEnd ? event.repeatEnd : "",
    time_start: event.timeStart,
    time_end: event.timeEnd,
    service_this_day: destructServices(event.selection),
    weekday_list: event.repeatWeek,
    status_repid_day: event.repeatWeek.length > 0,
  };
  let response;
  await axios
    .put(apiUrl, data, {
      headers: {
        "X-API-KEY": apiKey,
        Authorization: `Bearer ${token}`,
      },
    })
    .then(
      (resp) => {
        console.log("updateEvent", resp);
        setTreeWeek(resp.data);
        setEventModalActive({ active: false, event: false });
        setRepeatSettingsClass("");
        setEventForm({
          name: "",
          dateStart: "",
          dateEnd: "",
          timeStart: "",
          timeEnd: "",
          selection: [],
          repeatEnd: "",
          repeatWeek: [],
          id: "",
          global_id: "",
        });
        response = null;
      },
      (resp) => {
        console.log("updateEventError", resp);
        if (resp.response.status === 300) {
          console.log("updateEventError", resp.response.data);
          response = resp.response.data;
        }
      }
    );
  return response;
};

export const submitUpdate = async (
  event,
  hash,
  setTreeWeek,
  setEventModalActive,
  setRepeatSettingsClass,
  setEventForm
) => {
  let token = document?.cookie.split("=")[1];
  const apiUrl = url + `/event/update_rapid/?hash_del=${hash}`;
  const data = {
    day_return: event.dateStart,
  };
  await axios
    .delete(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
        Authorization: `Bearer ${token}`,
      },
      data: data,
    })
    .then((resp) => {
      setEventModalActive({ active: false, event: false });
      setRepeatSettingsClass("");
      setEventForm({
        name: "",
        dateStart: "",
        dateEnd: "",
        timeStart: "",
        timeEnd: "",
        selection: [],
        repeatEnd: "",
        repeatWeek: [],
        id: "",
        global_id: "",
      });
      setTreeWeek(resp.data);
    });
};

export const login = async (userData, regState) => {
  const apiUrl = urlUser + `/users/${regState ? "register" : "login"}`;
  const data = regState
    ? {
        name: userData?.userName,
        login: userData?.login,
        password: userData?.password,
      }
    : {
        login: userData?.login,
        password: userData?.password,
      };
  let access;
  await axios
    .post(apiUrl, data, {
      headers: {
        "X-API-KEY": apiKey,
      },
    })
    .then(
      (resp) => {
        console.log("tocken exist");
        //setCookie(resp.data.access_tocken)
        access = resp;
      },
      (err) => {
        console.log("tocken fall");
        access = false;
      }
    );
  return access;
};

export const logout = () => {
  const apiUrl = urlUser + `/users/logout`;
  let token = document?.cookie.split("=")[1];
  axios
    .delete(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => {
      console.log("logout", document?.cookie.split("=")[1]);
    });
};

export const getUserInfo = async () => {
  const apiUrl = urlUser + `/users/info_users`;
  let token = document?.cookie.split("=")[1];
  let response = await axios.get(apiUrl, {
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deleteService = async (serviceId) => {
  let token = document?.cookie.split("=")[1];
  const apiUrl = url + `/service/one_service?id_service=${serviceId}`;
  let response = await axios.delete(apiUrl, {
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const serviceConfirm = async (hash, type) => {
  let token = document?.cookie.split("=")[1];
  const apiUrl =
    url + `/service/confirmation?hash_del=${hash}&type_confirm=${type}`;
  let response = await axios.delete(apiUrl, {
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updateService = async (service) => {
  let token = document?.cookie.split("=")[1];
  const apiUrl = url + `/event/update_rapid/?service_id=${service.id}`;
  const data = {
    name_service: service.name_service,
    max_booking: service.max_booking,
    price_service: service.price_service,
    id: service.id,
    duration: service.duration,
  };
  let response = await axios.put(apiUrl, data, {
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
export const submitUpdateService = async (service, hash) => {
  let token = document?.cookie.split("=")[1];
  const apiUrl = url + `/event/update_rapid/?hash_del=${hash}`;
  const data = {
    service: service.dateStart,
  };
  let response = await axios.delete(apiUrl, {
    headers: {
      "X-API-KEY": apiKey,
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
  return response;
};
