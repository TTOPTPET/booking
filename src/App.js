import "./App.css";
import React, { useState } from "react";
import DatePicker from "./components/DatePicker/DatePicker";
import SmartCalendar from "./components/SmartCalendar/SmartCalendar";
import { TextField } from "@mui/material";

function App() {
  let currentDate = new Date();

  const [selectDateRange, setSelectDateRange] = useState({
    start: "26.09.2022",
    end: "2.10.2022",
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
