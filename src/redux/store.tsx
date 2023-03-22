import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import productListSlice from "./slices/productListSlice";

export default configureStore({
  reducer: {
    productList: productListSlice,
    auth: authSlice,
    cart: cartSlice,
  },
});
