import React, { useState } from "react";
import DatePickerButton from "./DatePickerButton/DatePickerButton";
import PopupDatePicker from "./PopupDatePicker/PopupDatePicker";

function DatePicker({
  selectDateRange,
  currentDate,
  selectDate,
  setSelectDate,
}) {
  const [modalActive, setModalActive] = useState(false);
  const [firstOpen, setFirstOpen] = useState(true);
  const [bufferDate, setBufferDate] = useState(selectDate);

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
