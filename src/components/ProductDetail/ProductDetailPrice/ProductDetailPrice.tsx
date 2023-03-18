import React, { memo } from "react";
import "./ProductDetailPrice.scss";

interface props {
  discountPercentage: number;
  price: number;
}
const ProductDetailPrice = memo(({ discountPercentage, price }: props) => {
  return (
    <div className="productDetail__body__price">
      <h3 className="productDetail__body__price__old">
        {((discountPercentage + price) * 23500).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </h3>
      <h2 className="productDetail__body__price__new">
        {(price * 23500).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </h2>
      <span className="productDetail__body__price__sale">
        Giảm {((1 - price / (price + discountPercentage)) * 100).toFixed(2)}%
      </span>
    </div>
  );
});

export default ProductDetailPrice;
