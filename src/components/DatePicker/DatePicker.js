import React, { useEffect, useState } from "react";
import DatePickerButton from "./DatePickerButton/DatePickerButton";
import PopupDatePicker from "./PopupDatePicker/PopupDatePicker";
import { formatDateToObject } from "../SmartCalendar/tools/tools";

function DatePicker({ treeWeek }) {
  const [selectDate, setSelectDate] = useState(
    formatDateToObject(treeWeek[0].day)
  );
  const [modalActive, setModalActive] = useState({
    active: false,
    firstOpen: true,
  });

  return (
    <div>
      <DatePickerButton treeWeek={treeWeek} setModalActive={setModalActive} />
      <PopupDatePicker
        modalActive={modalActive}
        setModalActive={setModalActive}
        treeWeek={treeWeek}
        selectDate={selectDate}
        setSelectDate={setSelectDate}
      />
    </div>
  );
}

export default DatePicker;
