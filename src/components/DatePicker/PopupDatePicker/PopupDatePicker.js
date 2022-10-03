import PopupCalendar from "./PopupCalendar/PopupCalendar";
import {
  formatDateToObject,
  formatDateToView,
} from "../../SmartCalendar/tools/tools";
import "./PopupDatePicker.css";

function PopupDatePicker({
  modalActive,
  setModalActive,
  treeWeek,
  selectDate,
  setSelectDate,
}) {
  return (
    <div
      className={modalActive.active ? "modal active" : "modal"}
      onClick={() => {
        setModalActive({ ...modalActive, active: false });
        setSelectDate(formatDateToObject(treeWeek[0].day));
      }}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__content_date">
          {[
            formatDateToView(treeWeek[0].day),
            " - ",
            formatDateToView(treeWeek[6].day),
          ]}
        </div>
        <PopupCalendar
          modalActive={modalActive}
          setModalActive={setModalActive}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
        />
      </div>
    </div>
  );
}

export default PopupDatePicker;
