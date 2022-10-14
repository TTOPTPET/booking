import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import CanvasCalendar from "./CanvasCalendar/CanvasCalendar";
import EventPicker from "./EventPicker/EventPicker.js";
import ScrollBar from "./ScrollBar/ScrollBar";
import "./SmartCalendar.css";

function SmartCalendar({ treeWeek, setTreeWeek, services }) {
  const [eventModalActive, setEventModalActive] = useState({
    active: false,
    event: false,
  });
  const [eventer, setEventer] = useState({
    name: "",
    dateStart: "",
    dateEnd: "",
    timeStart: "",
    timeEnd: "",
    selection: {},
    repeatEnd: "",
    repeatWeek: [],
  });

  return (
    <div className="smartCalendar__wrapper">
      <ScrollBar treeWeek={treeWeek} setTreeWeek={setTreeWeek}></ScrollBar>
      <EventPicker
        eventModalActive={eventModalActive}
        setEventModalActive={setEventModalActive}
        eventer={eventer}
        setEventer={setEventer}
        services={services}
      ></EventPicker>
      <CanvasCalendar
        treeWeek={treeWeek}
        setEventModalActive={setEventModalActive}
        eventer={eventer}
        setEventer={setEventer}
      ></CanvasCalendar>
    </div>
  );
}
export default SmartCalendar;
