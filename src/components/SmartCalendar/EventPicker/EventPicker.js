import dayjs from "dayjs";
import React, { useState } from "react";
import InputField from "../../InputField/InputField";
import { setEvent } from "../../submitFunctions/submitFunctions";
import "./EventPicker.css";

function EventPicker({
  eventModalActive,
  setEventModalActive,
  eventer,
  setEventer,
  services,
}) {
  const weekName = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  const [repeatSettingsClass, setRepeatSettingsClass] = useState("");
  return (
    <div
      className={
        eventModalActive.active
          ? "event-modal event-modal_active"
          : "event-modal"
      }
      onClick={() => {
        setEventModalActive({ active: false, event: false });
        setRepeatSettingsClass("");
        setEventer({
          name: "",
          dateStart: "",
          dateEnd: "",
          timeStart: "",
          timeEnd: "",
          selection: { id: "", name: "" },
          repeatEnd: "",
        });
      }}
    >
      <div
        className="event-picker__wrapper"
        onClick={(e) => {
          e.stopPropagation();
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
              services={services}
            ></InputField>
          </div>
        </div>
        <button
          className="setRepeats__btn event-pick-btn"
          onClick={() => {
            repeatSettingsClass
              ? setRepeatSettingsClass("")
              : setRepeatSettingsClass("repeat__settings_active");
          }}
        >
          Настройка повторений
        </button>
        <div className={"repeat__settings " + repeatSettingsClass}>
          <div className={"week-btn__group"}>
            {weekName.map((weekDay, index) => {
              return (
                <div id={"week-btn" + index} className="week-btn">
                  {weekDay}
                </div>
              );
            })}
          </div>
          <div className="repeat-end__date">
            <InputField
              fieldName={"repeatEnd"}
              value={eventer}
              setValue={setEventer}
            ></InputField>
          </div>
        </div>
        <button
          className="submit__btn event-pick-btn"
          onClick={() => {
            setEvent(eventer);
            setRepeatSettingsClass("");
            setEventModalActive({ active: false, event: false });
            setEventer({
              name: "",
              dateStart: "",
              dateEnd: "",
              timeStart: "",
              timeEnd: "",
              selection: { id: "", name: "" },
              repeatEnd: "",
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
