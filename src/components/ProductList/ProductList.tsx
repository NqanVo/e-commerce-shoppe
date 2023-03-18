import React, { memo, useEffect } from "react";
import ProductCard from "./ProductCard/ProductCard";
import "./ProductList.scss";
import ProductSorting from "./ProductSorting/ProductSorting";
import ProductPagination from "./ProductPagination/ProductPagination";
import { ProductCardProps } from "./ProductCard/ProductCard";
import Loading from "../UI/Loading/Loading";

import { useSelector, useDispatch } from "react-redux/es/exports";
import { useLocation } from "react-router-dom";
import { ProductListProps } from "../../redux/slices/productListSlice";
import { fetchProducts } from "../../fetchApi/fetchProducts";

const ProductList = memo(() => {
  const dispatch = useDispatch();
  const category = useLocation().pathname.split("/")[2];
  const searchParams = new URLSearchParams(useLocation().search).get("q");
  //lay loading
  const loading = useSelector(
    (state: { productList: ProductListProps }) => state.productList.loading
  );
  //lay danh sach san pham tu store productList
  const productList: ProductCardProps[] = useSelector(
    (state: { productList: ProductListProps }) => state.productList.products
  );
  //lay phan trang
  const pagination: ProductListProps = useSelector(
    (state: { productList: ProductListProps }) => state.productList
  );
  const currentPage: number = pagination.currentPage;

  useEffect(() => {
    if (category)
      fetchProducts(
        `https://dummyjson.com/products/category/${category}?limit=20&skip=${
          currentPage * 20
        }`,
        dispatch
      );
    else if (searchParams)
      fetchProducts(
        `https://dummyjson.com/products/search?q=${searchParams.trim()}`,
        dispatch
      );
    else
      fetchProducts(
        `https://dummyjson.com/products?limit=20&skip=${currentPage * 20}`,
        dispatch
      );
  }, [currentPage, category]);

  return (
    <section className={"productList"}>
      <div className={"productList__header"}>
        <ProductSorting />
        <ProductPagination />
      </div>
      <div className={"productList__body"}>
        {loading ? (
          <Loading />
        ) : (
          <>
            {productList.length === 0 ? (
              <p>Không tìm thấy sản phẩm</p>
            ) : (
              productList.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    thumbnail={product.thumbnail}
                    title={product.title}
                    price={product.price}
                    rating={product.rating}
                    stock={product.stock}
                  />
                );
              })
            )}
          </>
        )}
      </div>
      <p style={{ textAlign: "right" }}>Tổng sản phẩm: {pagination.total}</p>
    </section>
  );
});

export default ProductList;
