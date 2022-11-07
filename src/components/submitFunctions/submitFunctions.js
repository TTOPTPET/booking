import { getNewWeek, destructServices } from "../tools/tools";
import { url, apiKey } from "../../config/config";
import axios from "axios";

export const sendSelectedDate = (selectDate, setTreeWeek) => {
  const apiUrl = url + "/event/calendar?cal_date=" + String(selectDate);
  axios
    .get(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
      },
    })
    .then((resp) => {
      const newTree = resp.data;
      setTreeWeek(newTree);
    });
};

export const getCurrentWeek = (setTreeWeek) => {
  const date = new Date().toLocaleDateString("en-CA");
  const apiUrl = url + "/event/calendar?cal_date=" + String(date);
  axios
    .get(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
      },
    })
    .then((resp) => {
      const newTree = resp.data;
      console.log("response", newTree);
      setTreeWeek(newTree);
    });
};

export const changeWeek = (treeWeek, setTreeWeek, direction) => {
  const date = getNewWeek(treeWeek, direction);
  const apiUrl = url + "/event/calendar?cal_date=" + String(date);
  axios
    .get(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
      },
    })
    .then((resp) => {
      const newTree = resp.data;
      console.log("response", newTree);
      setTreeWeek(newTree);
    });
};

export const getServices = (setServices) => {
  const apiUrl = url + "/service";
  axios
    .get(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
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
  const apiUrl = url + "/event/event_day/?event_day_id=" + String(eventId);
  axios
    .delete(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
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

export const postNewService = (newService, setServiceModal, setServices) => {
  const apiUrl = url + "/service";
  const data = {
    all_adder: [
      {
        name_service: newService.serviceName,
        price: Number(newService.servicePrice),
        duration: newService.serviceDuration,
        max_booking: Number(newService.serviceMaxBook),
      },
    ],
  };
  axios
    .post(apiUrl, data, {
      headers: {
        "X-API-KEY": apiKey,
      },
    })
    .then((resp) => {
      const newServ = resp.data;
      setServices(newServ);
      setServiceModal(false);
    });
};

export const updateEvent = async (
  event,
  setTreeWeek,
  setEventModalActive,
  setRepeatSettingsClass,
  setEventForm
) => {
  const apiUrl =
    url +
    `/event/update_rapid/?event_set_id=${event.global_id}&event_day_id=${event.id}`;
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
  const apiUrl = url + `/event/update_rapid/?hash_del=${hash}`;
  const data = {
    day_return: event.dateStart,
  };
  await axios
    .delete(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
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
