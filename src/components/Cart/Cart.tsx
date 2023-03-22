import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllCart } from "../../redux/slices/cartSlice";
import Button from "../UI/Button/Button";
import "./Cart.scss";
const Cart = memo(() => {
  const dispatch = useDispatch();
  const cartData = useSelector((state: any) => state.cart.cartData);
  const [cart, setCart] = useState<Array<any>>([]);
  // console.log(cart);

  useEffect(() => {
    async function fetchProducts() {
      const newCarts: any[] = [];
      for (let i of cartData) {
        await fetch(`https://dummyjson.com/products/${i.idProduct}`)
          .then((res) => res.json())
          .then((data) => newCarts.push(data));
      }
      setCart(newCarts);
    }
    if (cartData) fetchProducts();
    else setCart([]);
  }, [cartData]);

  const handleDeleteOneProduct = (index: number) => {};
  const handleDeleteAllProduct = () => {
    dispatch(deleteAllCart());
  };
  return (
    <div>
      <div className="cart__body">
        <div className="cart__body__heading">
          <p>Sản Phẩm</p>
          <p>Đơn Giá</p>
          <p>Số Lượng</p>
          <p>Số Tiền</p>
          <p>Thao Tác</p>
        </div>
        {cartData.length > 0 &&
          cart.map((product, index) => (
            <div key={index} className="cart__body__product">
              <div className="cart__body__product__title">
                <input type="checkbox" />
                <img src={product.thumbnail} alt={product.thumbnail} />
                <p>{product.title}</p>
              </div>
              <p>{product.price}</p>
              <p>{cartData[index].quality}</p>
              <p>{parseInt(cartData[index].quality) * product.price}</p>
              <p onClick={() => handleDeleteOneProduct(index)}>Xóa</p>
            </div>
          ))}
      </div>
      <div className="cart__order">
        <div className="cart__order__input">
          <input id="orderAll" type="checkbox" />
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
          <label htmlFor="">Tổng thanh toán (0 Sản phẩm): 0đ</label>
          <Button title="Mua Hàng" type="primary" size="medium"></Button>
        </div>
      </div>
    </div>
  );
});

export default Cart;
