import React, { useEffect, useState } from "react";
import ArrowLeft from "../../../Arrow_left.svg";
import ArrowRight from "../../../Arrow_right.svg";
import {
  changeWeekBack,
  changeWeekFront,
} from "../../submitFunctions/submitFunctions";
import "./ScrollBar.css";

function ScrollBar({ selectDateRange, currentDate, setSelectDateRange }) {
  const weekName = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

  const weekBoxDate = (week, splitSelectedRange, cDate) => {
    if (
      Number(splitSelectedRange[0]) + Number(weekName.indexOf(week)) >
      cDate.getDate()
    ) {
      const newMonth =
        Number(splitSelectedRange[1]) === 12
          ? 1
          : Number(splitSelectedRange[1]) + 1;
      return [
        Number(splitSelectedRange[0]) +
          Number(weekName.indexOf(week)) -
          cDate.getDate(),
        newMonth,
      ];
    }
    return [
      Number(splitSelectedRange[0]) + Number(weekName.indexOf(week)),
      Number(splitSelectedRange[1]),
    ];
  };

  const weekDayRender = weekName.map((week) => {
    let nameClass = "weekBox";
    let splitSelectedRange = selectDateRange.start.split(".");
    const cDate = new Date(splitSelectedRange[2], splitSelectedRange[1], 0);
    if (
      currentDate.getDate() ===
        weekBoxDate(week, splitSelectedRange, cDate)[0] &&
      ((weekBoxDate(week, splitSelectedRange, cDate)[1] ===
        currentDate.getMonth() + 1 &&
        Number(splitSelectedRange[2]) === currentDate.getFullYear()) ||
        (weekBoxDate(week, splitSelectedRange, cDate)[1] === 1 &&
          Number(splitSelectedRange[2]) + 1 === currentDate.getFullYear()))
    ) {
      nameClass = "weekBox weekBox_current";
    }
    return (
      <div className="weekBox__box">
        <div className={nameClass} id={week}>
          <div className="weekBox__week">{week}</div>
          <div className="weekBox__date">
            {weekBoxDate(week, splitSelectedRange, cDate)[0]}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="scroll__bar">
      <button
        className="btn__scrollBar"
        id="btn-scrollBar-left"
        onClick={() => {
          changeWeekBack(selectDateRange);
        }}
      >
        <img className="btn__calendar_img" src={ArrowLeft} alt=""></img>
      </button>
      <div className="weekDayRender__wrapp">{weekDayRender}</div>
      <button
        className="btn__scrollBar"
        id="btn-scrollBar-right"
        onClick={() => {
          changeWeekFront(selectDateRange);
        }}
      >
        <img className="btn__calendar_img" src={ArrowRight} alt=""></img>
      </button>
    </div>
  );
}
export default ScrollBar;
