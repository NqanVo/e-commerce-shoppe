import React, { memo } from "react";
import Cart from "../components/Cart/Cart";
import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";

const CartPage = memo(() => {
  return (
    <div className="wrapper">
      <Header></Header>
      <div className="container container__cart">
        <Cart />
      </div>
      <Footer></Footer>
    </div>
  );
});

export default CartPage;
