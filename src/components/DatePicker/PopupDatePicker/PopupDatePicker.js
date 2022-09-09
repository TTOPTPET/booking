import { useState } from "react";
import PopupCalendar from "./PopupCalendar/PopupCalendar";
import "./PopupDatePicker.css";

function PopupDatePicker({
  active,
  setActive,
  selectDateRange,
  currentDate,
  firstOpen,
  setFirstOpen,
  monthsArr,
  selectDate,
  setSelectDate,
  bufferDate,
}) {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => {
        setActive(false);
        setSelectDate(bufferDate);
      }}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__content_date">{selectDateRange}</div>
        <PopupCalendar
          selectDateRange={selectDateRange}
          currentDate={currentDate}
          setActive={setActive}
          firstOpen={firstOpen}
          setFirstOpen={setFirstOpen}
          monthsArr={monthsArr}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
        />
      </div>
    </div>
  );
}

export default PopupDatePicker;
