import "./App.css";
import React, { useState } from "react";
import DatePicker from "./components/DatePicker/DatePicker";
import SmartCalendar from "./components/SmartCalendar/SmartCalendar";
import { TextField } from "@mui/material";
import { getBooking } from "./components/submitFunctions/submitFunctions";

function App() {
  const [treeWeek, setTreeWeek] = useState(getBooking());

  const [selectDateRange, setSelectDateRange] = useState({
    start: "3.10.2022",
    end: "10.10.2022",
  });

  return (
    <div className="App">
      <DatePicker treeWeek={treeWeek} />
      <SmartCalendar
        selectDateRange={selectDateRange}
        setSelectDateRange={setSelectDateRange}
      ></SmartCalendar>
    </div>
  );
}

export default App;
