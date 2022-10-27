import { getNewWeek, destructServices } from "../tools/tools";
import { url, apiKey, defaultDay_end_repid } from "../../config/config";
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
    day_end_repid: eventForm.repeatEnd
      ? eventForm.repeatEnd
      : defaultDay_end_repid,
    start_event: eventForm.timeStart,
    end_event: eventForm.timeEnd,
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
      });
      const newTree = resp.data;
      setTreeWeek(newTree);
    });
};

export const postNewService = (newService, setServices, setServiceModal) => {
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
      setServiceModal(false);
    });
};
