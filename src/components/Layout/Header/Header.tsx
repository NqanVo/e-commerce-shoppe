import React, { memo, useEffect, useState } from "react";
import "./Header.scss";
import { FiShoppingCart } from "react-icons/fi";
import Button from "../../UI/Button/Button";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../fetchApi/fetchProducts";
import HeadlessTippy from "@tippyjs/react/headless";
import { AiOutlineClose } from "react-icons/ai";
import { initStateLoginProps } from "../../../redux/slices/authSlice";

const Header = memo(() => {
  const [titleSearch, setTitleSearch] = useState<string>("");
  const [showHistorySearch, setShowHistorySearch] = useState(false);
  const dispatch = useDispatch();
  const userID = useSelector(
    (state: { auth: initStateLoginProps }) => state.auth.userData
  );
  const [historySearch, setHistorySearch] = useState<string[]>([]);
  const getHistorySearch = () => {
    let historySearchLocal = localStorage.getItem("historySearch");
    if (historySearchLocal) {
      setHistorySearch([...JSON.parse(historySearchLocal!)]);
    } else {
      setHistorySearch([]);
    }
  };
  useEffect(() => {
    getHistorySearch();
  }, []);

  const handleSearch = () => {
    setShowHistorySearch(false);
    localStorage.setItem(
      "historySearch",
      JSON.stringify([...historySearch, titleSearch])
    );
    getHistorySearch();
    fetchProducts(
      `https://dummyjson.com/products/search?q=${titleSearch.trim()}`,
      dispatch
    );
  };

  const handleDeleteAllHistory = () => {
    localStorage.setItem("historySearch", JSON.stringify([]));
    getHistorySearch();
  };
  const handleDeleteOneHistory = (indexRemove: number) => {
    let historySearchLocal: string[] = JSON.parse(
      localStorage.getItem("historySearch")!
    );
    historySearchLocal = historySearchLocal.filter(
      (item, index) => index !== indexRemove
    );
    localStorage.setItem("historySearch", JSON.stringify(historySearchLocal));
    getHistorySearch();
  };

  return (
    <header>
      <div className="header__body">
        <div className=""></div>
        <div className="header__body__auth">
          {userID ? (
            <Link to={`/user/account/profile`}>Tài khoản</Link>
          ) : (
            <Link to={"/login"}>Đăng nhập</Link>
          )}
        </div>
      </div>
      <div className="header__body">
        <Link to={"/"}>
          <h1 className="header__body__logo">Shọp pee</h1>
        </Link>

        <div className="header__body__searchForm">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm!"
            value={titleSearch}
            onFocus={() => setShowHistorySearch(true)}
            onChange={(e) => setTitleSearch(e.target.value)}
          />
          <Link to={`/category?q=${titleSearch}`}>
            <Button
              Icon={AiOutlineSearch}
              colorIcon={"white"}
              type="primary"
              onClick={handleSearch}
            ></Button>
          </Link>
          {showHistorySearch && historySearch.length > 0 && (
            <HeadlessTippy
              visible={true}
              onClickOutside={() => setShowHistorySearch(false)}
              interactive={true}
              ignoreAttributes={true}
              appendTo={() =>
                document.querySelector(".header__body__searchForm__wrapper") ||
                document.createElement("div")
              }
              render={(attrs) => (
                <div
                  className="header__body__searchForm__history"
                  tabIndex={-1}
                  {...attrs}
                >
                  <h3 className="header__body__searchForm__history__title">
                    <span>Lịch sử tìm kiếm</span>
                    <Button
                      title="Xóa tất cả"
                      type="secondary"
                      onClick={handleDeleteAllHistory}
                    ></Button>
                  </h3>
                  {historySearch &&
                    historySearch.map((item, index) => (
                      <p key={index}>
                        <span onClick={() => setTitleSearch(item)}>{item}</span>
                        <AiOutlineClose
                          onClick={() => handleDeleteOneHistory(index)}
                        />
                      </p>
                    ))}
                </div>
              )}
            ></HeadlessTippy>
          )}
          <div className="header__body__searchForm__wrapper" />
        </div>

        <div className="header__body__cart">
          <Link to={"/cart"}>
            <FiShoppingCart color="white" size={32} />
          </Link>
        </div>
      </div>
    </header>
  );
});

export default Header;
