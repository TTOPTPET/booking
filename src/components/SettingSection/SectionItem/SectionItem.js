import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import InputField from "../../InputField/InputField";
import "./SectionItem.css";
import deleteImg from "../../../media/delete.png";
import {
  deleteService,
  serviceConfirm,
  updateService,
} from "../../submitFunctions/submitFunctions";

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
  const [submitState, setSubmitState] = useState(false);

  useEffect(() => {
    setUnfoldItem(false);
  }, [unfoldSection]);

  useEffect(() => {
    setItemState(item);
    console.log("item", item);
  }, [item]);

  useEffect(() => {
    if (
      itemState.name_service !== "" &&
      (itemState.name_service !== item.name_service ||
        itemState.max_booking !== item.max_booking ||
        itemState.duration !== item.duration ||
        itemState.price_service !== item.price_service)
    ) {
      setSubmitState(true);
    } else {
      setSubmitState(false);
    }
  }, [itemState]);

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
        style={popup.count ? { height: "100%", width: "100%" } : {}}
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
            onClick={async (e) => {
              e.stopPropagation();
              serviceConfirm(popup?.hash, "delete").then(
                () => {
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
                  setPopup({ hash: null, count: null });
                },
                (reason) => console.log("errorDeleteService", reason)
              );
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
                reason?.response?.status === 300 &&
                  setPopup({
                    hash: reason.response.data.id_hash,
                    count: reason.response.data.delete_counter,
                  });
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
          className={
            submitState
              ? "section-item__submit section-item__submit_active"
              : "section-item__submit"
          }
          onClick={async (e) => {
            e.stopPropagation();
            await updateService(itemState).then(
              (value) => {
                setSettingList((settingList) => {
                  return {
                    info_user: settingList?.info_user,
                    settings: settingList?.settings.map((section) => {
                      if (section.name === sectionName) {
                        return { name: section.name, data: value.data };
                      }
                      return { name: section.name, data: section?.data };
                    }),
                  };
                });
              },
              (reason) => {
                if (reason?.response?.status === 300) {
                  setPopup({
                    hash: reason?.data?.id_hash,
                    count: reason?.data?.delete_counter,
                  });
                }
              }
            );
          }}
        >
          Готово
        </div>
      </div>
    </div>
  );
}

export default SectionItem;
