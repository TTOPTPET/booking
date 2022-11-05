import { getTimeCoef } from "../../../../tools/tools";
import "./RegistrationObjects.css";

function RegistrationObjects({ newEvent, colIndex, treeWeek }) {
  let lastBookEnd = "00:00:00";
  let marginCoef = 0;
  const curDay = treeWeek[colIndex].day;
  return newEvent?.setting_and_booking.event_booking.map((book) => {
    // console.log(
    //   "marginCoef_g",
    //   newEvent,
    //   lastBookEnd,
    //   book.correct_booking_time_start[curDay][0],
    //   getTimeCoef(lastBookEnd, book.correct_booking_time_start[curDay][0])
    // );
    if (book?.correct_booking_time_start?.[curDay]) {
      if (
        getTimeCoef(lastBookEnd, book.correct_booking_time_start[curDay][0]) < 0
      ) {
        // console.log(
        //   "marginCoef",
        //   newEvent,
        //   lastBookEnd,
        //   book.correct_booking_time_start[curDay][0],
        //   getTimeCoef(lastBookEnd, book.correct_booking_time_start[curDay][0])
        // );
        marginCoef += 1;
      } else {
        marginCoef = 0;
      }
      lastBookEnd = book.correct_booking_time_start[curDay][1];
      return (
        <div
          className="book__wrapper"
          style={{
            height:
              60 *
                getTimeCoef(
                  book.correct_booking_time_start[curDay][0],
                  book.correct_booking_time_start[curDay][1]
                ) -
              1 +
              "px",
            top:
              60 *
                getTimeCoef(
                  newEvent.correct_time_start,
                  book.correct_booking_time_start[curDay][0]
                ) -
              1 +
              55 +
              "px",
            marginLeft: 15 * marginCoef + "px",
            width: "calc(100% - " + (15 * marginCoef + 20) + "px)",
          }}
          id={book.id}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="book__time">
            {book.booking_time_start.slice(0, -3) +
              " - " +
              book.booking_time_end.slice(0, -3)}
          </div>
          <div className="book__service">
            {book.subscription_service.name_service}
          </div>
          <div className="book__name">{book.comment}</div>
        </div>
      );
    }
  });
}
export default RegistrationObjects;
