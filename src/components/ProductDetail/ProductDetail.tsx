import React, { memo, useState } from "react";
import ProductCardRating from "../ProductList/ProductCard/ProductCardRating/ProductCardRating";
import Button from "../UI/Button/Button";
import "./ProductDetail.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";

import icon_free_ship from "../../assets/image/icon_free_ship.png";
import icon_free_ship_red from "../../assets/image/icon_free_ship_red.png";
import icon_protect from "../../assets/image/icon_protect.png";
import icon_refund from "../../assets/image/icon_refund.png";

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
  const [changeThumb, setChangeThumb] = useState<string>(props.thumbnail);
  const [quality, setQuality] = useState<number>(0);
  console.log(quality);
  const handleUpQuality = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    setQuality(quality + 1);
  };
  const handleChangeQuality = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let q = Number.parseInt(event.currentTarget.value);
    if (q <= 0 || isNaN(q)) setQuality(0);
    else if (q >= props.stock) setQuality(props.stock);
    else setQuality(q);
  };
  const handleDownQuality = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    setQuality(quality - 1);
  };

  return (
    <div className="productDetail">
      <div className="productDetail__thumbnail">
        <img src={changeThumb} alt="" />
        <div className="productDetail__thumbnail__listImage">
          {props.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={img}
              onMouseOver={() => setChangeThumb(img)}
            />
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
        <div className="productDetail__body__label__item">
          <h3>Vận chuyển:</h3>
          <img src={icon_free_ship} alt="" />
          <h3>Miễn phí vận chuyển</h3>
        </div>
        <form action="" className="productDetail__body__formOrder">
          <div className="productDetail__body__formOrder__input">
            <label htmlFor="">Số lượng</label>
            <div className="">
              <Button
                Icon={AiOutlineMinus}
                onClick={(event) => handleDownQuality(event)}
                disabled={quality <= 0}
              />
              <input
                type="number"
                value={quality}
                onChange={(event) => handleChangeQuality(event)}
              />
              <Button
                Icon={AiOutlinePlus}
                onClick={(event) => handleUpQuality(event)}
                disabled={quality === props.stock}
              />
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
        <div className="productDetail__body__label">
          <div className="productDetail__body__label__item">
            <img src={icon_refund} alt="" />
            <h3>7 ngày miễn phí trả hàng</h3>
          </div>
          <div className="productDetail__body__label__item">
            <img src={icon_protect} alt="" />
            <h3>Hàng chính hãng 100%</h3>
          </div>
          <div className="productDetail__body__label__item">
            <img src={icon_free_ship_red} alt="" />
            <h3>Miễn phí vận chuyển</h3>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductDetail;
