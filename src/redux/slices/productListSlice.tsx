import { createSlice } from "@reduxjs/toolkit";
import { ProductCardProps } from "../../components/ProductList/ProductCard/ProductCard";

export interface ProductListProps {
  products: ProductCardProps[];
  total: number;
  skip: number;
  currentPage: number;
  loading: boolean;
}

const initialState: ProductListProps = {
  products: [],
  total: 0,
  skip: 0,
  currentPage: 0,
  loading: false,
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    awaitGetProductList: (state: ProductListProps) => {
      return { ...state, loading: true };
    },
    getProductList: (
      state: ProductListProps,
      action: { payload: ProductListProps }
    ) => {
      // console.log(action.payload.products);
      return {
        ...state,
        products: action.payload.products,
        total: action.payload.total,
        skip: action.payload.skip,
        loading: action.payload.loading,
      };
    },
    nextPage: (state) => {
      return { ...state, currentPage: state.currentPage + 1 };
    },
    prevPage: (state: ProductListProps) => {
      return { ...state, currentPage: state.currentPage - 1 };
    },
  },
});

export const { awaitGetProductList, getProductList, nextPage, prevPage } =
  productListSlice.actions;
export default productListSlice.reducer;
