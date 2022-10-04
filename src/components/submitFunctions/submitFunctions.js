import { getNewWeek } from "../tools/tools";
import axios from "axios";

export const sendSelectedDate = (selectDate, setTreeWeek) => {
  console.log("sendSelectDate", selectDate);
  const apiUrl =
    "http://192.168.3.170:5000/api_booking/booking/calendar/" +
    String(selectDate);
  axios.get(apiUrl).then((resp) => {
    const newTree = resp.data;
    setTreeWeek(newTree);
  });
};

export const getCurrentWeek = (setTreeWeek) => {
  const date = new Date().toLocaleDateString("en-CA");
  const apiUrl =
    "http://192.168.3.170:5000/api_booking/booking/calendar/" + String(date);
  axios.get(apiUrl).then((resp) => {
    const newTree = resp.data;
    setTreeWeek(newTree);
  });
};

export const changeWeek = (treeWeek, setTreeWeek, direction) => {
  const date = getNewWeek(treeWeek, direction);
  const apiUrl =
    "http://192.168.3.170:5000/api_booking/booking/calendar/" + String(date);
  axios.get(apiUrl).then((resp) => {
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
