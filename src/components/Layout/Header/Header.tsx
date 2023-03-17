import React, { memo, useEffect, useState } from "react";
import "./Header.scss";
import { FiShoppingCart } from "react-icons/fi";
import Button from "../../UI/Button/Button";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductList } from "../../../redux/slices/productListSlice";

const Header = memo(() => {
  const [titleSearch, setTitleSearch] = useState<string>("");
  const dispatch = useDispatch();
  // let historySearch: any;
  // const [historySearch,setHistorySearch] = useState<string | string[]>([])
  // const getHistorySearch = () => {
  //   historySearch = localStorage.getItem("historySearch");
  //   if (historySearch) {
  //     historySearch = JSON.parse(historySearch);
  //   } else {
  //     historySearch = [];
  //   }
  //   localStorage.setItem(
  //     "historySearch",
  //     JSON.stringify([...historySearch, titleSearch])
  //   );
  // };
  useEffect(() => {
    // getHistorySearch();
  }, []);
  const handleSearch = () => {
    // getHistorySearch();

    const getData = () => {
      dispatch(
        getProductList({ products: [], skip: 0, currentPage: 0, total: 0 })
      );
      fetch(`https://dummyjson.com/products/search?q=${titleSearch.trim()}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(getProductList(data));
        });
    };
    getData();
  };
  return (
    <header>
      <div className="header__body">
        <Link to={"/"}>
          <h1 className="header__body__logo">Shọp pee</h1>
        </Link>
        <div className="header__body__searchForm">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm!"
            value={titleSearch}
            onChange={(e) => setTitleSearch(e.target.value)}
          />
          <Button
            Icon={AiOutlineSearch}
            type="primary"
            onClick={handleSearch}
          ></Button>

          {/* {historySearch && (
            <div className="header__body__searchForm__history">
              <p>haha</p>
              <p>haha</p>
              <p>haha</p>
              <p>haha</p>
            </div>
          )} */}
        </div>
        <div className="header__body__cart">
          <FiShoppingCart size={32} />
        </div>
      </div>
    </header>
  );
});

export default Header;
