import "./App.css";

import Header from "./components/Header/Header";
import { MainPage, UserPage } from "./pages";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="user" element={<UserPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
