import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import InputField from "../../../InputField/InputField";
import "./SectionItemAdd.css";
import { postNewService } from "../../../submitFunctions/submitFunctions";

function SectionItemAdd({
  item,
  unfoldSection,
  setSettingList,
  sectionName,
  mobile,
}) {
  console.log("item", item);
  const serviceFieldsMap = new Map([
    [
      "services",
      {
        id: "",
        name_service: "",
        max_booking: "",
        duration: "",
        price_service: "",
      },
    ],
  ]);

  const [submitState, setSubmitState] = useState(false);
  const [itemState, setItemState] = useState({
    ...serviceFieldsMap.get(sectionName),
  });
  const [unfoldItem, setUnfoldItem] = useState(false);

  useEffect(() => {
    setUnfoldItem(false);
  }, [unfoldSection]);

  useEffect(() => {
    if (itemState.name_service !== "") {
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
      <div className="section-item__header section-item__header_plus">
        <div className="section-item__name section-item__name_plus">+</div>
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
          onClick={(e) => {
            postNewService(itemState).then(
              (value) => {
                console.log("value", value);
                setSettingList((settingList) => {
                  let bufList = JSON.parse(JSON.stringify(settingList));
                  bufList = {
                    ...bufList,
                    settings: bufList?.settings.map((setting) => {
                      if (setting.name === sectionName) {
                        return {
                          ...setting,
                          data: value.data,
                        };
                      }
                      return setting;
                    }),
                  };
                  console.log("bufListi", bufList);
                  return bufList;
                });
                setItemState({
                  id: "",
                  name_service: "",
                  max_booking: "",
                  duration: "",
                  price_service: "",
                });
              },
              (reason) => console.log("errorNewService", reason)
            );
            setUnfoldItem(false);
            e.stopPropagation();
          }}
        >
          Готово
        </div>
      </div>
    </div>
  );
}

export default SectionItemAdd;
