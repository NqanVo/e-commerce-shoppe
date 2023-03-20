import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import productListSlice from "./slices/productListSlice";

export default configureStore({
  reducer: {
    productList: productListSlice,
    auth: authSlice,
  },
});
