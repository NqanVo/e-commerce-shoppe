import React, { memo, useState } from "react";
import "./ProductDetailThumb.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
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
        <Swiper
          slidesPerView={5}
          navigation={true}
          spaceBetween={10}
          modules={[Navigation]}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                key={index}
                src={img}
                alt={img}
                onMouseOver={() => setChangeThumb(img)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
});

export default ProductDetailThumb;
