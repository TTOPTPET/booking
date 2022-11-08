import PopupCalendar from "./PopupCalendar/PopupCalendar";
import { formatDateToObject, formatDateToView } from "../../tools/tools";
import "./PopupDatePicker.css";

function PopupDatePicker({
  modalActive,
  setModalActive,
  treeWeek,
  setTreeWeek,
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
        <PopupCalendar
          setTreeWeek={setTreeWeek}
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
