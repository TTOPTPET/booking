import { getNewWeek } from "../tools/tools";
import { url, apiKey } from "../../config/config";
import axios from "axios";

export const sendSelectedDate = (selectDate, setTreeWeek) => {
  console.log("sendSelectDate", selectDate);
  const apiUrl = url + "/booking/calendar?cal_date=" + String(selectDate);
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
  const apiUrl = url + "/booking/calendar?cal_date=" + String(date);
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

export const changeWeek = (treeWeek, setTreeWeek, direction) => {
  const date = getNewWeek(treeWeek, direction);
  const apiUrl = url + "/booking/calendar?cal_date=" + String(date);
  axios
    .get(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
      },
    })
    .then((resp) => {
      const newTree = resp.data;
      setTreeWeek(newTree);
      console.log(newTree);
    });
};

export const getServices = () => {
  return [
    { id: 1, name: "11" },
    { id: 2, name: "22" },
    { id: 3, name: "33" },
  ];
};

export const setEvent = (eventer) => {
  console.log(eventer);
};
