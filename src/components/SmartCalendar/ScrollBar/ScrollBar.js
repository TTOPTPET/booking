import React, { useEffect, useState } from "react";
import ArrowLeft from "../../../Arrow_left.svg";
import ArrowRight from "../../../Arrow_right.svg";
import {
  changeWeekBack,
  changeWeekFront,
} from "../../submitFunctions/submitFunctions";
import { dateFromDayWeek } from "../tools/getDateFromPick";
import "./ScrollBar.css";

function ScrollBar({ selectDateRange, setSelectDateRange }) {
  const weekName = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  const currentDate = new Date();
  const weekDayRender = weekName.map((week) => {
    let nameClass = "weekBox";
    let splitSelectedRange = selectDateRange.start.split(".");

    if (
      currentDate.getDate() ===
        dateFromDayWeek(weekName.indexOf(week), selectDateRange)[0] &&
      ((dateFromDayWeek(weekName.indexOf(week), selectDateRange)[1] ===
        currentDate.getMonth() + 1 &&
        Number(splitSelectedRange[2]) === currentDate.getFullYear()) ||
        (dateFromDayWeek(weekName.indexOf(week), selectDateRange)[1] === 1 &&
          Number(splitSelectedRange[2]) + 1 === currentDate.getFullYear()))
    ) {
      nameClass = "weekBox weekBox_current";
    }
    return (
      <div className="weekBox__box">
        <div className={nameClass} id={week}>
          <div className="weekBox__week">{week}</div>
          <div className="weekBox__date">
            {dateFromDayWeek(weekName.indexOf(week), selectDateRange)[0]}
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
