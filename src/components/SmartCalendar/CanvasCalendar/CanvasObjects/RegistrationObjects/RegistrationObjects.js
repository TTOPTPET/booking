import { getTimeCoef } from "../../../../tools/tools";
import "./RegistrationObjects.css";

function RegistrationObjects({ newEvent }) {
  let lastBookEnd = "00:00:00";
  let marginCoef = 0;
  return newEvent?.setting_and_booking.event_booking.map((book) => {
    if (getTimeCoef(lastBookEnd, book.booking_time_start) < 0) {
      marginCoef += 1;
    } else {
      marginCoef = 0;
    }
    lastBookEnd = book.booking_time_end;
    return (
      <div
        className="book__wrapper"
        style={{
          height:
            60 * getTimeCoef(book.booking_time_start, book.booking_time_end) -
            1 +
            "px",
          top:
            60 *
              getTimeCoef(
                newEvent.correct_time_start,
                book.booking_time_start
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
        <div className="book__name">{book.comment}</div>
        <div className="book__time">
          {book.booking_time_start + " - " + book.booking_time_end}
        </div>
      </div>
    );
  });
}
export default RegistrationObjects;
