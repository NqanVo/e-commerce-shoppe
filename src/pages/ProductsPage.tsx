import React, { memo } from "react";
import Filters from "../components/Filters/Filters";
import Header from "../components/Layout/Header/Header";
import ProductList from "../components/ProductList/ProductList";

const ProductsPage = memo(() => {
  return (
    <div className="">
      <Header></Header>
      <div className="container">
        <Filters></Filters>
        <ProductList />
      </div>
    </div>
  );
});

export default ProductsPage;
