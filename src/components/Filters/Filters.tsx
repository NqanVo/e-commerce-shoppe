import React, { memo, useEffect, useState } from "react";
import { TbCategory } from "react-icons/tb";
import { AiFillCaretRight } from "react-icons/ai";
import "./Filters.scss";
import { getProductList } from "../../redux/slices/productListSlice";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { Link, useLocation } from "react-router-dom";

const Filters = memo(() => {
  const category = useLocation().pathname.split("/")[2];
  const [categories, setCategories] = useState<Array<string>>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getCate = () => {
      fetch("https://dummyjson.com/products/categories")
        .then((res) => res.json())
        .then((data) => setCategories(data));
    };
    getCate();
  }, []);

  const handleGetProductListCategories = (cate: string) => {
    dispatch(getProductList({ products: [], skip: 0, total: 0 }));
    fetch(`https://dummyjson.com/products/category/${cate}`)
      .then((res) => res.json())
      .then((data) => dispatch(getProductList(data)));
  };

  return (
    <nav className="filter">
      <div className={"filter__tab"}>
        <h3 className={"filter__tab__title"}>
          <TbCategory />
          Tất cả danh mục
        </h3>
        <div className={"filter__tab__body"}>
          {/* <p className={"filter__tab__body__item active"}>
            <AiFillCaretRight /> Áo khoác
          </p> */}
          {categories.map((cate) => (
            <Link
              to={`/category/${cate}`}
              key={cate}
              className={`filter__tab__body__item ${
                category === cate && "active"
              }`}
              onClick={() => handleGetProductListCategories(cate)}
            >
              {category === cate && <AiFillCaretRight />}
              {cate}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
});

export default Filters;
