import React, { useEffect, useState } from "react";
import "./EventObject.css";

function EventObject({ setEventModalActive, setEventer, eventer }) {
  return (
    <div
      className="event__wrapper"
      style={{
        height:
          60 *
            (eventer.end_event.split(":")[0] -
              eventer.start_event.split(":")[0]) -
          1 +
          "px",
      }}
      onClick={(e) => {
        e.stopPropagation();
        setEventer({
          ...eventer,
          name: eventer.name_event,
          dateStart: eventer.day_start,
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
