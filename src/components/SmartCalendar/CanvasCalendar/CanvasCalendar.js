import React, { useEffect, useRef, useState } from "react";
import "./CanvasCalendar.css";
import { dateFromDayWeek, getTimeCoef } from "../../tools/tools";
import EventObject from "./CanvasObjects/EventObject/EventObject";

function CanvasCalendar({
  setEventModalActive,
  treeWeek,
  eventer,
  setEventer,
}) {
  const currentDate = new Date();
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  useEffect(() => {
    executeScroll();
  }, []);

  const addEvent = (dayTree, rowIndex, marginLen) => {
    let newEvent = dayTree.event_day.find(
      (nEvent) => Number(nEvent.event_time_start.split(":")[0]) === rowIndex
    );
    if (newEvent) {
      if (getTimeCoef(marginLen.lastEventEnd, newEvent.event_time_start) < 0) {
        marginLen.marginCoef += 1;
      } else {
        marginLen.marginCoef = 0;
      }
      console.log("addEvent", newEvent, marginLen);
      marginLen.lastEventEnd = newEvent.event_time_end;
      return (
        <EventObject
          setEventModalActive={setEventModalActive}
          setEventer={setEventer}
          eventer={newEvent}
          combinMargin={marginLen.marginCoef}
        ></EventObject>
      );
    }
    return null;
  };

  const canvasRender = treeWeek.map((dayTree, colIndex) => {
    let marginLen = { lastEventEnd: "00:00:00", marginCoef: 0 };
    return (
      <div className="day__column">
        {[...Array(24)].map((item, rowIndex) => {
          return (
            <button
              className="canvas__elem"
              id={"col" + colIndex}
              onClick={(e) => {
                let splitDate = treeWeek[colIndex].day.split("-");
                splitDate[2] = dateFromDayWeek(colIndex, treeWeek[0].day)[0];
                splitDate[1] = dateFromDayWeek(colIndex, treeWeek[0].day)[1];
                setEventer({
                  ...eventer,
                  dateStart: splitDate.join("-"),
                  dateEnd: splitDate.join("-"),
                  timeStart: rowIndex + ":00:00",
                });
                setEventModalActive({ active: true, event: false });
              }}
            >
              {addEvent(dayTree, rowIndex, marginLen)}
            </button>
          );
        })}
      </div>
    );
  });

  const timeRender = [...Array(24)].map((item, index) => {
    return (
      <div
        ref={currentDate.getHours() === index + 1 ? myRef : null}
        className={
          currentDate.getHours() === index
            ? "canvas__elem time__elem time__elem_active"
            : "canvas__elem time__elem"
        }
        id={"coltime" + index}
      >
        {index + ":00"}
      </div>
    );
  });
  return (
    <div className="canvas__wrapper">
      <div className="canvas__scroll">
        <div className="time__column">{timeRender}</div>
        {canvasRender}
      </div>
    </div>
  );
}
export default CanvasCalendar;
