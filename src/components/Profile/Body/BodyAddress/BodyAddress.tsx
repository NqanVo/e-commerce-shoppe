import React, { memo } from "react";
import Button from "../../../UI/Button/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ProfileProps } from "../../Profile";

interface BodyAddressProps {
  userData: ProfileProps;
}

const BodyAddress = memo((props: BodyAddressProps) => {
  return (
    <>
      <div className="profile__body__heading">
        <div className="profile__body__heading__title">
          <h2>Địa chỉ của tôi</h2>
        </div>
        <Button
          Icon={AiOutlinePlus}
          title="Thêm địa chỉ mới"
          size="medium"
          type="primary"
          colorIcon="white"
        ></Button>
      </div>
      <div className="profile__body__address">
        <div className="profile__body__address__item">
          <div className="profile__body__address__item__detail">
            <h3>
              <span>
                {props.userData.firstName} {props.userData.lastName}
              </span>
              <span>{props.userData.phone}</span>
            </h3>
            <p>
              {props.userData.company.address.address} ,
              {props.userData.company.address.city}
            </p>
            <div className="profile__body__address__item__detail__tag">
              <Button
                type="secondary"
                title="Mặc định"
                size="small"
                disabled={true}
              ></Button>
              <Button
                title="Địa chỉ lấy hàng"
                size="small"
                disabled={true}
              ></Button>
              <Button
                title="Địa chỉ trả hàng"
                size="small"
                disabled={true}
              ></Button>
            </div>
          </div>
          <div className="profile__body__address__item__action">
            <Link to={"/user/account/address"}>Cập nhật</Link>
            <Button
              title="Thiết lập mặc định"
              size="small"
              disabled={true}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
});

export default BodyAddress;
