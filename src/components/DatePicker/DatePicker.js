import React, { useEffect, useState } from "react";
import DatePickerButton from "./DatePickerButton/DatePickerButton";
import PopupDatePicker from "./PopupDatePicker/PopupDatePicker";
import { formatDateToObject } from "../tools/tools";

function DatePicker({ treeWeek, setTreeWeek, mobile }) {
  const [selectDate, setSelectDate] = useState(
    formatDateToObject(treeWeek[0].day)
  );
  const [modalActive, setModalActive] = useState({
    active: false,
    firstOpen: true,
  });

  useEffect(() => {
    setSelectDate(formatDateToObject(treeWeek[0].day));
  }, [treeWeek]);

  return (
    <div>
      <DatePickerButton
        treeWeek={treeWeek}
        setModalActive={setModalActive}
        mobile={mobile}
      />
      <PopupDatePicker
        modalActive={modalActive}
        setModalActive={setModalActive}
        treeWeek={treeWeek}
        setTreeWeek={setTreeWeek}
        selectDate={selectDate}
        setSelectDate={setSelectDate}
      />
    </div>
  );
}

export default DatePicker;
