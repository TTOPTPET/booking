import React, { useEffect, useState } from "react";
import "./CanvasCalendar.css";
import EventObject from "./CanvasObjects/EventObject/EventObject";

function CanvasCalendar() {
  const addEvent = (colIndex, rowIndex) => {
    if (colIndex == 3 && rowIndex == 2) {
      console.log("eventRender");
      return (
        <EventObject
          eventType={"Test"}
          registrationCounter={3}
          lengthTime={3}
        ></EventObject>
      );
    }
  };
  const canvasRender = [...Array(24)].map((item, rowIndex) => {
    return (
      <div className="canvas__row" id={"row" + rowIndex}>
        <div
          className="canvas__column canvas__column_time"
          id={"coltime" + rowIndex}
        >
          {0 + rowIndex + ":00"}
        </div>
        {[...Array(7)].map((item, colIndex) => {
          return (
            <div className="canvas__column" id={"col" + colIndex}>
              {colIndex}
              {addEvent(colIndex, rowIndex)}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className="canvas__wrapper">
      <div className="canvas__scroll">{canvasRender}</div>
    </div>
  );
}
export default CanvasCalendar;
