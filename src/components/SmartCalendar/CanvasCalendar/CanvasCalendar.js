import React, { useEffect, useState } from "react";
import "./CanvasCalendar.css";
import { getBooking } from "../../submitFunctions/submitFunctions";
import EventObject from "./CanvasObjects/EventObject/EventObject";

function CanvasCalendar({
  setEventModalActive,
  eventer,
  setEventer,
  selectDateRange,
}) {
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

  let tree = getBooking();

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
                splitDate[0] = Number(splitDate[0]) + Number(colIndex);
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
      <div className="canvas__elem time__elem" id={"coltime" + index}>
        {index + ":00"}
      </div>
    );
  });

  // const canvasRender = [...Array(24)].map((item, rowIndex) => {
  //   return (
  //     <div className="canvas__row" id={"row" + rowIndex}>
  //       <div
  //         className="canvas__column canvas__column_time"
  //         id={"coltime" + rowIndex}
  //       >
  //         {0 + rowIndex + ":00"}
  //       </div>
  //       {[...Array(7)].map((item, colIndex) => {
  //         return (
  //           <button
  //             className="canvas__column"
  //             id={"col" + colIndex}
  //             onClick={(e) => {
  //               let splitDate = selectDateRange.start.split(".");
  //               splitDate[0] = Number(splitDate[0]) + Number(colIndex);
  //               setEventer({
  //                 ...eventer,
  //                 dateStart: splitDate.join("."),
  //                 timeStart: 0 + rowIndex + ":00",
  //               });
  //               setEventModalActive({ active: true, event: false });
  //             }}
  //           >
  //             {/* <EventObject
  //               eventType={"Test"}
  //               registrationCounter={3}
  //               lengthTime={3}
  //               setEventModalActive={setEventModalActive}
  //               setEventer={setEventer}
  //               eventer={eventer}
  //             ></EventObject> */}
  //           </button>
  //         );
  //       })}
  //     </div>
  //   );
  // });

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
