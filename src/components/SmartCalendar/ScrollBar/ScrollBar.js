import React, { useEffect, useState } from "react";
import ArrowLeft from "../../../Arrow_left.svg";
import ArrowRight from "../../../Arrow_right.svg";
import "./ScrollBar.css";

function ScrollBar({ selectDateRange, currentDate, setSelectDateRange }) {
  const weekName = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

  const weekDayRender = weekName.map((week) => {
    let weekBoxDate =
      Number(selectDateRange.start.slice(0, 2)) + weekName.indexOf(week);
    let nameClass = "weekBox";
    if (currentDate.getDate() === weekBoxDate) {
      nameClass = "weekBox weekBox_current";
    }
    return (
      <div className={nameClass} id="week">
        <div className="weekBox__week">{week}</div>
        <div className="weekBox__date">{weekBoxDate}</div>
      </div>
    );
  });

  return (
    <div className="scroll__bar">
      <button
        className="btn__scrollBar"
        id="btn-scrollBar-left"
        onClick={() => {}}
      >
        <img className="btn__calendar_img" src={ArrowLeft} alt=""></img>
      </button>
      <div className="weekDayRender__wrapp">{weekDayRender}</div>
      <button
        className="btn__scrollBar"
        id="btn-scrollBar-right"
        onClick={() => {}}
      >
        <img className="btn__calendar_img" src={ArrowRight} alt=""></img>
      </button>
    </div>
  );
}
export default ScrollBar;
