import { useClock } from "../../hooks/clock.hook";
import { Link } from "react-router-dom";
import logo from "../../media/logo.svg";
import user from "../../media/user.png";
import "./Header.css";
import DatePicker from "../DatePicker/DatePicker";

const Header = ({ treeWeek, setTreeWeek, mobile }) => {
  let { date, time } = useClock();

  return (
    <div className="header">
      <div className="container">
        {mobile ? (
          <div className="header__calendar">
            <DatePicker treeWeek={treeWeek} setTreeWeek={setTreeWeek} mobile />
          </div>
        ) : (
          <div className="header__today">
            <div className="header__date">{date}</div>
            <div className="header__time">{time}</div>
          </div>
        )}

        <Link className="header__logo" to="/">
          <img src={logo} />
        </Link>

        <div className="header__menu">
          <Link className="header__user" to="/user">
            <img src={user} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
