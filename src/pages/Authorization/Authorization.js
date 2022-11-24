import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import { login } from "../../components/submitFunctions/submitFunctions";
import "./Authorization.css";

function Authorization({
  token,
  handleCookies,
  setTokenTimeOut,
  tokenTimeOut,
}) {
  let navigate = useNavigate();
  const [regState, setRegState] = useState(false);
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });

  const [userData, setUserData] = useState({
    login: "",
    password: "",
    userName: "",
  });
  const [errAuth, setErrAuth] = useState(false);

  useEffect(() => {
    if (errAuth) {
      setErrAuth(false);
    }
  }, [userData, regState]);

  return (
    <div className="author">
      <div className="author__wrapp">
        {tokenTimeOut ? (
          <div className="author__time-out">Истекло время сессии</div>
        ) : null}
        <div className="author__text">{regState ? "Регистрация" : "Вход"}</div>
        <div className="author__login">
          <InputField
            fieldName={"login"}
            value={userData}
            setValue={setUserData}
            error={errAuth}
          ></InputField>
          <InputField
            fieldName={"password"}
            value={userData}
            setValue={setUserData}
            error={errAuth}
          ></InputField>
          <div
            className="author__register"
            style={regState ? null : { maxHeight: 0 }}
          >
            <InputField
              fieldName={"userName"}
              value={userData}
              setValue={setUserData}
            ></InputField>
          </div>
        </div>
        <div className="author__error" style={{ height: errAuth ? "" : 0 }}>
          {errAuth ? "Неверный логин или пароль" : ""}
        </div>
        <div
          className="author__btn"
          onClick={async () => {
            let loginResp = await login(userData, regState);
            console.log(loginResp);
            if (loginResp?.data) {
              handleCookies(loginResp?.data?.access_token);
              navigate("/");
              setTokenTimeOut(false);
            } else {
              setErrAuth(true);
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
