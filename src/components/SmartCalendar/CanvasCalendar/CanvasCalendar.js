import React, { useEffect, useRef, useState } from "react";
import "./CanvasCalendar.css";
import { getBooking } from "../../submitFunctions/submitFunctions";
import { dateFromDayWeek } from "../tools/getDateFromPick";
import EventObject from "./CanvasObjects/EventObject/EventObject";

function CanvasCalendar({
  setEventModalActive,
  eventer,
  setEventer,
  selectDateRange,
}) {
  const currentDate = new Date();
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  useEffect(() => {
    executeScroll();
  }, []);
  let tree = getBooking();

  const addEvent = (dayTree, rowIndex) => {
    let newEvent = dayTree.booking.find(
      (nEvent) => nEvent.start_event === rowIndex + ":00:00"
    );
    if (newEvent) {
      return (
        <EventObject
          setEventModalActive={setEventModalActive}
          setEventer={setEventer}
          eventer={newEvent}
        ></EventObject>
      );
    }
    return null;
  };

  const canvasRenderTwo = tree.map((dayTree, colIndex) => {
    return (
      <div className="day__column">
        {[...Array(24)].map((item, rowIndex) => {
          return (
            <button
              className="canvas__elem"
              id={"col" + colIndex}
              onClick={(e) => {
                console.log("element");
                let splitDate = selectDateRange.start.split(".");
                splitDate[0] = dateFromDayWeek(colIndex, selectDateRange)[0];
                splitDate[1] = dateFromDayWeek(colIndex, selectDateRange)[1];
                setEventer({
                  ...eventer,
                  dateStart: splitDate.join("."),
                  timeStart: rowIndex + ":00:00",
                });
                setEventModalActive({ active: true, event: false });
              }}
            >
              {addEvent(dayTree, rowIndex)}
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
        {canvasRenderTwo}
      </div>
    </div>
  );
}
export default CanvasCalendar;
