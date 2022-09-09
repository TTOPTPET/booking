import React from "react";
import "./DatePickerButton.css";

function DatePickerButton({
  selectDateRange,
  setModalActive,
  setFirstOpen,
  setBufferDate,
  selectDate,
}) {
  return (
    <button
      className="datePicker_btn"
      onClick={(e) => {
        e.preventDefault();
        setModalActive(true);
        setFirstOpen(true);
        setBufferDate(selectDate);
      }}
    >
      {selectDateRange}
    </button>
  );
}

export default DatePickerButton;
