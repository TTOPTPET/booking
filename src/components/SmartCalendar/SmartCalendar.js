import React, { useEffect, useState } from "react";
import CanvasCalendar from "./CanvasCalendar/CanvasCalendar";
import EventPicker from "./EventPicker/EventPicker.js";
import ScrollBar from "./ScrollBar/ScrollBar";
import "./SmartCalendar.css";

function SmartCalendar({ treeWeek, setTreeWeek }) {
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
  });

  return (
    <div className="smartCalendar__wrapper">
      <ScrollBar treeWeek={treeWeek} setTreeWeek={setTreeWeek}></ScrollBar>
      <EventPicker
        eventModalActive={eventModalActive}
        setEventModalActive={setEventModalActive}
        eventer={eventer}
        setEventer={setEventer}
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
