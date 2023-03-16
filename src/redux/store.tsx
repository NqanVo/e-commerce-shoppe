import { configureStore } from "@reduxjs/toolkit";
import productListSlice from "./slices/productListSlice";

export default configureStore({
  reducer: {
    productList: productListSlice,
  },
});
