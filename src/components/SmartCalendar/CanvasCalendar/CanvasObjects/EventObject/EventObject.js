import React, { useEffect, useState, useRef } from "react";
import { getTimeCoef } from "../../../../tools/tools";
import RegistrationObjects from "../RegistrationObjects/RegistrationObjects";
import { useMediaQuery } from "react-responsive";
import "./EventObject.css";

function EventObject({
  setEventModalActive,
  setEventForm,
  newEvent,
  combinMargin,
  setPaddingScroll,
  paddingScroll,
  unfoldLeft,
  treeWeek,
  colIndex,
  setEventCopy,
  mobile,
}) {
  const maxWidth = useMediaQuery({
    query: "(min-width: 1200px)",
  });
  const [unfoldEvent, setUnfoldEvent] = useState(false);
  useEffect(() => {
    setUnfoldEvent(false);
  }, [treeWeek]);

  let eventWidth = () => {
    if (mobile) {
      return unfoldEvent
        ? `calc(${13 * 2 - 3 * combinMargin}vw - 2px)`
        : `calc(${13 - 3 * combinMargin}vw - 1px)`;
    } else {
      return unfoldEvent
        ? `calc(${10 * 2 - 1 * combinMargin}vw - 2px)`
        : `calc(${10 - 1 * combinMargin}vw - 1px)`;
    }
  };
  let eventMargin = () => {
    if (mobile) {
      return 3 * combinMargin + "vw";
    } else {
      return maxWidth ? 15 * combinMargin + "px" : 1 * combinMargin + "vw";
    }
  };
  return (
    <div
      className="event__wrapper"
      style={{
        right: unfoldLeft && "0",
        left: !unfoldLeft && "0",
        top:
          newEvent.correct_time_start.split(":")[1] -
          (unfoldEvent ? 55 : 0) +
          "px",
        height:
          60 *
            getTimeCoef(
              newEvent.correct_time_start,
              newEvent.correct_time_end
            ) -
          1 +
          (unfoldEvent ? 125 : 0) +
          "px",
        width: eventWidth(),
        maxWidth: unfoldEvent
          ? 238 - 15 * combinMargin + "px"
          : 119 - 15 * combinMargin + "px",
        marginLeft: eventMargin(),
        textAlign: unfoldEvent ? "center" : "start",
        zIndex: unfoldEvent ? 100 : 98,
      }}
      id={newEvent.id_event_day}
      onClick={(e) => {
        const unfbuff = unfoldEvent;
        unfoldEvent ? setUnfoldEvent(false) : setUnfoldEvent(true);
        if (setPaddingScroll) {
          unfbuff
            ? setPaddingScroll(paddingScroll - 1)
            : setPaddingScroll(paddingScroll + 1);
        }
        e.stopPropagation();
      }}
    >
      <div className="event__text">
        {'"' + newEvent.setting_and_booking.event_setting.name_event + '"'}
      </div>
      {unfoldEvent ? (
        <div className="event__time_book">
          {newEvent.setting_and_booking.event_setting.event_time_start.slice(
            0,
            -3
          ) +
            " - " +
            newEvent.setting_and_booking.event_setting.event_time_end.slice(
              0,
              -3
            )}
        </div>
      ) : (
        <div className="event__counter">
          {newEvent.setting_and_booking.event_booking.length}
        </div>
      )}
      {unfoldEvent ? (
        <RegistrationObjects
          newEvent={newEvent}
          colIndex={colIndex}
          treeWeek={treeWeek}
        ></RegistrationObjects>
      ) : (
        <></>
      )}
      {unfoldEvent ? (
        <div
          className="picker__btn"
          onClick={(e) => {
            console.log("ffffffff");
            e.stopPropagation();
            setEventForm({
              name: newEvent.setting_and_booking.event_setting.name_event,
              dateStart: newEvent.day_start,
              dateEnd: newEvent.day_end,
              timeStart:
                newEvent.setting_and_booking.event_setting.event_time_start,
              timeEnd:
                newEvent.setting_and_booking.event_setting.event_time_end,
              selection:
                newEvent.setting_and_booking.event_setting.all_services,
              repeatWeek: newEvent.setting_and_booking.event_setting.weekdays,
              id: newEvent.id_event_day,
              global_id:
                newEvent.setting_and_booking.event_setting.id_global_event,
              repeatEnd:
                newEvent.setting_and_booking.event_setting.day_end_rapid,
            });
            setEventCopy({
              name: newEvent.setting_and_booking.event_setting.name_event,
              dateStart: newEvent.day_start,
              dateEnd: newEvent.day_end,
              timeStart:
                newEvent.setting_and_booking.event_setting.event_time_start,
              timeEnd:
                newEvent.setting_and_booking.event_setting.event_time_end,
              selection:
                newEvent.setting_and_booking.event_setting.all_services,
              repeatWeek: newEvent.setting_and_booking.event_setting.weekdays,
              id: newEvent.id_event_day,
              global_id:
                newEvent.setting_and_booking.event_setting.id_global_event,
              repeatEnd:
                newEvent.setting_and_booking.event_setting.day_end_rapid,
            });
            setEventModalActive({ active: true, event: true });
          }}
        >
          редактировать
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default EventObject;
