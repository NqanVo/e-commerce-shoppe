import React, { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Layout/Header/Header";
import ProductDetail from "../components/ProductDetail/ProductDetail";

import { ProductDetailProps } from "../components/ProductDetail/ProductDetail";
import Loading from "../components/UI/Loading/Loading";

const ProductSinglePage = memo(() => {
  const idProduct = useLocation().pathname.split("/")[2];
  const [productDetail, setProductDetail] = useState<ProductDetailProps>();
  console.log(idProduct);
  useEffect(() => {
    const getData = () => {
      fetch(`https://dummyjson.com/products/${idProduct}`)
        .then((res) => res.json())
        .then((data) => setProductDetail(data));
    };
    getData();
  }, []);
  console.log(productDetail);

  return (
    <div className="">
      <Header></Header>
      <div className="container container__productDetail">
        {!productDetail ? (
          <Loading />
        ) : (
          <ProductDetail
            id={productDetail.id}
            brand={productDetail.brand}
            category={productDetail.category}
            description={productDetail.description}
            discountPercentage={productDetail.discountPercentage}
            images={productDetail.images}
            price={productDetail.price}
            rating={productDetail.rating}
            stock={productDetail.stock}
            thumbnail={productDetail.thumbnail}
            title={productDetail.title}
          ></ProductDetail>
        )}
      </div>
    </div>
  );
});

export default ProductSinglePage;
