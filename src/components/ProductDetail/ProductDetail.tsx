import React, { memo } from "react";
import ProductCardRating from "../ProductList/ProductCard/ProductCardRating/ProductCardRating";
import Button from "../UI/Button/Button";
import "./ProductDetail.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { FcShipped } from "react-icons/fc";
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
    <div className="productDetail">
      <div className="productDetail__thumbnail">
        <img src={props.thumbnail} alt="" />
        <div className="productDetail__thumbnail__listImage">
          {props.images.map((img, index) => (
            <img key={index} src={img} alt={img} />
          ))}
        </div>
      </div>
      <div className="productDetail__body">
        <h1 className="productDetail__body__title">{props.title}</h1>
        <div className="productDetail__body__rating">
          <span className="">
            {props.rating} <ProductCardRating rating={props.rating} />{" "}
          </span>
          <span>Đã bán {props.stock}</span>
        </div>
        <div className="productDetail__body__price">
          <h3 className="productDetail__body__price__old">
            {((props.discountPercentage + props.price) * 23500).toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              }
            )}
          </h3>
          <h2 className="productDetail__body__price__new">
            {(props.price * 23500).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </h2>
          <span className="productDetail__body__price__sale">
            Giảm{" "}
            {(
              (1 - props.price / (props.price + props.discountPercentage)) *
              100
            ).toFixed(2)}
            %
          </span>
        </div>
        <h3>Danh mục: {props.category}</h3>
        <h3>Nhãn hiệu: {props.brand}</h3>
        <h3>
          Vận chuyển:{" "}
          <img
            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/74f3e9ac01da8565c3baead996ed6e2a.png"
            alt=""
          />{" "}
          Miễn phí vận chuyển
        </h3>
        <form action="" className="productDetail__body__formOrder">
          <div className="productDetail__body__formOrder__input">
            <label htmlFor="">Số lượng</label>
            <div className="">
              <Button Icon={AiOutlineMinus} />
              <input type="number" />
              <Button Icon={AiOutlinePlus} />
            </div>
            <label htmlFor="">Còn lại {props.stock}</label>
          </div>
          <div className="productDetail__body__formOrder__buttons">
            <Button
              Icon={BsCartPlus}
              title={"Thêm vào giỏ hàng"}
              type="secondary"
              size="large"
            />
            <Button title={"Mua ngay"} type="primary" size="large" />
          </div>
        </form>
      </div>
    </div>
  );
});

export default ProductDetail;
