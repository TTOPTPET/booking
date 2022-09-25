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
        <div className="modal__content_date">
          {[selectDateRange.start, " - ", selectDateRange.end]}
        </div>
        <PopupCalendar
          currentDate={currentDate}
          setActive={setActive}
          firstOpen={firstOpen}
          setFirstOpen={setFirstOpen}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
        />
      </div>
    </div>
  );
}

export default PopupDatePicker;
