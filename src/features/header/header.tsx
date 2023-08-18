import { Logo } from "../../components/UI";

import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container container">
        <Logo />
        <div>SEARCH</div>
        <div>NAVIGATION</div>
      </div>
    </header>
  );
};

export default Header;
