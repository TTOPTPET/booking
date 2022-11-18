import { useClock } from "../../hooks/clock.hook";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../media/logo.svg";
import user from "../../media/user.png";
import "./Header.css";
import DatePicker from "../DatePicker/DatePicker";
import { logout } from "../submitFunctions/submitFunctions";

const Header = ({ treeWeek, setTreeWeek, mobile, removeCookie, token }) => {
  let { date, time } = useClock();
  let navigate = useNavigate();
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
          <div
            className="header__logout"
            style={{ height: token ? undefined : 0 }}
            onClick={async () => {
              let logoutResp = await logout();
              if (logoutResp) {
                let nav = await removeCookie();
                nav.then(navigate("/"));
              }
            }}
          >
            Выйти
          </div>

          <Link className="header__user" to="/user">
            <img src={user} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
