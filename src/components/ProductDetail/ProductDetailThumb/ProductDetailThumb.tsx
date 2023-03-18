import React, { memo, useState } from "react";
import "./ProductDetailThumb.scss";

interface props {
  thumbnail: string;
  images: string[];
}

const ProductDetailThumb = memo(({ thumbnail, images }: props) => {
  const [changeThumb, setChangeThumb] = useState<string>(thumbnail);

  return (
    <div className="productDetail__thumbnail">
      <img src={changeThumb} alt="" />
      <div className="productDetail__thumbnail__listImage">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={img}
            onMouseOver={() => setChangeThumb(img)}
          />
        ))}
      </div>
    </div>
  );
});

export default ProductDetailThumb;
