import { useClock } from "../../hooks/clock.hook";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  let { date, time } = useClock();

  return (
    <div className="header">
      <div className="container">
        <div className="header__today">
          <div className="header__date">{date}</div>
          <div className="header__time">{time}</div>
        </div>

        <Link className="header__logo" to="/" />

        <div className="header__menu">
          <div className="header__notifications"></div>
          <Link className="header__user" to="/user" />
        </div>
      </div>
    </div>
  );
};

export default Header;
