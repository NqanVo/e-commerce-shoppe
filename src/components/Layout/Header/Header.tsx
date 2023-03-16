import React, { memo } from "react";
import "./Header.scss";
const Header = memo(() => {
  return (
    <header>
      <div className="header__body">
        <h1 className="header__body__logo">Logo</h1>
        <div className="header__body__searchForm">Search</div>
        <div className="header__body__cart">Cart</div>
      </div>
    </header>
  );
});

export default Header;
