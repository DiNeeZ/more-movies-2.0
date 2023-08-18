import { RiMovie2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./logo.scss";

const Logo = () => {
  return (
    <div className="logo">
      <Link aria-label="go home" className="logo__link" to="/">
        <RiMovie2Fill className="logo__icon" />
        <span className="logo__text">
          One<span>More</span>Movies
        </span>
      </Link>
    </div>
  );
};

export default Logo;
