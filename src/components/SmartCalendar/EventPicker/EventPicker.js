import React, { useState, useEffect } from "react";
import InputField from "../../InputField/InputField";
import {
  setEvent,
  deleteEvent,
  updateEvent,
  submitUpdate,
  cutFromTtread,
} from "../../submitFunctions/submitFunctions";
import { servicesCompare, validateWeekList } from "../../tools/tools";
import deleteImg from "../../../media/delete.png";
import plus from "../../../media/plus.png";
import "./EventPicker.css";
import CreateService from "../../CreateService/CreateService";

function EventPicker({
  eventModalActive,
  setEventModalActive,
  eventForm,
  setEventForm,
  services,
  setServices,
  setTreeWeek,
  treeWeek,
  eventCopy,
  setEventCopy,
  mobile,
}) {
  const weekName = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  const [repeatSettingsClass, setRepeatSettingsClass] = useState("");
  const [deleteState, setDeleteState] = useState(false);
  const [submitState, setSubmitState] = useState(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [updateState, setUpdateState] = useState({ count: null, hash: null });
  const [cutTreadState, setCutTreadState] = useState(false);
  const [cutTreadModal, setCutTreadModal] = useState(false);

  useEffect(() => {
    console.log(
      "-----",
      eventForm,
      eventCopy,
      servicesCompare(eventForm?.selection, eventCopy?.selection)
    );
    if (
      eventForm.name !== "" &&
      eventForm.dateStart !== "" &&
      eventForm.dateEnd !== "" &&
      eventForm.timeStart !== "" &&
      eventForm.timeEnd !== "" &&
      eventForm.selection.length &&
      (eventForm.name !== eventCopy?.name ||
        eventForm.dateStart !== eventCopy?.dateStart ||
        eventForm.dateEnd !== eventCopy?.dateEnd ||
        eventForm.timeStart !== eventCopy?.timeStart ||
        eventForm.timeEnd !== eventCopy?.timeEnd ||
        eventForm.repeatEnd !== eventCopy?.repeatEnd ||
        JSON.stringify(eventForm.repeatWeek) !==
          JSON.stringify(eventCopy?.repeatWeek) ||
        servicesCompare(eventForm?.selection, eventCopy?.selection) ||
        eventForm.global_id !== eventCopy.global_id)
    ) {
      setSubmitState(true);
    } else {
      setSubmitState(false);
    }
  }, [eventForm]);

  useEffect(() => {
    if (
      eventModalActive.active &&
      eventModalActive.event &&
      eventCopy?.repeatWeek.length > 0
    ) {
      setCutTreadState(true);
    }
  }, [eventModalActive.active]);

  // console.log(
  //   treeWeek,
  //   eventForm.dateStart,
  //   treeWeek.find((date) => date.day === eventForm?.dateStart),
  //   treeWeek
  //     .find((date) => date.day === eventForm.dateStart)
  //     ?.event_day.find((eventItem) => eventItem?.id_event_day === eventForm.id)
  //     ?.setting_and_booking.event_booking.length
  // );

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
          id: "",
          global_id: "",
        });
        setSubmitState(false);
        setServiceModal(false);
        setEventCopy({});
        setCutTreadState(false);
        setCutTreadState(false);
      }}
    >
      <div
        className="tread-modal"
        style={
          cutTreadModal
            ? { pointerEvents: "all", opacity: 1 }
            : { pointerEvents: "none", opacity: 0 }
        }
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setCutTreadModal(false);
        }}
      >
        <div
          className="tread-modal__wrapper"
          style={
            cutTreadModal
              ? { pointerEvents: "all", opacity: 1 }
              : { pointerEvents: "none", opacity: 0 }
          }
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <div className="tread-modal__text">Внимание!</div>
          <div className="tread-modal__descr">
            Событие будет вырезано из потока повторений
          </div>
          <div
            className="tread-modal__submit"
            onClick={() => {
              cutFromTtread(
                eventForm,
                setEventForm,
                setCutTreadState,
                setCutTreadModal
              );
            }}
          >
            Вырезать
          </div>
        </div>
      </div>
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
          <div className="delete-model__descr">
            Будет удалено записей:
            {" " +
              (updateState.hash
                ? updateState.count
                : treeWeek
                    .find((date) => date.day === eventForm.dateStart)
                    ?.event_day.find(
                      (eventItem) => eventItem?.id_event_day === eventForm.id
                    )?.setting_and_booking.event_booking.length)}
          </div>
          <div
            className="delete-modal__submit"
            onClick={() => {
              if (updateState.hash) {
                submitUpdate(
                  eventForm,
                  updateState.hash,
                  setTreeWeek,
                  setEventModalActive,
                  setRepeatSettingsClass,
                  setEventForm
                );
                setUpdateState({ count: null, hash: null });
                setDeleteState(false);
              } else {
                deleteEvent(
                  eventForm.id,
                  setTreeWeek,
                  setDeleteState,
                  setEventModalActive,
                  setRepeatSettingsClass,
                  setEventForm
                );
              }
            }}
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
          style={eventModalActive.event ? {} : { scale: 0 }}
          onClick={() => setDeleteState(deleteState ? false : true)}
        >
          <img src={deleteImg}></img>
        </div>
        <div className="event-picker__name">
          {eventModalActive.event ? "Настройка события" : "Создание события"}
        </div>
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
              style={"flex-grow:2"}
              value={eventForm}
              setValue={setEventForm}
              services={services}
            ></InputField>
            <div
              className="create-service__btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setServiceModal(true);
              }}
            >
              <img src={plus} />
            </div>
          </div>
        </div>
        <div
          className="setRepeats__btn event-pick-btn"
          onClick={() => {
            repeatSettingsClass
              ? setRepeatSettingsClass("")
              : setRepeatSettingsClass("repeat__settings_active");
          }}
        >
          Настройка повторений
        </div>
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
        <div
          className={
            submitState
              ? "submit__btn event-pick-btn"
              : "submit__btn event-pick-btn submit__btn_error"
          }
          onClick={async () => {
            if (eventModalActive.event && submitState) {
              let respData = await updateEvent(
                eventForm,
                setTreeWeek,
                setEventModalActive,
                setRepeatSettingsClass,
                setEventForm
              );
              console.log("respData", respData);
              if (respData) {
                let deleteCounter = respData.delete_counter;
                let hash = respData.id_hash;
                setUpdateState({ count: deleteCounter, hash: hash });
                setDeleteState(true);
                console.log("setDeleteState", respData);
              }
            } else {
              submitState &&
                setEvent(
                  eventForm,
                  setTreeWeek,
                  setEventModalActive,
                  setRepeatSettingsClass,
                  setEventForm
                );
            }
            setSubmitState(false);
          }}
        >
          Готово
        </div>
        <div
          className={
            cutTreadState
              ? "cut-from-thread__btn"
              : "cut-from-thread__btn cut-from-thread__btn_inactive"
          }
          onClick={() => {
            setCutTreadModal(true);
          }}
        >
          Вырезать из повторений
        </div>
        {mobile ? (
          <div
            className={
              serviceModal
                ? "create-service__modal create-service__modal_active"
                : "create-service__modal"
            }
            onClick={() => setServiceModal(false)}
          >
            <div className="create-service">
              <CreateService
                serviceModal={serviceModal}
                setServiceModal={setServiceModal}
                setServices={setServices}
              />
            </div>
          </div>
        ) : (
          <div className="create-service">
            <CreateService
              serviceModal={serviceModal}
              setServiceModal={setServiceModal}
              setServices={setServices}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default EventPicker;
