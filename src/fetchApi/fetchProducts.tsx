import { Dispatch } from "redux";
import {
  awaitGetProductList,
  getProductList,
} from "../redux/slices/productListSlice";

export const fetchProducts = (url: string, dispatch: Dispatch<any>) => {
  dispatch(awaitGetProductList());
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dispatch(getProductList(data));
    });
};
