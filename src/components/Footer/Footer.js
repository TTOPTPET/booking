import "./Footer.css";
import madeInRussia from "../../media/made-in-russia-sign-ru.svg";

const Footer = () => {
  return (
    <div className="footer">
      <img style={{ width: "70px" }} src={madeInRussia}></img>
    </div>
  );
};

export default Footer;
