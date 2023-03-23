import React, { memo, useMemo } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ProductDetailProps } from "../../ProductDetail/ProductDetail";
import Button from "../../UI/Button/Button";
import { ShoppingItem } from "../Cart";

interface CartOrderProps {
  cart: ProductDetailProps[];
  shopping: ShoppingItem[];
  orderAll: boolean;
  handleCannelAll: () => void;
  handleSelectAll: () => void;
  handleDeleteAllProduct: () => void;
}

const CartOrder = memo(
  ({
    cart,
    shopping,
    orderAll,
    handleCannelAll,
    handleSelectAll,
    handleDeleteAllProduct,
  }: CartOrderProps) => {
    const totalPriceProducts = useMemo(() => {
      const total = shopping.reduce(
        (accumulator: number, currentItem: ShoppingItem) => {
          if (currentItem.isCheck) {
            return accumulator + currentItem.quality * currentItem.price;
          }
          return accumulator;
        },
        0
      );
      return total;
    }, [shopping]);
    const totalProducts = useMemo(() => {
      const total = shopping.reduce(
        (accumulator: number, currentItem: ShoppingItem) => {
          if (currentItem.isCheck) {
            return accumulator + 1;
          }
          return accumulator;
        },
        0
      );
      return total;
    }, [shopping]);
    return (
      <>
        {cart.length > 0 && (
          <div className="cart__order">
            <div className="cart__order__input">
              {orderAll ? (
                <AiOutlineClose onClick={handleCannelAll} />
              ) : (
                <input
                  id="orderAll"
                  type="checkbox"
                  onClick={handleSelectAll}
                />
              )}
              <label htmlFor="orderAll">Chọn tất cả ({cart.length})</label>
            </div>
            <div className="cart__order__input">
              <label htmlFor="" onClick={handleDeleteAllProduct}>
                Xóa hết
              </label>
            </div>
            <div className="cart__order__input">{}</div>
            <div className="cart__order__input">{}</div>
            <div className="cart__order__input">
              <label htmlFor="">
                Tổng thanh toán ({shopping && totalProducts} Sản phẩm):{" "}
                {shopping && totalPriceProducts}
              </label>
              <Button title="Mua Hàng" type="primary" size="medium"></Button>
            </div>
          </div>
        )}
      </>
    );
  }
);

export default CartOrder;
