import React, { useState, useEffect } from "react";
import DatePicker from "../../components/DatePicker/DatePicker";
import SmartCalendar from "../../components/SmartCalendar/SmartCalendar";
import {
  getCurrentWeek,
  getServices,
} from "../../components/submitFunctions/submitFunctions";
import { formatDateToView } from "../../components/tools/tools";
import "./MainPage.css";

const MainPage = ({ treeWeek, setTreeWeek, services, setServices, mobile }) => {
  useEffect(() => {
    (async () => {
      getCurrentWeek().then(
        (value) => setTreeWeek(value.data),
        (reason) => console.error(reason)
      );
      getServices().then(
        (value) => setServices(value.data),
        (reason) => console.error(reason)
      );
    })();
  }, []);

  return (
    <div style={{ paddingTop: "10px" }}>
      {mobile ? (
        <div className="week__mobile">
          {[
            formatDateToView(treeWeek[0].day),
            " - ",
            formatDateToView(treeWeek[6].day),
          ]}
        </div>
      ) : (
        <DatePicker treeWeek={treeWeek} setTreeWeek={setTreeWeek} />
      )}
      <SmartCalendar
        treeWeek={treeWeek}
        setTreeWeek={setTreeWeek}
        services={services}
        setServices={setServices}
        mobile={mobile}
      ></SmartCalendar>
    </div>
  );
};

export default MainPage;
