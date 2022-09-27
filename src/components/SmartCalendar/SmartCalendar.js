import React, { useEffect, useState } from "react";
import CanvasCalendar from "./CanvasCalendar/CanvasCalendar";
import EventPicker from "./EventPicker/EventPicker.js";
import ScrollBar from "./ScrollBar/ScrollBar";
import "./SmartCalendar.css";

function SmartCalendar({ selectDateRange, currentDate, setSelectDateRange }) {
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
      <ScrollBar
        selectDateRange={selectDateRange}
        currentDate={currentDate}
        setSelectDateRange={setSelectDateRange}
      ></ScrollBar>
      <EventPicker
        eventModalActive={eventModalActive}
        setEventModalActive={setEventModalActive}
        eventer={eventer}
        setEventer={setEventer}
      ></EventPicker>
      <CanvasCalendar
        setEventModalActive={setEventModalActive}
        eventer={eventer}
        setEventer={setEventer}
        selectDateRange={selectDateRange}
      ></CanvasCalendar>
    </div>
  );
}
export default SmartCalendar;
