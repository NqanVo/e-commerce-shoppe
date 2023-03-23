import React, { memo, useEffect, useState, useCallback } from "react";
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
  // console.log(category);

  const [sortProducts, setSortProducts] = useState<{
    nomarl: boolean;
    new: boolean;
    topSell: boolean;
  }>({ nomarl: true, new: false, topSell: false });

  //lay loading
  const loading = useSelector(
    (state: { productList: ProductListProps }) => state.productList.loading
  );
  //lay danh sach san pham tu store productList
  let productList: ProductCardProps[] = useSelector(
    (state: { productList: ProductListProps }) => state.productList.products
  );
  //lay danh sach san pham sau khi sort
  const [productListSort, setProductListSort] = useState<ProductCardProps[]>([
    ...productList,
  ]);
  //lay phan trang
  const pagination: ProductListProps = useSelector(
    (state: { productList: ProductListProps }) => state.productList
  );
  const currentPage: number = pagination.currentPage;
  //cap nhat lai san pham theo param
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

  //cap nhat lai san pham theo kieu sort tuong ung
  useEffect(() => {
    let sortedList = [...productList];
    if (sortProducts.new) {
      sortedList.sort((a, b) => b.id - a.id);
    } else if (sortProducts.topSell) {
      sortedList.sort((a, b) => b.stock - a.stock);
    }
    setProductListSort(sortedList);
  }, [productList, sortProducts]);

  //set kieu sort
  const handleSort = useCallback((typeSort: string) => {
    if (typeSort === "nomarl")
      setSortProducts({ nomarl: true, new: false, topSell: false });
    else if (typeSort === "new")
      setSortProducts({ nomarl: false, new: true, topSell: false });
    else setSortProducts({ nomarl: false, new: false, topSell: true });
  }, []);

  return (
    <section className={"productList"}>
      <div className={"productList__header"}>
        <ProductSorting handleSort={handleSort} sort={sortProducts} />
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
              productListSort.map((product) => {
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
