import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import { MainPage, UserPage } from "./pages";
import { defaultData, defaultServices } from "./config/config";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Footer from "./components/Footer/Footer";
import Authorization from "./pages/Authorization/Authorization";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [treeWeek, setTreeWeek] = useState(defaultData);
  const [services, setServices] = useState(defaultServices);
  const [token, setToken] = useState(cookies?.token);
  const handleCookies = (newToken) => {
    setToken(newToken);
    setCookie("token", newToken, { path: "/" });
  };
  const handleDeleteCookies = async () => {
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
              element={token ? <UserPage /> : <Navigate to="/auth" />}
            />
            <Route
              path="auth"
              element={
                <Authorization
                  cookies={cookies}
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
