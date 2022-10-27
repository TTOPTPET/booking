import { useState, useEffect } from "react";
import "./PopupCalendar.css";
import ArrowLeft from "../../../../media/Arrow_left.svg";
import ArrowRight from "../../../../media/Arrow_right.svg";
import { sendSelectedDate } from "../../../submitFunctions/submitFunctions";
import { formatDateToSet } from "../../../tools/tools";

function PopupCalendar({
  setTreeWeek,
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
    if (canRecive === true) {
      sendSelectedDate(formatDateToSet(selectDate), setTreeWeek);
      setCanRecive(false);
    }
  }, [selectDate]);

  const renderMonths = [...Array(3)].map((item, rIndex) => {
    return (
      <div className={"row__month"}>
        {[...Array(4)].map((item, cIndex) => {
          let classForBtn = "month__btn";
          if (
            Number(selectDate.year) === currentDate.getFullYear() &&
            currentDate.getMonth() === cIndex + 4 * rIndex
          ) {
            classForBtn = "month__btn date_current";
          }
          return (
            <div
              className={classForBtn}
              id={"month" + (cIndex + 4 * rIndex)}
              key={cIndex + 4 * rIndex}
              onClick={() => {
                setSelectDate({
                  ...selectDate,
                  month: cIndex + 4 * rIndex + 1,
                });
                setModalActive({ active: true, firstOpen: false });
              }}
            >
              <div>{selectDate.year}</div>
              <div>
                {new Date(
                  selectDate.year,
                  cIndex + 4 * rIndex,
                  1
                ).toLocaleString("ru", {
                  month: "long",
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  });

  const renderDays = [...Array(6)].map((item, rIndex) => {
    return (
      <div className="row__days">
        {[...Array(6)].map((item, cIndex) => {
          let classForBtn = "day__btn";
          if (cIndex + 6 * rIndex < daysCounter) {
            if (
              cIndex + 6 * rIndex + 1 === Number(currentDate.getDate()) &&
              Number(selectDate.year) === currentDate.getFullYear() &&
              currentDate.getMonth() === Number(selectDate.month) - 1
            ) {
              classForBtn = "day__btn date_current";
            }
            return (
              <div
                className={classForBtn}
                id={"day" + (cIndex + 6 * rIndex)}
                key={cIndex + 6 * rIndex}
                onClick={() => {
                  setSelectDate({
                    ...selectDate,
                    day: cIndex + 6 * rIndex + 1,
                  });
                  setModalActive({ active: false, firstOpen: false });
                  setCanRecive(true);
                }}
              >
                <div>{cIndex + 6 * rIndex + 1}</div>
              </div>
            );
          }
          classForBtn = "day__btn day__btn_dark";
          if (
            cIndex + 6 * rIndex + 1 - daysCounter === currentDate.getDate() &&
            ((Number(selectDate.year) === currentDate.getFullYear() &&
              currentDate.getMonth() === Number(selectDate.month)) ||
              (currentDate.getMonth() === 0 &&
                Number(selectDate.year) + 1 === currentDate.getFullYear()))
          ) {
            classForBtn = "day__btn day__btn_dark date_current";
          }
          return (
            <div
              className={classForBtn}
              id={"day" + (cIndex + 6 * rIndex)}
              key={cIndex + 6 * rIndex}
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
                  day: cIndex + 6 * rIndex + 1 - daysCounter,
                });
                setModalActive({ active: false, firstOpen: false });
                setCanRecive(true);
              }}
            >
              <div>{cIndex + 6 * rIndex - daysCounter + 1}</div>
            </div>
          );
        })}
      </div>
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
        <div
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
        </div>
        <div className="calendar__wrapp">
          {modalActive.firstOpen ? renderMonths : renderDays}
        </div>
        <div
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
        </div>
      </div>
    </div>
  );
}

export default PopupCalendar;
