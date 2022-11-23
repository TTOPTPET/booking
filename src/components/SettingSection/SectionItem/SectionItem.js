import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import InputField from "../../InputField/InputField";
import "./SectionItem.css";
import deleteImg from "../../../media/delete.png";
import { deleteService } from "../../submitFunctions/submitFunctions";

function SectionItem({
  item,
  unfoldSection,
  setSettingList,
  sectionName,
  mobile,
}) {
  const [itemState, setItemState] = useState({ ...item });
  const [unfoldItem, setUnfoldItem] = useState(false);
  const [popup, setPopup] = useState({ hash: null, count: null });
  useEffect(() => {
    setUnfoldItem(false);
  }, [unfoldSection]);
  useEffect(() => {
    setItemState(item);
  }, [item]);

  const inFields = (field) => {
    return (
      typeof itemState === "object" &&
      Object.keys(itemState).includes(field) &&
      field
    );
  };
  return (
    <div
      className="section-item__wrapper"
      onClick={() => setUnfoldItem(!unfoldItem)}
    >
      <div
        className="section-item__popup_wrapper"
        style={
          popup.count && unfoldItem ? { height: "100%", width: "100%" } : {}
        }
        onClick={(e) => {
          setPopup({ hash: null, count: null });
          e.stopPropagation();
        }}
      >
        <div
          className="section-item__popup"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="section-item__popup_text">Внимание</div>
          <div className="section-item__popup_reason">{`Будет удалено записей: ${popup.count}`}</div>
          <div
            className="section-item__popup_submit"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Готово
          </div>
        </div>
      </div>
      <div className="section-item__header">
        <div className="section-item__name">{item?.name_service}</div>
        <div
          className="section-item__remove"
          onClick={(e) => {
            e.stopPropagation();
            console.log("item", itemState);
            deleteService(itemState?.id).then(
              (value) => {
                setSettingList((settingList) => {
                  return {
                    info_user: settingList?.info_user,
                    settings: settingList?.settings.map((section) => {
                      let data = section?.data;
                      if (section.name === sectionName) {
                        data = section?.data.filter(
                          (dataItem) => dataItem?.id !== itemState?.id
                        );
                      }
                      console.log({ name: section.name, data: data });
                      return { name: section.name, data: data };
                    }),
                  };
                });
              },
              (reason) => {
                console.log("error", reason);
              }
            );
          }}
        >
          <img src={deleteImg} alt="" />
        </div>
      </div>
      <div
        className={
          unfoldItem
            ? "section-item__content section-item__content_unfold"
            : "section-item__content"
        }
      >
        <div className="section-item__columns">
          <div className="section-item__column">
            <InputField
              fieldName={inFields("name_service")}
              value={itemState}
              setValue={setItemState}
              style={{
                marginBottom: "10px",
                width: mobile ? "30vw" : "20vw",
                maxWidth: "300px",
              }}
            />
            <InputField
              fieldName={"duration"}
              value={itemState}
              setValue={setItemState}
              style={{
                marginBottom: "10px",
                width: mobile ? "30vw" : "20vw",
                maxWidth: "300px",
              }}
            />
          </div>
          <div className="section-item__column">
            <InputField
              fieldName={"price_service"}
              value={itemState}
              setValue={setItemState}
              style={{
                marginBottom: "10px",
                width: mobile ? "30vw" : "20vw",
                maxWidth: "300px",
              }}
            />
            <InputField
              fieldName={"max_booking"}
              value={itemState}
              setValue={setItemState}
              style={{
                marginBottom: "10px",
                width: mobile ? "30vw" : "20vw",
                maxWidth: "300px",
              }}
            />
          </div>
        </div>
        <div
          className="section-item__submit"
          onClick={(e) => {
            setPopup({ hash: null, count: true });
            e.stopPropagation();
          }}
        >
          Готово
        </div>
      </div>
    </div>
  );
}

export default SectionItem;
