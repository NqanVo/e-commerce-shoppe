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
  const cartData = useSelector((state: any) => state.cart.cartData);
  // console.log(cartData);

  const dispatch = useDispatch();
  const userID = useSelector(
    (state: { auth: initStateLoginProps }) => state.auth.userData
  );
  const [historySearch, setHistorySearch] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
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
  useEffect(() => {
    const getCate = () => {
      fetch("https://dummyjson.com/products/categories")
        .then((res) => res.json())
        .then((data) => setCategories(data));
    };
    getCate();
  });
  const handleSearch = () => {
    if (titleSearch) {
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
    }
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
          {showHistorySearch && (
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
                  <h3 className="header__body__searchForm__history__title">
                    <span>Danh mục</span>
                  </h3>
                  {categories &&
                    categories.map((item, index) => (
                      <Link key={index} to={`/category/${item}`}>
                        <p>
                          <span onClick={() => setTitleSearch(item)}>
                            {item}
                          </span>
                        </p>
                      </Link>
                    ))}
                </div>
              )}
            ></HeadlessTippy>
          )}
          <div className="header__body__searchForm__wrapper" />
        </div>

        <div className="header__body__cart">
          <div className="header__body__cart__quality">
            <Link to={"/cart"}>
              <FiShoppingCart color="white" size={32} />
            </Link>
            {cartData && cartData.length > 0 && <p>{cartData.length}</p>}
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
