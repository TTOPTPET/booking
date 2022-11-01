import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import CanvasCalendar from "./CanvasCalendar/CanvasCalendar";
import EventPicker from "./EventPicker/EventPicker.js";
import ScrollBar from "./ScrollBar/ScrollBar";
import "./SmartCalendar.css";

function SmartCalendar({ treeWeek, setTreeWeek, services, setServices }) {
  const [eventModalActive, setEventModalActive] = useState({
    active: false,
    event: false,
  });
  const [paddingScroll, setPaddingScroll] = useState(0);
  const [eventForm, setEventForm] = useState({
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

  return (
    <div className="smartCalendar__wrapper">
      <ScrollBar
        treeWeek={treeWeek}
        setTreeWeek={setTreeWeek}
        setPaddingScroll={setPaddingScroll}
      ></ScrollBar>
      <EventPicker
        eventModalActive={eventModalActive}
        setEventModalActive={setEventModalActive}
        eventForm={eventForm}
        setEventForm={setEventForm}
        services={services}
        setServices={setServices}
        setTreeWeek={setTreeWeek}
        treeWeek={treeWeek}
      ></EventPicker>
      <CanvasCalendar
        paddingScroll={paddingScroll}
        setPaddingScroll={setPaddingScroll}
        treeWeek={treeWeek}
        setEventModalActive={setEventModalActive}
        eventForm={eventForm}
        setEventForm={setEventForm}
      ></CanvasCalendar>
    </div>
  );
}
export default SmartCalendar;
