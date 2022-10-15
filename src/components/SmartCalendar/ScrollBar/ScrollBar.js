import React, { useEffect, useState } from "react";
import ArrowLeft from "../../../media/Arrow_left.svg";
import ArrowRight from "../../../media/Arrow_right.svg";
import { changeWeek } from "../../submitFunctions/submitFunctions";
import { dateFromDayWeek } from "../../tools/tools";
import "./ScrollBar.css";

function ScrollBar({ treeWeek, setTreeWeek, setPaddingScroll }) {
  const weekName = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  const currentDate = new Date();
  const weekDayRender = weekName.map((week) => {
    let nameClass = "weekBox";
    let splitSelectedRange = treeWeek[0].day.split("-");

    if (
      currentDate.getDate() ===
        dateFromDayWeek(weekName.indexOf(week), treeWeek[0].day)[0] &&
      ((dateFromDayWeek(weekName.indexOf(week), treeWeek[0].day)[1] ===
        currentDate.getMonth() + 1 &&
        Number(splitSelectedRange[0]) === currentDate.getFullYear()) ||
        (dateFromDayWeek(weekName.indexOf(week), treeWeek[0].day)[1] === 1 &&
          Number(splitSelectedRange[0]) + 1 === currentDate.getFullYear()))
    ) {
      nameClass = "weekBox weekBox_current";
    }
    return (
      <div className="weekBox__box">
        <div className={nameClass} id={week}>
          <div className="weekBox__week">{week}</div>
          <div className="weekBox__date">
            {dateFromDayWeek(weekName.indexOf(week), treeWeek[0].day)[0]}
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
          changeWeek(treeWeek, setTreeWeek, "back");
          setPaddingScroll(0);
        }}
      >
        <img className="btn__calendar_img" src={ArrowLeft} alt=""></img>
      </button>
      <div className="weekDayRender__wrapp">{weekDayRender}</div>
      <button
        className="btn__scrollBar"
        id="btn-scrollBar-right"
        onClick={() => {
          changeWeek(treeWeek, setTreeWeek, "front");
          setPaddingScroll(0);
        }}
      >
        <img className="btn__calendar_img" src={ArrowRight} alt=""></img>
      </button>
    </div>
  );
}
export default ScrollBar;
