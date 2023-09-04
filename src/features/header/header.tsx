import { useMatch } from "react-router-dom";

import { Logo } from "../../components/UI";

import "./header.scss";

const Header = () => {
  const isHomePage = !!useMatch("/");

  return (
    <header className={`header${isHomePage && " header--absolute"}`}>
      <div className="header__container container">
        <Logo />
        <div>SEARCH</div>
        <div>NAVIGATION</div>
      </div>
    </header>
  );
};

export default Header;
