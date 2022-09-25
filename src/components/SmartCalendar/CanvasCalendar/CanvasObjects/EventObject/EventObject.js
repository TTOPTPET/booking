import React, { useEffect, useState } from "react";
import "./EventObject.css";

function EventObject({ eventType, registrationCounter, lengthTime }) {
  return (
    <div
      className="event__wrapper"
      style={{ height: 60 * lengthTime - 1 + "px" }}
      onClick={() => {
        console.log("eventClick");
      }}
    >
      <div className="event__text">{'"' + eventType + '"'}</div>
      <div className="event__counter">{"Записи: " + registrationCounter}</div>
    </div>
  );
}
export default EventObject;
