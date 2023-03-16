import React from "react";

import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
function App() {
  return (
    <Routes>
      <Route path="/category/:categoryName" element={<ProductsPage />} />
      <Route path="/category/" element={<ProductsPage />} />
      <Route path="/" element={<ProductsPage />} />
    </Routes>
  );
}

export default React.memo(App);
