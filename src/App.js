import "./App.css";
import React, { useState } from "react";
import DatePicker from "./components/DatePicker/DatePicker";

function App() {
  let currentDate = new Date();

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
      <div>{JSON.stringify(selectDate)}</div>
      <DatePicker
        selectDateRange={selectDateRange}
        setSelectDateRange={setSelectDateRange}
        currentDate={currentDate}
        selectDate={selectDate}
        setSelectDate={setSelectDate}
      />
    </div>
  );
}

export default App;
