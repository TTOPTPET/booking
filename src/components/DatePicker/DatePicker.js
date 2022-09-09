import React, { useEffect, useState } from "react";
import { sendSelectedDate } from "../submitFunctions/submitFunctions";
import DatePickerButton from "./DatePickerButton/DatePickerButton";
import PopupDatePicker from "./PopupDatePicker/PopupDatePicker";

function DatePicker({ selectDateRange, currentDate }) {
  const [selectDate, setSelectDate] = useState({
    day: currentDate.getDate(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  });
  const [modalActive, setModalActive] = useState(false);
  const [firstOpen, setFirstOpen] = useState(true);
  const [bufferDate, setBufferDate] = useState(selectDate);

  useEffect(() => {
    if (firstOpen === false) {
      sendSelectedDate(selectDate);
    }
  }, [selectDate.day]);

  return (
    <div>
      <DatePickerButton
        selectDateRange={selectDateRange}
        setModalActive={setModalActive}
        setFirstOpen={setFirstOpen}
        setBufferDate={setBufferDate}
        selectDate={selectDate}
      />
      <PopupDatePicker
        active={modalActive}
        setActive={setModalActive}
        selectDateRange={selectDateRange}
        currentDate={currentDate}
        firstOpen={firstOpen}
        setFirstOpen={setFirstOpen}
        selectDate={selectDate}
        setSelectDate={setSelectDate}
        bufferDate={bufferDate}
      />
    </div>
  );
}

export default DatePicker;
