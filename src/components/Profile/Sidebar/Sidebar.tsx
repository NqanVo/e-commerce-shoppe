import React, { memo } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiBillLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { ProfileProps } from "../Profile";
import "./Sidebar.scss";
import SideBarMenu from "./SideBarMenu/SideBarMenu";
const Sidebar = memo((props: { userData: ProfileProps }) => {
  const menu_active = useLocation().pathname.split("/")[2];
  const subMenu_active = useLocation().pathname.split("/")[3];

  return (
    <nav className="profile__nav">
      <div className="profile__nav__menu">
        <div className="profile__nav__menu__avatar">
          <img src={props.userData.image} alt={props.userData.image} />
          <h3>
            {props.userData.firstName} {props.userData.lastName}
          </h3>
        </div>
      </div>
      <SideBarMenu
        Icon={AiOutlineUser}
        menu="account"
        url="/user/account/profile"
        menu_active={menu_active}
        title="Tài khoản của tôi"
        subMenu_active={subMenu_active}
        subMenu={[
          {
            url: "/user/account/profile",
            subMenu: "profile",
            title: "Hồ sơ",
          },
          {
            url: "/user/account/payment",
            subMenu: "payment",
            title: "Ngân Hàng",
          },
          {
            url: "/user/account/address",
            subMenu: "address",
            title: "Địa chỉ",
          },
          {
            url: "/user/account/password",
            subMenu: "password",
            title: "Đổi mật khẩu",
          },
        ]}
      />
      <SideBarMenu
        Icon={RiBillLine}
        menu="purchase"
        url="/user/purchase"
        menu_active={menu_active}
        title="Đơn mua"
      />
      <SideBarMenu
        Icon={IoMdNotificationsOutline}
        menu="notifications"
        menu_active={menu_active}
        url="/user/notifications/order"
        title="Thông báo"
        subMenu_active={subMenu_active}
        subMenu={[
          {
            url: "/user/notifications/order",
            subMenu: "order",
            title: "Cập Nhật Đơn Hàng",
          },
          {
            url: "/user/notifications/promotion",
            subMenu: "promotion",
            title: "Khuyến Mãi",
          },
          {
            url: "/user/notifications/wallet",
            subMenu: "wallet",
            title: "Cập Nhật Ví",
          },
          {
            url: "/user/notifications/activity",
            subMenu: "activity",
            title: "Hoạt Động",
          },
        ]}
      />
    </nav>
  );
});

export default Sidebar;
