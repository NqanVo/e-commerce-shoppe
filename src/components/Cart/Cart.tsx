import React, { memo, useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllCart,
  deleteOneCart,
  initStateCartProps,
  loadingEndCart,
  loadingStartCart,
} from "../../redux/slices/cartSlice";
import { ProductDetailProps } from "../ProductDetail/ProductDetail";
import LoadingFull from "../UI/Loading/LoadingFull";
import { Notify } from "../UI/Notify/Notify";
import "./Cart.scss";
import CartOrder from "./CartOrder/CartOrder";
import { initStateLoginProps } from "../../redux/slices/authSlice";
export interface ShoppingItem {
  idProduct: string;
  quality: number;
  isCheck: boolean;
  price: number;
}
interface RootState {
  cart: initStateCartProps;
  auth: initStateLoginProps;
}
const Cart = memo(() => {
  const dispatch = useDispatch();
  const cartData = useSelector((state: RootState) => state.cart.cartData);
  const userData = useSelector((state: RootState) => state.auth.userData);
  const [cart, setCart] = useState<Array<ProductDetailProps>>([]);
  const loading = useSelector((state: RootState) => state.cart.loading);
  const [orderAll, setOrderAll] = useState<boolean>(false);
  const [shopping, setShopping] = useState<ShoppingItem[]>([]);

  //lấy data cho cart và shopping
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(loadingStartCart());
      const newCarts: any[] = [];
      let newShopping: any = [];
      for (let i of cartData) {
        await fetch(`https://dummyjson.com/products/${i.idProduct}`)
          .then((res) => res.json())
          .then((data) => {
            newCarts.push(data);
            newShopping.push({ ...i, isCheck: false, price: data.price });
          });
      }
      setCart(newCarts);
      setShopping(newShopping);

      dispatch(loadingEndCart());
    };
    if (cartData) fetchProducts();
    else setCart([]);
  }, [cartData]);

  //kiểm tra nếu có bất kỳ product nào có isCheck = false thì hủy orderAll
  useEffect(() => {
    setOrderAll(() => {
      return shopping.every((item: ShoppingItem) => item.isCheck);
    });
  }, [shopping]);

  // const handleDeleteOneProduct = async (index: number) => {
  //   await dispatch(deleteOneCart(index));
  //   Notify(200, "Xóa thành công");
  // };
  const handleDeleteOneProduct = async (idProduct: number) => {
    await dispatch(deleteOneCart(idProduct));
    Notify(200, "Xóa thành công");
  };
  const handleDeleteAllProduct = async () => {
    await dispatch(deleteAllCart());
    Notify(200, "Xóa thành công");
  };

  //cập nhật lại isCheck của product khi chọn/hủy
  const handleSelectProduct = (index: number) => {
    const newArray = [...shopping];
    newArray[index].isCheck = !newArray[index].isCheck;
    setShopping(newArray);
  };
  const handleSelectAll = useCallback(() => {
    const updatedShopping: ShoppingItem[] = shopping.map(
      (item: ShoppingItem) => {
        return { ...item, isCheck: true };
      }
    );
    setOrderAll(!orderAll);
    return setShopping(updatedShopping);
  }, [shopping]);
  const handleCannelAll = useCallback(() => {
    const updatedShopping: ShoppingItem[] = shopping.map(
      (item: ShoppingItem) => {
        return { ...item, isCheck: false };
      }
    );
    setOrderAll(!orderAll);
    return setShopping(updatedShopping);
  }, [shopping]);

  const handlePayment = useCallback(() => {
    if (userData) {
      const productPayment = shopping.filter(
        (product: ShoppingItem) => product.isCheck === true
      );
      for (let i in productPayment)
        dispatch(deleteOneCart(productPayment[i].idProduct));
      Notify(200, "Đặt hàng thành công");
    } else window.location.href = "/login";
  }, [shopping]);

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
        {loading ? (
          <LoadingFull />
        ) : cartData && cartData.length > 0 ? (
          <>
            {cart.map((product, index) => (
              <div key={index} className="cart__body__product">
                <div className="cart__body__product__title">
                  <input
                    type="checkbox"
                    value={product.id}
                    checked={shopping[index]?.isCheck}
                    onChange={() => handleSelectProduct(index)}
                  />
                  <img src={product.thumbnail} alt={product.thumbnail} />
                  <p>{product.title}</p>
                </div>
                <p>
                  {(product.price * 23500).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <p>{cartData[index]?.quality}</p>
                <p>
                  {(
                    Number(cartData[index]?.quality * product.price) * 23500
                  ).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <p onClick={() => handleDeleteOneProduct(product.id)}>Xóa</p>
              </div>
            ))}
          </>
        ) : (
          <div className="cart__body__empty">
            <img src="https://salevn.vn/tp/T0199/img/empty_cart.png" alt="" />
          </div>
        )}
      </div>
      <CartOrder
        cart={cart}
        shopping={shopping}
        orderAll={orderAll}
        handleCannelAll={handleCannelAll}
        handleSelectAll={handleSelectAll}
        handleDeleteAllProduct={handleDeleteAllProduct}
        handlePayment={handlePayment}
        disabledPayment={
          !shopping.some((product: ShoppingItem) => product.isCheck === true)
        }
      />
    </div>
  );
});

export default Cart;
