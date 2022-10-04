import "./App.css";
import React, { useState, useEffect } from "react";
import DatePicker from "./components/DatePicker/DatePicker";
import SmartCalendar from "./components/SmartCalendar/SmartCalendar";
import { getCurrentWeek } from "./components/submitFunctions/submitFunctions";
import { defaultData } from "./config/config";

function App() {
  const [treeWeek, setTreeWeek] = useState(defaultData);

  useEffect(() => {
    getCurrentWeek(setTreeWeek);
  }, []);

  return (
    <div className="App">
      <DatePicker treeWeek={treeWeek} setTreeWeek={setTreeWeek} />
      <SmartCalendar
        treeWeek={treeWeek}
        setTreeWeek={setTreeWeek}
      ></SmartCalendar>
    </div>
  );
}

export default App;
