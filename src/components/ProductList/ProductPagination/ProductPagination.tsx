import React, { memo } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Button from "../../UI/Button/Button";
import "./ProductPagination.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductList,
  ProductListProps,
} from "../../../redux/slices/productListSlice";
import { nextPage, prevPage } from "../../../redux/slices/productListSlice";

const ProductPagination = memo(() => {
  const dispatch = useDispatch();
  const pagination: ProductListProps = useSelector(
    (state: { productList: ProductListProps }) => state.productList
  );

  const handlePrevPage = () => {
    dispatch(prevPage());
    dispatch(
      getProductList({
        products: [],
        skip: pagination.currentPage,
        total: pagination.total,
        currentPage: pagination.currentPage,
        loading: false,
      })
    );
  };
  const handleNextPage = () => {
    dispatch(nextPage());
    dispatch(
      getProductList({
        products: [],
        skip: pagination.currentPage,
        total: pagination.total,
        currentPage: pagination.currentPage,
        loading: false,
      })
    );
  };
  return (
    <div className="productList__header__pagination">
      {!(pagination.total <= 20) && (
        <>
          <p>
            <span style={{ color: "#ee4d2d" }}>
              {pagination.currentPage + 1}
            </span>
            /{pagination.total / 20}
          </p>
          <div className="">
            <Button
              Icon={AiOutlineLeft}
              disabled={pagination.currentPage <= 0 ? true : false}
              onClick={handlePrevPage}
            ></Button>
            <Button
              Icon={AiOutlineRight}
              disabled={
                pagination.currentPage === Math.ceil(pagination.total / 20) - 1
                  ? true
                  : false
              }
              onClick={handleNextPage}
            ></Button>
          </div>
        </>
      )}
    </div>
  );
});

export default ProductPagination;
