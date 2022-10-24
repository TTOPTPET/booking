import React, { useState } from "react";
import InputField from "../../InputField/InputField";
import { setEvent } from "../../submitFunctions/submitFunctions";
import { getTimeCoef, validateWeekList } from "../../tools/tools";
import deleteImg from "../../../media/delete.png";
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
  const [deleteState, setDeleteState] = useState(false);

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
        className="delete-modal"
        style={
          deleteState
            ? { pointerEvents: "all", opacity: 1 }
            : { pointerEvents: "none", opacity: 0 }
        }
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setDeleteState(false);
        }}
      >
        <div
          className="delete-modal__wrapper"
          style={
            deleteState
              ? { pointerEvents: "all", opacity: 1 }
              : { pointerEvents: "none", opacity: 0 }
          }
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <div className="delete-model__text">Внимание!</div>
          <div className="delete-model__descr">Будет удалено записей: 3</div>
          <div
            className="delete-modal__submit"
            onClick={() => console.log("Удаление события")}
          >
            Удалить
          </div>
        </div>
      </div>
      <div
        className="event-picker__wrapper"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="delete__btn"
          style={eventModalActive.event ? { scale: 1 } : { scale: 0 }}
          onClick={() => setDeleteState(deleteState ? false : true)}
        >
          <img src={deleteImg}></img>
        </div>
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
              const btnClass = () => {
                if (
                  eventForm.repeatWeek.includes(index) &&
                  !validateWeekList(eventForm, index)
                ) {
                  return "week-btn_error";
                } else if (eventForm.repeatWeek.includes(index)) {
                  return "week-btn_active";
                } else if (!validateWeekList(eventForm, index)) {
                  return "week-btn_blocked";
                }
                return "";
              };
              return (
                <div
                  id={"week-btn" + index}
                  className={"week-btn " + btnClass()}
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
            setEvent(
              eventForm,
              setTreeWeek,
              setEventModalActive,
              setRepeatSettingsClass,
              setEventForm
            );
          }}
        >
          Готово
        </button>
      </div>
    </div>
  );
}
export default EventPicker;
