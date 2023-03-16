import React, { memo } from "react";
import Button from "../../UI/Button/Button";
import "./ProductSorting.scss";

const ProductSorting = memo(() => {
  return (
    <div className={"productList__header__sort"}>
      <p>Sắp xếp theo</p>
      <Button title={"Phổ biến"} type="primary" disabled={true} />
      <Button title={"Mới nhất"} disabled={true} />
      <Button title={"Bán chạy"} disabled={true} />
    </div>
  );
});

export default ProductSorting;
