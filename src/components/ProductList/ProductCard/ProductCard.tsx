import React, { memo } from "react";
import "./ProductCard.scss";
import ProductCardRating from "./ProductCardRating/ProductCardRating";

export interface ProductCardProps {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  rating: number;
  stock: number;
}

const ProductCard = memo(
  ({ id, thumbnail, title, price, rating, stock }: ProductCardProps) => {
    return (
      <div key={id} className={"productCard"}>
        <div className={"productCard__image"}>
          <img
            src={thumbnail}
            alt={title}
            width="invalid-value"
            height="invalid-value"
          />
        </div>
        <div className={"productCard__body"}>
          <p className={"productCard__body__title"}>
            {title.length > 60 ? title.substring(0, 60) + "..." : title}
          </p>
          <p className={"productCard__body__price"}>${price}</p>
          <div className={"productCard__body__rating"}>
            <ProductCardRating rating={rating} />
            <p>Đã bán: {stock}</p>
          </div>
        </div>
      </div>
    );
  }
);

export default ProductCard;
