import { createSlice } from "@reduxjs/toolkit";

export interface initStateCartProps {
  loading: boolean;
  cartData: {
    idProduct: number;
    quality: number;
  }[];
}

const initStateCart: initStateCartProps = {
  loading: false,
  cartData: JSON.parse(localStorage.getItem("cartData")!) || null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initStateCart,
  reducers: {
    loadingStartCart: (state) => {
      state.loading = true;
      return;
    },
    loadingEndCart: (state) => {
      state.loading = false;
      return;
    },
    addCart: (
      state,
      action: { payload: { idProduct: number; quality: number } }
    ) => {
      let checkProduct;
      const oldCartArray = state.cartData;
      //kiểm tra có giỏ hàng sẳn hay chưa
      if (oldCartArray) {
        checkProduct = oldCartArray.find(
          (item: any) => item.idProduct === action.payload.idProduct
        );
        //kiểm tra xem sản phẩm đang thêm có sẳn trong giỏ hàng chưa
        if (!checkProduct)
          localStorage.setItem(
            "cartData",
            JSON.stringify([
              ...oldCartArray,
              {
                idProduct: action.payload.idProduct,
                quality: action.payload.quality,
              },
            ])
          );
        else {
          checkProduct.quality = checkProduct.quality + action.payload.quality;
          localStorage.setItem("cartData", JSON.stringify(oldCartArray));
        }
      } else
        localStorage.setItem(
          "cartData",
          JSON.stringify([
            {
              idProduct: action.payload.idProduct,
              quality: action.payload.quality,
            },
          ])
        );
      state.cartData = JSON.parse(localStorage.getItem("cartData")!);
      return;
    },
    deleteOneCart: (state, action) => {
      const newCartData = state.cartData;
      newCartData.splice(action.payload, 1);

      localStorage.setItem("cartData", JSON.stringify(newCartData));
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

export const {
  loadingStartCart,
  loadingEndCart,
  addCart,
  deleteOneCart,
  deleteAllCart,
} = cartSlice.actions;
export default cartSlice.reducer;
