import React, { useEffect, useState } from "react";
import { getTimeCoef } from "../../../../tools/tools";
import "./EventObject.css";

function EventObject({ setEventModalActive, setEventer, eventer, day }) {
  return (
    <div
      className="event__wrapper"
      style={{
        top: eventer.event_time_start.split(":")[1] * 0.8 + "px",
        height:
          60 * getTimeCoef(eventer.event_time_start, eventer.event_time_end) -
          1 +
          "px",
      }}
      onClick={(e) => {
        e.stopPropagation();
        setEventer({
          name: eventer.connect_event_setting.name_event,
          dateStart: eventer.connect_event_setting.day_start_g,
          dateEnd: eventer.connect_event_setting.day_end_g,
          timeStart: eventer.connect_event_setting.event_time_start,
          timeEnd: eventer.connect_event_setting.event_time_end,
          // здесь должны быть поля услуг и повторений
        });
        setEventModalActive({ active: true, event: true });
      }}
    >
      <div className="event__text">
        {'"' + eventer.connect_event_setting.name_event + '"'}
      </div>
      <div className="event__counter">
        {"Записи: " + eventer.event_booking.length}
      </div>
    </div>
  );
}
export default EventObject;
