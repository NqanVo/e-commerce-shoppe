import React, { memo, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import Button from "../../UI/Button/Button";
import "./ProductDetailOrder.scss";
interface props {
  stock: number;
  id: number;
}

const ProductDetailOrder = memo(({ stock, id }: props) => {
  const [quality, setQuality] = useState<number>(0);
  // console.log(quality);
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
    else if (q >= stock) setQuality(stock);
    else setQuality(q);
  };
  const handleDownQuality = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    setQuality(quality - 1);
  };

  const handleAddCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let checkProduct;
    if (quality) {
      const oldCart: any = localStorage.getItem("cartData");
      const oldCartArray = JSON.parse(oldCart);
      //kiểm tra có giỏ hàng sẳn hay chưa
      if (oldCartArray) {
        checkProduct = oldCartArray.find((item: any) => item.idProduct === id);
        //kiểm tra xem sản phẩm đang thêm có sẳn trong giỏ hàng chưa
        if (!checkProduct)
          localStorage.setItem(
            "cartData",
            JSON.stringify([
              ...oldCartArray,
              { idProduct: id, quality: quality },
            ])
          );
        else {
          checkProduct.quality = quality;
          localStorage.setItem("cartData", JSON.stringify(oldCartArray));
        }
      } else
        localStorage.setItem(
          "cartData",
          JSON.stringify([{ idProduct: id, quality: quality }])
        );
    }
  };

  return (
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
            disabled={quality === stock}
          />
        </div>
        <label htmlFor="">Còn lại {stock}</label>
      </div>
      <div className="productDetail__body__formOrder__buttons">
        <Button
          Icon={BsCartPlus}
          sizeIcon={16}
          colorIcon="#ee4d2d"
          title={"Thêm vào giỏ hàng"}
          type="secondary"
          size="large"
          onClick={(e) => handleAddCart(e)}
        />
        <Button title={"Mua ngay"} type="primary" size="large" />
      </div>
    </form>
  );
});

export default ProductDetailOrder;
