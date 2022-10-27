import React, { useEffect, useRef, useState } from "react";
import { useClock } from "../../../hooks/clock.hook";
import "./CanvasCalendar.css";
import { dateFromDayWeek, getTimeCoef } from "../../tools/tools";
import EventObject from "./CanvasObjects/EventObject/EventObject";

function CanvasCalendar({
  setEventModalActive,
  treeWeek,
  eventForm,
  setEventForm,
  setPaddingScroll,
  paddingScroll,
}) {
  const currentDate = new Date();
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  let { date, time } = useClock();

  useEffect(() => {
    executeScroll();
  }, []);

  console.log("time", time);
  const addEvent = (dayTree, rowIndex, marginLen, colIndex) => {
    let newEvent = dayTree.event_day.find(
      (nEvent) => Number(nEvent.correct_time_start.split(":")[0]) === rowIndex
    );
    if (newEvent) {
      if (
        getTimeCoef(marginLen.lastEventEnd, newEvent.correct_time_start) < 0
      ) {
        marginLen.marginCoef += 1;
      } else {
        marginLen.marginCoef = 0;
      }
      marginLen.lastEventEnd = newEvent.correct_time_end;
      return (
        <EventObject
          setEventModalActive={setEventModalActive}
          setEventForm={setEventForm}
          newEvent={newEvent}
          paddingScroll={paddingScroll}
          setPaddingScroll={rowIndex === 0 ? setPaddingScroll : undefined}
          combinMargin={marginLen.marginCoef}
          unfoldLeft={colIndex === 6}
          colIndex={colIndex}
          treeWeek={treeWeek}
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
            <div
              className="canvas__elem"
              id={"col" + colIndex}
              key={"elem" + colIndex + rowIndex}
              onClick={(e) => {
                let splitDate = treeWeek[colIndex].day.split("-");
                splitDate[2] = dateFromDayWeek(colIndex, treeWeek[0].day)[0];
                splitDate[1] = dateFromDayWeek(colIndex, treeWeek[0].day)[1];
                setEventForm({
                  ...eventForm,
                  dateStart: splitDate.join("-"),
                  dateEnd: splitDate.join("-"),
                  timeStart: rowIndex + ":00:00",
                  repeatEnd: "",
                });
                setEventModalActive({ active: true, event: false });
              }}
            >
              {addEvent(dayTree, rowIndex, marginLen, colIndex)}
            </div>
          );
        })}
      </div>
    );
  });

  const timeRender = [...Array(24)].map((item, index) => {
    return (
      <div
        ref={Number(time.substring(0, 2)) === index + 1 ? myRef : null}
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
      <div
        className={
          "canvas__scroll " + (paddingScroll > 0 ? "canvas__scroll_active" : "")
        }
      >
        <div className="time__column">{timeRender}</div>
        {canvasRender}
      </div>
    </div>
  );
}
export default CanvasCalendar;
