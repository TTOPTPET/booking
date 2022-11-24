import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import { MainPage, UserPage, Authorization } from "./pages";
import { defaultData, defaultServices } from "./config/config";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Footer from "./components/Footer/Footer";
import { useCookies } from "react-cookie";
import axios from "axios";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [treeWeek, setTreeWeek] = useState(defaultData);
  const [services, setServices] = useState(defaultServices);
  const [token, setToken] = useState(cookies?.token);
  const [tokenTimeOut, setTokenTimeOut] = useState(false);

  const handleCookies = (newToken) => {
    setToken(newToken);
    setCookie("token", newToken, { path: "/" });
  };
  const handleDeleteCookies = () => {
    setToken(undefined);
    removeCookie("token", { path: "/" });
  };

  const isMobile = useMediaQuery({
    query: "(max-width: 700px)",
  });
  console.log("tree", treeWeek);

  useEffect(() => {
    console.log("cookies", token);
  }, [token]);

  axios?.interceptors.response.use(
    function (response) {
      console.log("res response", response);
      return response;
    },
    function (error) {
      console.log("res error", error);
      if (error.response.status === 401) {
        setTokenTimeOut(true);
        handleDeleteCookies();
      }
      return Promise.reject(error);
    }
  );

  return (
    <Router>
      <div className="App">
        <Header
          treeWeek={treeWeek}
          setTreeWeek={setTreeWeek}
          mobile={isMobile}
          removeCookie={handleDeleteCookies}
          token={token}
        />
        <div className="main">
          <Routes>
            <Route
              path="/"
              element={
                token ? (
                  <MainPage
                    treeWeek={treeWeek}
                    setTreeWeek={setTreeWeek}
                    services={services}
                    setServices={setServices}
                    mobile={isMobile}
                  />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
            <Route
              path="user"
              element={
                token ? (
                  <UserPage
                    removeCookie={handleDeleteCookies}
                    mobile={isMobile}
                  />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
            <Route
              path="auth"
              element={
                <Authorization
                  token={token}
                  tokenTimeOut={tokenTimeOut}
                  setTokenTimeOut={setTokenTimeOut}
                  handleCookies={handleCookies}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
