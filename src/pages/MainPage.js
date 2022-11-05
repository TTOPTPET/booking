import React, { useState, useEffect } from "react";
import DatePicker from "../components/DatePicker/DatePicker";
import SmartCalendar from "../components/SmartCalendar/SmartCalendar";
import {
  getCurrentWeek,
  getServices,
} from "../components/submitFunctions/submitFunctions";

const MainPage = ({ treeWeek, setTreeWeek, services, setServices, mobile }) => {
  useEffect(() => {
    getCurrentWeek(setTreeWeek);
    getServices(setServices);
  }, []);

  return (
    <div style={{ paddingTop: "10px" }}>
      {mobile ? (
        <></>
      ) : (
        <DatePicker treeWeek={treeWeek} setTreeWeek={setTreeWeek} />
      )}
      <SmartCalendar
        treeWeek={treeWeek}
        setTreeWeek={setTreeWeek}
        services={services}
        setServices={setServices}
      ></SmartCalendar>
    </div>
  );
};

export default MainPage;
