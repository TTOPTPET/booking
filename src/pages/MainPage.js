import React, { useState, useEffect } from "react";
import DatePicker from "../components/DatePicker/DatePicker";
import SmartCalendar from "../components/SmartCalendar/SmartCalendar";
import { defaultData, defaultServices, jsonchick } from "../config/config";
import {
  getCurrentWeek,
  getServices,
} from "../components/submitFunctions/submitFunctions";

const MainPage = () => {
  const [treeWeek, setTreeWeek] = useState(jsonchick);
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    getCurrentWeek(setTreeWeek);
    getServices(setServices);
  }, []);

  return (
    <div style={{ paddingTop: "10px" }}>
      <DatePicker treeWeek={treeWeek} setTreeWeek={setTreeWeek} />
      <SmartCalendar
        treeWeek={treeWeek}
        setTreeWeek={setTreeWeek}
        services={services}
      ></SmartCalendar>
    </div>
  );
};

export default MainPage;
