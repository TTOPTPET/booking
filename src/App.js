import "./App.css";
import React, { useState } from "react";
import DatePicker from "./components/DatePicker/DatePicker";
import SmartCalendar from "./components/SmartCalendar/SmartCalendar";

function App() {
  let currentDate = new Date();

  const [selectDateRange, setSelectDateRange] = useState({
    start: "19.09.2022",
    end: "26.09.2022",
  });

  return (
    <div className="App">
      <DatePicker selectDateRange={selectDateRange} currentDate={currentDate} />
      <SmartCalendar
        selectDateRange={selectDateRange}
        currentDate={currentDate}
        setSelectDateRange={setSelectDateRange}
      ></SmartCalendar>
    </div>
  );
}

export default App;
