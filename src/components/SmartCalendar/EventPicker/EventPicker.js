import React, { useState } from "react";
import InputField from "../../InputField/InputField";
import { setEvent } from "../../submitFunctions/submitFunctions";
import "./EventPicker.css";

function EventPicker({
  eventModalActive,
  setEventModalActive,
  eventer,
  setEventer,
}) {
  return (
    <div
      className={
        eventModalActive.active
          ? "event-modal event-modal_active"
          : "event-modal"
      }
      onClick={() => {
        console.log("outer");
        setEventModalActive({ active: false, event: false });
        setEventer({
          name: "",
          dateStart: "",
          dateEnd: "",
          timeStart: "",
          timeEnd: "",
          selection: { id: "", name: "" },
        });
      }}
    >
      <div
        className="event-picker__wrapper"
        onClick={(e) => {
          e.stopPropagation();
          console.log("inner");
        }}
      >
        <div className="event-picker__name">Настройка события</div>
        <div className="event-picker__fields">
          <div className="event__name event">
            <InputField
              fieldName={"name"}
              style={{ width: "100%" }}
              value={eventer}
              setValue={setEventer}
            ></InputField>
          </div>
          <div className="event__date event">
            <InputField
              fieldName={"dateStart"}
              value={eventer}
              setValue={setEventer}
            ></InputField>
            <InputField
              fieldName={"dateEnd"}
              value={eventer}
              setValue={setEventer}
            ></InputField>
          </div>
          <div className="event__time event">
            <InputField
              fieldName={"timeStart"}
              value={eventer}
              setValue={setEventer}
            ></InputField>
            <InputField
              fieldName={"timeEnd"}
              value={eventer}
              setValue={setEventer}
            ></InputField>
          </div>
          <div className="event__selection event">
            <InputField
              fieldName={"selection"}
              value={eventer}
              setValue={setEventer}
            ></InputField>
          </div>
        </div>
        <button className="setRepeats__btn event-pick-btn">
          Настройка повторений
        </button>
        <button
          className="submit__btn event-pick-btn"
          onClick={() => {
            setEvent(eventer);
            setEventModalActive({ active: false, event: false });
            setEventer({
              name: "",
              dateStart: "",
              dateEnd: "",
              timeStart: "",
              timeEnd: "",
              selection: { id: "", name: "" },
            });
          }}
        >
          Готово
        </button>
      </div>
    </div>
  );
}
export default EventPicker;
