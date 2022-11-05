import React from "react";
import "./DatePickerButton.css";
import { formatDateToView } from "../../tools/tools";
import calendar from "../../../media/calendar.png";

function DatePickerButton({ treeWeek, setModalActive, mobile }) {
  return (
    <div
      className={mobile ? "datePicker_btn_mob" : "datePicker_btn"}
      onClick={(e) => {
        e.preventDefault();
        setModalActive({ active: true, firstOpen: true });
      }}
    >
      {mobile ? (
        <img src={calendar}></img>
      ) : (
        [
          formatDateToView(treeWeek[0].day),
          " - ",
          formatDateToView(treeWeek[6].day),
        ]
      )}
    </div>
  );
}

export default DatePickerButton;
