import { useState, useEffect } from "react";
import "./PopupCalendar.css";
import ArrowLeft from "../../../../Arrow_left.svg";
import ArrowRight from "../../../../Arrow_right.svg";
import { sendSelectedDate } from "../../../submitFunctions/submitFunctions";
import { formatDateToSet } from "../../../SmartCalendar/tools/tools";

function PopupCalendar({
  modalActive,
  setModalActive,
  selectDate,
  setSelectDate,
}) {
  const currentDate = new Date();
  let date = new Date(selectDate.year, selectDate.month - 1, 0);
  let daysCounter = date.getDate();
  const [canRecive, setCanRecive] = useState(false);

  useEffect(() => {
    if (modalActive.active === false && canRecive === true) {
      sendSelectedDate(formatDateToSet(selectDate));
      setCanRecive(false);
    }
  }, [selectDate.day]);

  const colomnsMonths = [...Array(12)].map((item, index) => {
    let classForBtn = "month__btn";
    if (
      Number(selectDate.year) === currentDate.getFullYear() &&
      currentDate.getMonth() === index
    ) {
      classForBtn = "month__btn date_current";
    }
    return (
      <button
        className={classForBtn}
        id={index}
        key={index}
        onClick={() => {
          setSelectDate({
            ...selectDate,
            month: index + 1,
          });
          setModalActive({ active: true, firstOpen: false });
        }}
      >
        <div>{selectDate.year}</div>
        <div>
          {new Date(selectDate.year, index, 1).toLocaleString("ru", {
            month: "long",
          })}
        </div>
      </button>
    );
  });

  const colomnsDays = [...Array(36)].map((item, index) => {
    let classForBtn = "day__btn";
    if (index < daysCounter) {
      if (
        index + 1 === Number(currentDate.getDate()) &&
        Number(selectDate.year) === currentDate.getFullYear() &&
        currentDate.getMonth() === Number(selectDate.month) - 1
      ) {
        classForBtn = "day__btn date_current";
      }
      return (
        <button
          className={classForBtn}
          id={"day" + (index + 1)}
          key={index}
          onClick={() => {
            setSelectDate({
              ...selectDate,
              day: index + 1,
            });
            setModalActive({ active: false, firstOpen: false });
            setCanRecive(true);
          }}
        >
          <div>{index + 1}</div>
        </button>
      );
    }
    classForBtn = "day__btn day__btn_dark";
    if (
      index + 1 - daysCounter === currentDate.getDate() &&
      ((Number(selectDate.year) === currentDate.getFullYear() &&
        currentDate.getMonth() === Number(selectDate.month)) ||
        (currentDate.getMonth() === 0 &&
          Number(selectDate.year) + 1 === currentDate.getFullYear()))
    ) {
      classForBtn = "day__btn day__btn_dark date_current";
    }
    return (
      <button
        className={classForBtn}
        id={"day" + (index + 1)}
        key={index}
        onClick={() => {
          let bufferDate = { year: null, month: null };
          if (selectDate.month === 12) {
            bufferDate.year = Number(selectDate.year) + 1;
            bufferDate.month = 1;
          } else {
            bufferDate.month = Number(selectDate.month) + 1;
          }
          setSelectDate({
            ...selectDate,
            year: bufferDate.year ? bufferDate.year : selectDate.year,
            month: bufferDate.month ? bufferDate.month : selectDate.month,
            day: index + 1 - daysCounter,
          });
          setModalActive({ active: false, firstOpen: false });
          setCanRecive(true);
        }}
      >
        <div>{index - daysCounter + 1}</div>
      </button>
    );
  });

  return (
    <div className="popup__wrapp">
      <div className="calendar__selectedDate">
        <div className="selected_month">
          {modalActive.firstOpen
            ? null
            : new Date(selectDate.year, selectDate.month - 1, 1).toLocaleString(
                "ru",
                {
                  month: "long",
                }
              )}
        </div>
        <div className="selected_year">
          {modalActive.firstOpen ? null : selectDate.year}
        </div>
      </div>
      <div className="btn__wrapp">
        <button
          className="btn__calendar"
          id="btn-calendar-left"
          onClick={() => {
            if (modalActive.firstOpen) {
              setSelectDate({
                ...selectDate,
                year: Number(selectDate.year) - 1,
              });
            } else {
              if (Number(selectDate.month) === 1) {
                setSelectDate({
                  ...selectDate,
                  year: Number(selectDate.year) - 1,
                  month: 12,
                });
              } else {
                setSelectDate({
                  ...selectDate,
                  month: Number(selectDate.month) - 1,
                });
              }
            }
          }}
        >
          <img className="btn__calendar_img" src={ArrowLeft} alt=""></img>
        </button>
        <div className="calendar__wrapp">
          {modalActive.firstOpen ? colomnsMonths : colomnsDays}
        </div>
        <button
          className="btn__calendar"
          id="btn-calendar-right"
          onClick={() => {
            if (modalActive.firstOpen) {
              setSelectDate({
                ...selectDate,
                year: Number(selectDate.year) + 1,
              });
            } else {
              if (Number(selectDate.month) === 12) {
                setSelectDate({
                  ...selectDate,
                  year: Number(selectDate.year) + 1,
                  month: 1,
                });
              } else {
                setSelectDate({
                  ...selectDate,
                  month: Number(selectDate.month) + 1,
                });
              }
            }
          }}
        >
          <img className="btn__calendar_img" src={ArrowRight} alt=""></img>
        </button>
      </div>
    </div>
  );
}

export default PopupCalendar;
