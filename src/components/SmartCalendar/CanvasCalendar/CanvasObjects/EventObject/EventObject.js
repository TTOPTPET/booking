import React, { useEffect, useState, useRef } from "react";
import { getTimeCoef, calcTransitions } from "../../../../tools/tools";
import "./EventObject.css";

function EventObject({
  setEventModalActive,
  setEventer,
  eventer,
  combinMargin,
}) {
  const [unfoldEvent, setUnfoldEvent] = useState(false);

  const renderBook = () => {
    console.log("renderBook");
    let lastBookEnd = "00:00:00";
    let marginCoef = 0;
    return eventer?.event_booking.map((book) => {
      if (getTimeCoef(lastBookEnd, book.time_start) < 0) {
        marginCoef += 1;
      } else {
        marginCoef = 0;
      }
      lastBookEnd = book.time_end;
      return (
        <div
          className="book__wrapper"
          style={{
            height: 60 * getTimeCoef(book.time_start, book.time_end) - 1 + "px",
            top:
              60 * getTimeCoef(eventer.event_time_start, book.time_start) -
              1 +
              55 +
              "px",
            marginLeft: 15 * marginCoef + "px",
            width: "calc(100% - " + (15 * marginCoef + 20) + "px)",
          }}
          id={book.id}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="book__name">{book.comment}</div>
          <div className="book__time">
            {book.time_start + " - " + book.time_end}
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className="event__wrapper"
      style={{
        top:
          eventer.event_time_start.split(":")[1] -
          (unfoldEvent ? 55 : 0) +
          "px",
        height:
          60 * getTimeCoef(eventer.event_time_start, eventer.event_time_end) -
          1 +
          (unfoldEvent ? 125 : 0) +
          "px",
        width: unfoldEvent
          ? 238 - 15 * combinMargin + "px"
          : 119 - 15 * combinMargin + "px",
        marginLeft: 15 * combinMargin + "px",
        textAlign: unfoldEvent ? "center" : "start",
        zIndex: unfoldEvent ? 100 : 98,
      }}
      id={eventer.id}
      onClick={(e) => {
        unfoldEvent ? setUnfoldEvent(false) : setUnfoldEvent(true);
        console.log("setUnfoldEvent", unfoldEvent);
        e.stopPropagation();
      }}
    >
      <div className="event__text">
        {'"' + eventer.connect_event_setting.name_event + '"'}
      </div>
      {unfoldEvent ? (
        <div className="event__time_book">
          {eventer.connect_event_setting.event_time_start +
            " - " +
            eventer.connect_event_setting.event_time_end}
        </div>
      ) : (
        <div className="event__counter">
          {"Записи: " + eventer.event_booking.length}
        </div>
      )}
      {unfoldEvent ? renderBook() : <></>}
      {unfoldEvent ? (
        <div
          className="picker__btn"
          onClick={(e) => {
            e.stopPropagation();
            setEventer({
              name: eventer.connect_event_setting.name_event,
              dateStart: eventer.day_start,
              dateEnd: eventer.flag_event_transition
                ? calcTransitions(eventer.day_start)
                : eventer.day_start,
              timeStart: eventer.connect_event_setting.event_time_start,
              timeEnd: eventer.connect_event_setting.event_time_end,
              // здесь должны быть поля услуг и повторений
            });
            setEventModalActive({ active: true, event: true });
          }}
        >
          редактировать
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default EventObject;
