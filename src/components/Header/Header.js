import { useClock } from "../../hooks/clock.hook";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../media/logo.svg";
import user from "../../media/UserPic.png";
import "./Header.css";
import DatePicker from "../DatePicker/DatePicker";
import { logout } from "../submitFunctions/submitFunctions";

const Header = ({ treeWeek, setTreeWeek, mobile, removeCookie, token }) => {
  let { date, time } = useClock();
  let navigate = useNavigate();
  return (
    <div className="header" style={token ? {} : { justifyContent: "center" }}>
      <div className="container">
        {mobile ? (
          <div className="header__calendar" style={token ? {} : { height: 0 }}>
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

        <div className="header__menu" style={token ? {} : { height: 0 }}>
          <Link
            className="header__user"
            to="/user"
            style={{ textDecoration: "none" }}
          >
            <div className="header__user_text">Мой Олег</div>
            <img src={user} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
