import React, { memo } from "react";
import "./ProductDetail.scss";
import ProductCardRating from "../ProductList/ProductCard/ProductCardRating/ProductCardRating";
import ProductDetailOrder from "./ProductDetailOrder/ProductDetailOrder";
import ProductDetailThumb from "./ProductDetailThumb/ProductDetailThumb";
import ProductDetailLabel from "./ProductDetailLabel/ProductDetailLabel";

import icon_free_ship from "../../assets/image/icon_free_ship.png";
import ProductDetailPrice from "./ProductDetailPrice/ProductDetailPrice";
import { Link } from "react-router-dom";

import { AiOutlineRight } from "react-icons/ai";

export interface ProductDetailProps {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const ProductDetail = memo(({ ...props }: ProductDetailProps) => {
  return (
    <>
      <div className="tag">
        <Link className="tag__link" to="/">
          Shọp pee
        </Link>
        <AiOutlineRight />
        <Link className="tag__link" to={`/category/${props.category}`}>
          {props.category}
        </Link>
        <AiOutlineRight />
        <p>{props.title}</p>
      </div>
      <div className="productDetail productDetail__layout1">
        <ProductDetailThumb thumbnail={props.thumbnail} images={props.images} />
        <div className="productDetail__body">
          <h1 className="productDetail__body__title">{props.title}</h1>
          <div className="productDetail__body__rating">
            <span className="">
              {props.rating} <ProductCardRating rating={props.rating} />{" "}
            </span>
            <span>Đã bán {props.stock}</span>
          </div>
          <ProductDetailPrice
            discountPercentage={props.discountPercentage}
            price={props.price}
          />
          <h3>Danh mục: {props.category}</h3>
          <h3>Nhãn hiệu: {props.brand}</h3>
          <div className="productDetail__body__label__item">
            <h3>Vận chuyển:</h3>
            <img src={icon_free_ship} alt="" />
            <h3>Miễn phí vận chuyển</h3>
          </div>
          <ProductDetailOrder stock={props.stock} />
          <ProductDetailLabel />
        </div>
      </div>
      <div className="productDetail productDetail__layout2">
        <h2>MÔ TẢ SẢN PHẨM</h2>
        <p>{props.description}</p>
      </div>
    </>
  );
});

export default ProductDetail;
