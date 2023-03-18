import React, { memo } from "react";
import "./ProductDetailLabel.scss";
import icon_free_ship_red from "../../../assets/image/icon_free_ship_red.png";
import icon_protect from "../../../assets/image/icon_protect.png";
import icon_refund from "../../../assets/image/icon_refund.png";

const ProductDetailLabel = memo(() => {
  return (
    <div className="productDetail__body__label">
      <div className="productDetail__body__label__item">
        <img src={icon_refund} alt="" />
        <h3>7 ngày miễn phí trả hàng</h3>
      </div>
      <div className="productDetail__body__label__item">
        <img src={icon_protect} alt="" />
        <h3>Hàng chính hãng 100%</h3>
      </div>
      <div className="productDetail__body__label__item">
        <img src={icon_free_ship_red} alt="" />
        <h3>Miễn phí vận chuyển</h3>
      </div>
    </div>
  );
});

export default ProductDetailLabel;
