import React from "react";
import "./SettingSection.css";
import openArrow from "../../media/arrow_open.svg";
import SectionItem from "./SectionItem/SectionItem";
import { useState } from "react";
import SectionItemAdd from "./SectionItem/SectionItemAdd/SectionItemAdd";

function SettingSection({ settingItem, setSettingList, mobile }) {
  const settingNameMap = new Map([
    ["services", "Мои Услуги"],
    ["staff", "Мой персонал"],
  ]);
  const [unfoldSection, setUnfoldSection] = useState(false);
  return (
    <div className="setting-section__wrapper">
      <div
        className="setting-section__header"
        onClick={() => setUnfoldSection(!unfoldSection)}
      >
        <div className="setting-section__text">
          {settingNameMap.get(settingItem.name)}
        </div>
        <div
          className={
            unfoldSection
              ? "setting-section__btn setting-section__btn_open"
              : "setting-section__btn"
          }
        >
          <img src={openArrow} alt="arrow" />
        </div>
      </div>
      <div
        className={
          unfoldSection
            ? "setting-section__content"
            : "setting-section__content setting-section__content_unfold"
        }
        style={unfoldSection ? {} : { marginBottom: "0" }}
      >
        {settingItem?.data.map((item) => {
          return (
            <SectionItem
              item={item}
              sectionName={settingItem?.name}
              unfoldSection={unfoldSection}
              setSettingList={setSettingList}
              mobile={mobile}
            />
          );
        })}
        <SectionItemAdd
          item={settingItem?.data[0]}
          sectionName={settingItem?.name}
          unfoldSection={unfoldSection}
          setSettingList={setSettingList}
          mobile={mobile}
        />
      </div>
    </div>
  );
}

export default SettingSection;
