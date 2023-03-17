import React from "react";

import { Routes, Route } from "react-router-dom";
import ProductSinglePage from "./pages/ProductSinglePage";
import ProductsPage from "./pages/ProductsPage";
function App() {
  return (
    <Routes>
      <Route path="/category/:categoryName" element={<ProductsPage />} />
      <Route path="/category/" element={<ProductsPage />} />
      <Route path="/" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductSinglePage />} />
    </Routes>
  );
}

export default React.memo(App);
