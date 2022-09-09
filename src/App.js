import "./App.css";
import React, { useState } from "react";
import DatePicker from "./components/DatePicker/DatePicker";

function App() {
  let currentDate = new Date();

  const monthsArr = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];

  const [selectDateRange, setSelectDateRange] = useState(
    "12.02.2022 - 19.02.2022"
  );
  const [selectDate, setSelectDate] = useState({
    day: currentDate.getDate(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  });
  return (
    <div className="App">
      <div>
        {currentDate.toLocaleString("ru", {
          month: "long",
        })}
      </div>
      <DatePicker
        selectDateRange={selectDateRange}
        setSelectDateRange={setSelectDateRange}
        currentDate={currentDate}
        selectDate={selectDate}
        setSelectDate={setSelectDate}
        monthsArr={monthsArr}
      />
    </div>
  );
}

export default App;
