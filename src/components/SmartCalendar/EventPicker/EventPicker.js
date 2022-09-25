import React, { useState } from "react";
import InputField from "../../InputField/InputField";
import "./EventPicker.css";

function EventPicker({ selectDate, selectTime }) {
  const [event, setEvent] = useState({});

  return (
    <div className="event-picker__wrapper">
      <div className="event-picker__name">Настройка события</div>
      <div className="event-picker__fields">
        <div className="event__name event">
          <InputField
            fieldName={"event-name"}
            style={{ width: "100%" }}
          ></InputField>
        </div>
        <div className="event__date event">
          <InputField fieldName={"event-date-start"}></InputField>
          <InputField fieldName={"event-date-end"}></InputField>
        </div>
        <div className="event__time event">
          <InputField fieldName={"event-time-start"}></InputField>
          <InputField fieldName={"event-time-end"}></InputField>
        </div>
        <div className="event__selection event">
          <InputField fieldName={"selection-event"}></InputField>
        </div>
      </div>
      <button className="setRepeats__btn event-pick-btn">
        Настройка повторений
      </button>
      <button className="submit__btn event-pick-btn">Готово</button>
    </div>
  );
}
export default EventPicker;
