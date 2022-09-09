import "./App.css";
import React, { useState } from "react";
import DatePicker from "./components/DatePicker/DatePicker";

function App() {
  let currentDate = new Date();

  const [selectDateRange, setSelectDateRange] = useState(
    "12.02.2022 - 19.02.2022"
  );

  return (
    <div className="App">
      <DatePicker selectDateRange={selectDateRange} currentDate={currentDate} />
    </div>
  );
}

export default App;
