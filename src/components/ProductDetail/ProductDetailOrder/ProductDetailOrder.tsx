import React, { memo, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCart } from "../../../redux/slices/cartSlice";
import Button from "../../UI/Button/Button";
import { Notify } from "../../UI/Notify/Notify";
import "./ProductDetailOrder.scss";

interface props {
  stock: number;
  id: number;
}

const ProductDetailOrder = memo(({ stock, id }: props) => {
  const navigate = useNavigate();
  const [quality, setQuality] = useState<number>(0);
  const dispatch = useDispatch();
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
    if (quality) {
      dispatch(addCart({ idProduct: id, quality: quality }));
      Notify(200, "Thêm thành công");
    } else Notify(400, "Vui lòng chọn số lượng");
  };
  const handleOrder = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (quality) {
      dispatch(addCart({ idProduct: id, quality: quality }));
      // Notify(200, "Thêm thành công");
      navigate("/cart");
    } else Notify(400, "Vui lòng chọn số lượng");
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
        <Button
          title={"Mua ngay"}
          type="primary"
          size="large"
          onClick={(e) => handleOrder(e)}
        />
      </div>
    </form>
  );
});

export default ProductDetailOrder;
