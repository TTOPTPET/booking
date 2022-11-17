import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import { login } from "../../components/submitFunctions/submitFunctions";
import "./Authorization.css";

function Authorization({ cookies, handleCookies }) {
  let navigate = useNavigate();
  const [regState, setRegState] = useState(false);
  useEffect(() => {
    if (cookies?.token) {
      navigate("/");
    }
  });

  const [userData, setUserData] = useState({
    login: "",
    password: "",
    teg: "",
    userName: "",
  });
  return (
    <div className="author">
      <div className="author__wrapp">
        <div className="author__text">{regState ? "Регистрация" : "Вход"}</div>
        <div className="author__login">
          <InputField
            fieldName={"login"}
            value={userData}
            setValue={setUserData}
          ></InputField>
          <InputField
            fieldName={"password"}
            value={userData}
            setValue={setUserData}
          ></InputField>
          <div
            className="author__register"
            style={regState ? null : { maxHeight: 0 }}
          >
            <InputField
              fieldName={"teg"}
              value={userData}
              setValue={setUserData}
            ></InputField>
            <InputField
              fieldName={"userName"}
              value={userData}
              setValue={setUserData}
            ></InputField>
          </div>
        </div>
        <div
          className="author__btn"
          onClick={async () => {
            let loginResp = await login(userData, regState);
            console.log(loginResp);
            if (loginResp?.data) {
              handleCookies(loginResp?.data?.access_token);
              navigate("/");
            }
          }}
        >
          {regState ? "Зарегистрироваться" : "Войти"}
        </div>
        <div
          className="author__toggle"
          onClick={() =>
            setRegState((regState) => {
              return regState ? false : true;
            })
          }
        >
          {regState ? "Вход" : "Регистрация"}
        </div>
      </div>
    </div>
  );
}

export default Authorization;
