import { createSlice } from "@reduxjs/toolkit";

export interface initStateCartProps {
  cartData: {
    idProduct: number;
    quality: number;
  }[];
}

const initStateCart: initStateCartProps = {
  cartData: JSON.parse(localStorage.getItem("cartData")!) || null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initStateCart,
  reducers: {
    addCart: (state, action) => {
      return { ...state };
    },
    deleteOneCart: (state, action) => {
      const newCartData = state.cartData.filter(
        (item) => item !== action.payload.index
      );
      state.cartData = newCartData;
      return;
    },
    deleteAllCart: (state) => {
      localStorage.removeItem("cartData");
      state.cartData = [];
      return;
    },
  },
});

export const { addCart, deleteOneCart, deleteAllCart } = cartSlice.actions;
export default cartSlice.reducer;
