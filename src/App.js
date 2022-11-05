import "./App.css";
import { useState } from "react";
import Header from "./components/Header/Header";
import { MainPage, UserPage } from "./pages";
import { defaultData, defaultServices } from "./config/config";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Footer from "./components/Footer/Footer";

const App = () => {
  const [treeWeek, setTreeWeek] = useState(defaultData);
  const [services, setServices] = useState(defaultServices);
  const isMobile = useMediaQuery({
    query: "(max-width: 700px)",
  });
  console.log("tree", treeWeek);
  return (
    <Router>
      <div className="App">
        <Header
          treeWeek={treeWeek}
          setTreeWeek={setTreeWeek}
          mobile={isMobile}
        />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  treeWeek={treeWeek}
                  setTreeWeek={setTreeWeek}
                  services={services}
                  setServices={setServices}
                  mobile={isMobile}
                />
              }
            />
            <Route path="user" element={<UserPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
