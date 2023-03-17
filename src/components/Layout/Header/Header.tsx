import React, { memo } from "react";
import "./Header.scss";
import { FiShoppingCart } from "react-icons/fi";
import Button from "../../UI/Button/Button";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = memo(() => {
  return (
    <header>
      <div className="header__body">
        <Link to={"/"}>
          <h1 className="header__body__logo">Shọp pee</h1>
        </Link>
        <div className="header__body__searchForm">
          <input type="text" placeholder="Tìm kiếm sản phẩm!" />
          <Button Icon={AiOutlineSearch} type="primary"></Button>
        </div>
        <div className="header__body__cart">
          <FiShoppingCart size={32} />
        </div>
      </div>
    </header>
  );
});

export default Header;
