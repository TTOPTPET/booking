import { useState } from "react";
import "./PopupCalendar.css";
import ArrowLeft from "../../../../Arrow_left.svg";
import ArrowRight from "../../../../Arrow_right.svg";
import { sendSelectedDate } from "../../../submitFunctions/submitFunctions";

function PopupCalendar({
  setActive,
  firstOpen,
  setFirstOpen,
  selectDate,
  setSelectDate,
}) {
  const currentDate = new Date();
  let date = new Date(selectDate.year, selectDate.month + 1, 0);
  let daysCounter = date.getDate();

  const colomnsMonths = [...Array(12)].map((item, index) => {
    let classForBtn = "month__btn";
    if (
      selectDate.year === currentDate.getFullYear() &&
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
          setSelectDate({ ...selectDate, month: index });
          setFirstOpen(false);
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
        index + 1 === currentDate.getDate() &&
        selectDate.year === currentDate.getFullYear() &&
        currentDate.getMonth() === selectDate.month
      ) {
        classForBtn = "day__btn date_current";
      }
      return (
        <button
          className={classForBtn}
          id={"day" + (index + 1)}
          key={index}
          onClick={() => {
            setSelectDate({ ...selectDate, day: index + 1 });
            setActive(false);
          }}
        >
          <div>{index + 1}</div>
        </button>
      );
    }
    classForBtn = "day__btn day__btn_dark";
    if (
      index + 1 - daysCounter === currentDate.getDate() &&
      ((selectDate.year === currentDate.getFullYear() &&
        currentDate.getMonth() === selectDate.month + 1) ||
        (currentDate.getMonth() === 0 &&
          selectDate.year + 1 === currentDate.getFullYear()))
    ) {
      classForBtn = "day__btn day__btn_dark date_current";
    }
    return (
      <button
        className={classForBtn}
        id={"day" + (index + 1)}
        key={index}
        onClick={() => {
          let bufferMonth = selectDate.month;
          let bufferYear = selectDate.year;
          if (selectDate.month === 11) {
            bufferYear += 1;
            bufferMonth = 0;
          } else {
            bufferMonth = selectDate.month + 1;
          }
          setSelectDate({
            ...selectDate,
            year: bufferYear,
            month: bufferMonth,
            day: index + 1 - daysCounter,
          });
          setActive(false);
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
          {firstOpen
            ? null
            : new Date(selectDate.year, selectDate.month, 1).toLocaleString(
                "ru",
                {
                  month: "long",
                }
              )}
        </div>
        <div className="selected_year">
          {firstOpen ? null : selectDate.year}
        </div>
      </div>
      <div className="btn__wrapp">
        <button
          className="btn__calendar"
          id="btn-calendar-left"
          onClick={() => {
            if (firstOpen) {
              setSelectDate({ ...selectDate, year: selectDate.year - 1 });
            } else {
              if (selectDate.month === 0) {
                setSelectDate({
                  ...selectDate,
                  year: selectDate.year - 1,
                  month: 11,
                });
              } else {
                setSelectDate({
                  ...selectDate,
                  month: selectDate.month - 1,
                });
              }
            }
          }}
        >
          <img className="btn__calendar_img" src={ArrowLeft} alt=""></img>
        </button>
        <div className="calendar__wrapp">
          {firstOpen ? colomnsMonths : colomnsDays}
        </div>
        <button
          className="btn__calendar"
          id="btn-calendar-right"
          onClick={() => {
            if (firstOpen) {
              setSelectDate({ ...selectDate, year: selectDate.year + 1 });
            } else {
              if (selectDate.month === 11) {
                setSelectDate({
                  ...selectDate,
                  year: selectDate.year + 1,
                  month: 0,
                });
              } else {
                setSelectDate({
                  ...selectDate,
                  month: selectDate.month + 1,
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
