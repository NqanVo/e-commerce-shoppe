import React, { memo } from "react";
import Filters from "../components/Filters/Filters";
import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";
import ProductList from "../components/ProductList/ProductList";

const ProductsPage = memo(() => {
  return (
    <div className="wrapper">
      <Header></Header>
      <div className="container container__productList">
        <Filters></Filters>
        <ProductList />
      </div>
      <Footer></Footer>
    </div>
  );
});

export default ProductsPage;
