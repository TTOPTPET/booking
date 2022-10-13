import "./App.css";
import React, { useState, useEffect } from "react";
import DatePicker from "./components/DatePicker/DatePicker";
import SmartCalendar from "./components/SmartCalendar/SmartCalendar";
import {
  getCurrentWeek,
  getServices,
} from "./components/submitFunctions/submitFunctions";
import { defaultData, defaultServices } from "./config/config";

function App() {
  const [treeWeek, setTreeWeek] = useState(defaultData);
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    // getCurrentWeek(setTreeWeek);
    // getServices(setServices);
    console.log("treeWeek", treeWeek);
  }, []);

  return (
    <div className="App">
      <DatePicker treeWeek={treeWeek} setTreeWeek={setTreeWeek} />
      <SmartCalendar
        treeWeek={treeWeek}
        setTreeWeek={setTreeWeek}
        services={services}
      ></SmartCalendar>
    </div>
  );
}

export default App;
