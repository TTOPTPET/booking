import React, { useState } from "react";
import InputField from "../../InputField/InputField";
import { setEvent } from "../../submitFunctions/submitFunctions";
import "./EventPicker.css";

function EventPicker({
  eventModalActive,
  setEventModalActive,
  eventForm,
  setEventForm,
  services,
  setTreeWeek,
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
        setEventForm({
          name: "",
          dateStart: "",
          dateEnd: "",
          timeStart: "",
          timeEnd: "",
          selection: [],
          repeatEnd: "",
          repeatWeek: [],
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
              value={eventForm}
              setValue={setEventForm}
            ></InputField>
          </div>
          <div className="event__date event">
            <InputField
              fieldName={"dateStart"}
              value={eventForm}
              setValue={setEventForm}
            ></InputField>
            <InputField
              fieldName={"dateEnd"}
              value={eventForm}
              setValue={setEventForm}
            ></InputField>
          </div>
          <div className="event__time event">
            <InputField
              fieldName={"timeStart"}
              value={eventForm}
              setValue={setEventForm}
            ></InputField>
            <InputField
              fieldName={"timeEnd"}
              value={eventForm}
              setValue={setEventForm}
            ></InputField>
          </div>
          <div className="event__selection event">
            <InputField
              fieldName={"selection"}
              value={eventForm}
              setValue={setEventForm}
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
                <div
                  id={"week-btn" + index}
                  className={
                    "week-btn " +
                    (eventForm.repeatWeek.includes(index)
                      ? "week-btn_active"
                      : "")
                  }
                  onClick={() => {
                    if (eventForm.repeatWeek.includes(index)) {
                      setEventForm({
                        ...eventForm,
                        repeatWeek: eventForm.repeatWeek.filter(
                          (day) => day !== index
                        ),
                      });
                    } else {
                      setEventForm({
                        ...eventForm,
                        repeatWeek: eventForm.repeatWeek.concat(index).sort(),
                      });
                    }
                  }}
                >
                  {weekDay}
                </div>
              );
            })}
          </div>
          <div className="repeat-end__date">
            <InputField
              fieldName={"repeatEnd"}
              value={eventForm}
              setValue={setEventForm}
            ></InputField>
          </div>
        </div>
        <button
          className="submit__btn event-pick-btn"
          onClick={() => {
            setEvent(eventForm, setTreeWeek);
            setRepeatSettingsClass("");
            setEventModalActive({ active: false, event: false });
            setEventForm({
              name: "",
              dateStart: "",
              dateEnd: "",
              timeStart: "",
              timeEnd: "",
              selection: [],
              repeatEnd: "",
              repeatWeek: [],
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
