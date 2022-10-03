import React from "react";
import "./DatePickerButton.css";
import { formatDateToView } from "../../SmartCalendar/tools/tools";

function DatePickerButton({ treeWeek, setModalActive }) {
  return (
    <button
      className="datePicker_btn"
      onClick={(e) => {
        e.preventDefault();
        setModalActive({ active: true, firstOpen: true });
      }}
    >
      {[
        formatDateToView(treeWeek[0].day),
        " - ",
        formatDateToView(treeWeek[6].day),
      ]}
    </button>
  );
}

export default DatePickerButton;
