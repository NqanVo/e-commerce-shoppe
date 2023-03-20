import React, { memo } from "react";
import Button from "../../UI/Button/Button";
import "./ProductSorting.scss";

interface ProductSortingProps {
  handleSort: (sort: string) => void;
  sort: {
    nomarl: boolean;
    new: boolean;
    topSell: boolean;
  };
}

const ProductSorting = memo(({ handleSort, sort }: ProductSortingProps) => {
  return (
    <div className={"productList__header__sort"}>
      <p>Sắp xếp theo</p>
      <Button
        title={"Phổ biến"}
        type={sort.nomarl === true ? "primary" : "normal"}
        onClick={() => handleSort("nomarl")}
      />
      <Button
        title={"Mới nhất"}
        type={sort.new === true ? "primary" : "normal"}
        onClick={() => handleSort("new")}
      />
      <Button
        title={"Bán chạy"}
        type={sort.topSell === true ? "primary" : "normal"}
        onClick={() => handleSort("topSell")}
      />
    </div>
  );
});

export default ProductSorting;
