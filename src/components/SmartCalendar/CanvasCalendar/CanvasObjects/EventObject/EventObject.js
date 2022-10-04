import React, { useEffect, useState } from "react";
import { getTimeCoef } from "../../../../tools/tools";
import "./EventObject.css";

function EventObject({ setEventModalActive, setEventer, eventer, day }) {
  return (
    <div
      className="event__wrapper"
      style={{
        top: eventer.start_event.split(":")[1] * 0.8 + "px",
        height:
          60 * getTimeCoef(eventer.start_event, eventer.end_event) - 1 + "px",
      }}
      onClick={(e) => {
        e.stopPropagation();
        setEventer({
          ...eventer,
          name: eventer.name_event,
          dateStart: day,
          dateEnd: "11:11:1111",
          timeStart: eventer.start_event,
          timeEnd: eventer.end_event,
        });
        setEventModalActive({ active: true, event: true });
      }}
    >
      <div className="event__text">{'"' + eventer.name_event + '"'}</div>
      <div className="event__counter">
        {"Записи: " + eventer.event_booking.length}
      </div>
    </div>
  );
}
export default EventObject;
