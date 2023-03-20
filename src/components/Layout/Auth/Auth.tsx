import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Auth.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess } from "../../../redux/slices/authSlice";
import FormSubmit from "../../UI/FormSubmit/FormSubmit";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
interface Inputs {
  username: string;
  password: string;
}

export interface LoginUserProps {
  email: string;
  firstName: string;
  gender: string;
  id: number;
  image: string;
  lastName: string;
  token: string;
  username: string;
  exp: number;
}

const Auth = memo(() => {
  const dispatch = useDispatch();
  const location = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    dispatch(loginStart());
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username.trim(),
        password: data.password.trim(),
        expiresInMins: 60, // optional
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          return Promise.reject(new Error("Invalid username or password"));
        }
        return res.json();
      })
      .then((data) => {
        dispatch(loginSuccess(data));
        localStorage.setItem("userData", JSON.stringify(data));
        location("/user/account/profile");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <div className="containerAuth">
        <div className="headerAuth">
          <div className="">Đăng nhập</div>
          <Link to="https://help.shopee.vn/portal">Bạn cần giúp đỡ?</Link>
        </div>
      </div>
      <div className="containerAuth containerAuth__colorBg">
        <section className="bodyAuth">
          <div className="bodyAuth__content bodyAuth__thumb">
            <img src="https://tingoan.vn/tp/T0300/img/shopee1.png" alt="" />
          </div>
          <div className="bodyAuth__content bodyAuth__login">
            <FormSubmit handleSubmit={handleSubmit} onSubmit={onSubmit}>
              <h2>Đăng nhập</h2>
              <div className="bodyAuth__login__form">
                <Input
                  title="Tài khoản"
                  type="text"
                  name="username"
                  value="kminchelle"
                  rules={{ required: true }}
                  register={register}
                ></Input>
                <Input
                  title="Mật khẩu"
                  type="password"
                  name="password"
                  value="0lelplR"
                  rules={{ required: true }}
                  register={register}
                ></Input>
                <Button title="Đăng nhập" size="large" type="primary"></Button>
              </div>
              <div className="bodyAuth__login__with">
                <Button
                  Icon={FaFacebook}
                  title="Facebook"
                  sizeIcon={26}
                  colorIcon="blue"
                  disabled={true}
                />
                <Button
                  Icon={FcGoogle}
                  title="Google"
                  sizeIcon={26}
                  disabled={true}
                />
                <Button
                  Icon={AiFillApple}
                  title="Apple"
                  sizeIcon={26}
                  disabled={true}
                />
              </div>
            </FormSubmit>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
});

export default Auth;
