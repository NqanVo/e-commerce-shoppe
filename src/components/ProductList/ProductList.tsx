import React, { memo, useCallback, useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import "./ProductList.scss";
import ProductSorting from "./ProductSorting/ProductSorting";
import ProductPagination from "./ProductPagination/ProductPagination";
import { ProductCardProps } from "./ProductCard/ProductCard";
import Loading from "../UI/Loading/Loading";
import { getProductList } from "../../redux/slices/productListSlice";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useLocation } from "react-router-dom";
import { ProductListProps } from "../../redux/slices/productListSlice";

const ProductList = memo(() => {
  // const [productList, setProductList] = useState<Array<ProductCardProps>>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  //lay danh sach san pham tu store productList
  const productList: ProductCardProps[] = useSelector(
    (state: { productList: ProductListProps }) => state.productList.products
  );
  const pagination: ProductListProps = useSelector(
    (state: { productList: ProductListProps }) => state.productList
  );

  const dispatch = useDispatch();
  const category = useLocation().pathname.split("/")[2];
  // console.log(category);

  useEffect(() => {
    const getData = () => {
      fetch(`https://dummyjson.com/products?limit=20&skip=${currentPage * 20}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(getProductList(data));
        });
    };
    getData();
  }, [currentPage]);

  const handlePage = useCallback((page: number) => {
    dispatch(
      getProductList({
        products: [],
        skip: currentPage,
        total: pagination.total,
      })
    );
    setCurrentPage(page);
  }, []);
  return (
    <section className={"productList"}>
      <div className={"productList__header"}>
        <ProductSorting />
        <ProductPagination onClick={handlePage} currentPage={currentPage} />
      </div>
      <div className={"productList__body"}>
        {productList.length === 0 ? (
          <Loading />
        ) : (
          productList.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              thumbnail={product.thumbnail}
              title={product.title}
              price={product.price}
              rating={product.rating}
              stock={product.stock}
            />
          ))
        )}
      </div>
      <p style={{ textAlign: "right" }}>Tổng sản phẩm: {pagination.total}</p>
    </section>
  );
});

export default ProductList;
