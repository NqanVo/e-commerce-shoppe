import React, { memo } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Button from "../../UI/Button/Button";
import "./ProductPagination.scss";
import { useSelector } from "react-redux/es/exports";
import { ProductListProps } from "../../../redux/slices/productListSlice";

interface ProductPaginationProps {
  currentPage: number;
  onClick: ({ ...props }: any) => void;
}
const ProductPagination = memo(
  ({ currentPage, onClick }: ProductPaginationProps) => {
    const pagination: ProductListProps = useSelector(
      (state: { productList: ProductListProps }) => state.productList
    );

    return (
      <div className="productList__header__pagination">
        {!(pagination.total <= 20) && (
          <>
            <p>
              <span style={{ color: "#ee4d2d" }}>{currentPage + 1}</span>/
              {pagination.total / 20}
            </p>
            <div className="">
              <Button
                title={<AiOutlineLeft />}
                disabled={currentPage <= 0 ? true : false}
                onClick={() => onClick(currentPage - 1)}
              ></Button>
              <Button
                title={<AiOutlineRight />}
                disabled={
                  currentPage === Math.ceil(pagination.total / 20) - 1
                    ? true
                    : false
                }
                onClick={() => onClick(currentPage + 1)}
              ></Button>
            </div>
          </>
        )}
      </div>
    );
  }
);

export default ProductPagination;
