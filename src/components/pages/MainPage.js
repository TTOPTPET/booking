import React, { useState, useEffect } from "react";
import DatePicker from "../DatePicker/DatePicker";
import SmartCalendar from "../SmartCalendar/SmartCalendar";
import {
  getCurrentWeek,
  getServices,
} from "../submitFunctions/submitFunctions";
import { defaultData, defaultServices } from "../../config/config";

const MainPage = () => {

    const [treeWeek, setTreeWeek] = useState(defaultData);
    const [services, setServices] = useState(defaultServices);

    useEffect(() => {
        // getCurrentWeek(setTreeWeek);
        // getServices(setServices);
        console.log("treeWeek", treeWeek);
    }, []);

    return (
        <>
            <DatePicker treeWeek={treeWeek} setTreeWeek={setTreeWeek} />
            <SmartCalendar
                treeWeek={treeWeek}
                setTreeWeek={setTreeWeek}
                services={services}>
            </SmartCalendar>
        </>
    )
}

export default MainPage;