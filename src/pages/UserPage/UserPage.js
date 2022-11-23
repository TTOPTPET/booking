import { useState } from "react";
import SettingSection from "../../components/SettingSection/SettingSection";
import "./UserPage.css";
import UserPic from "../../media/UserPic.png";
import { logout } from "../../components/submitFunctions/submitFunctions";
import { getUserInfo } from "../../components/submitFunctions/submitFunctions";
import { defaultUserData } from "../../config/config";
import { useEffect } from "react";

const UserPage = ({ removeCookie, mobile }) => {
  const [settingList, setSettingList] = useState(defaultUserData);
  useEffect(() => {
    getUserInfo().then(
      (value) => {
        console.log("info_us", value);
        setSettingList(value.data);
      },
      (reason) => {
        console.log("error", reason);
      }
    );
  }, []);

  return (
    <div className="user-page">
      <div className="user-page__header">
        <div className="user-page__icon">
          <img src={UserPic} alt="user-pic" />
        </div>
        <div className="user-page__info">
          <div className="user-page__name">{settingList?.info_user?.name}</div>
          <div className="user-page__login">
            @{settingList?.info_user?.login}
          </div>
          <div
            className="user-page__exit-btn"
            onClick={() => {
              removeCookie();
              logout();
            }}
          >
            Выход
          </div>
        </div>
      </div>
      <div className="user-page__setting-list">
        {settingList.settings.map((settingItem) => {
          return (
            <SettingSection
              settingItem={settingItem}
              setSettingList={setSettingList}
              mobile={mobile}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserPage;
