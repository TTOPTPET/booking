import React, { useEffect, useState } from "react";
import CanvasCalendar from "./CanvasCalendar/CanvasCalendar";
import ScrollBar from "./ScrollBar/ScrollBar";
import "./SmartCalendar.css";

function SmartCalendar({ selectDateRange, currentDate, setSelectDateRange }) {
  return (
    <div className="smartCalendar__wrapper">
      <ScrollBar
        selectDateRange={selectDateRange}
        currentDate={currentDate}
        setSelectDateRange={setSelectDateRange}
      ></ScrollBar>
      <CanvasCalendar></CanvasCalendar>
    </div>
  );
}
export default SmartCalendar;
