import { createSlice } from "@reduxjs/toolkit";
import { ProductCardProps } from "../../components/ProductList/ProductCard/ProductCard";

export interface ProductListProps {
  products: ProductCardProps[];
  total: number;
  skip: number;
  currentPage: number;
}

const initialState: ProductListProps = {
  products: [],
  total: 0,
  skip: 0,
  currentPage: 0,
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    getProductList: (
      state: ProductListProps,
      action: { payload: ProductListProps }
    ) => {
      state.products = action.payload.products;
      state.total = action.payload.total;
      state.skip = action.payload.skip;
    },
    nextPage: (state) => {
      return { ...state, currentPage: state.currentPage + 1 };
    },
    prevPage: (state: ProductListProps) => {
      return { ...state, currentPage: state.currentPage - 1 };
    },
  },
});

export const { getProductList, nextPage, prevPage } = productListSlice.actions;
export default productListSlice.reducer;
