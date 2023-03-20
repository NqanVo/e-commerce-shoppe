import React, { memo } from "react";
import { useForm } from "react-hook-form";
import FormSubmit from "../../../UI/FormSubmit/FormSubmit";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";
import { ProfileProps } from "../../Profile";

type FormValues = {
  username: string;
  name: string;
  email: string;
  phone: string;
  gender: "Nam" | "Nữ"; // Chỉ chấp nhận 'Nam' hoặc 'Nữ'
  day: string;
  month: string;
  year: string;
  image: string;
};

const BodyInfo = memo((props: { userData: ProfileProps }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <>
      <div className="profile__body__heading">
        <h2>Hồ Sơ Của Tôi</h2>
        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <FormSubmit handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <div className="profile__body__formInfo">
          <div className="profile__body__formInfo__left">
            <Input
              title="Tên đăng nhập"
              name="username"
              register={register}
              value={props.userData.username}
              errors={errors.username}
              type="text"
              rules={{ required: "Tên không được bỏ trống" }}
            ></Input>
            <Input
              title="Tên"
              name="name"
              register={register}
              value={props.userData.lastName}
              errors={errors.name}
              type="text"
              rules={{ required: "Tên không được bỏ trống" }}
            ></Input>
            <Input
              title="Email"
              name="email"
              register={register}
              value={props.userData.email}
              errors={errors.email}
              type="text"
              rules={{ required: "Tên không được bỏ trống" }}
            ></Input>
            <Input
              title="Số điện thoại"
              name="phone"
              register={register}
              value={props.userData.phone}
              errors={errors.phone}
              type="tel"
              rules={{ required: "Tên không được bỏ trống" }}
            ></Input>

            <div className="input__body">
              <label>Giới tính</label>
              <div className="input__body input__body__raido">
                <label htmlFor="male">Nam</label>
                <input
                  type="radio"
                  id="male"
                  value="Nam"
                  defaultChecked={props.userData.gender === "male"}
                  {...register("gender", {})}
                />
              </div>
              <div className="input__body input__body__raido">
                <label htmlFor="female">Nữ</label>
                <input
                  type="radio"
                  id="female"
                  value="Nữ"
                  defaultChecked={props.userData.gender === "female"}
                  {...register("gender", {})}
                />
              </div>
            </div>
            <div className="input__body">
              <label>Ngày sinh</label>
              <div className="input__body">
                <select
                  {...register("day", {})}
                  defaultValue={props.userData.birthDate.split("-")[2]}
                >
                  {Array.from(Array(31), (_, i) => i + 1).map((day) => (
                    <option key={day} value={String(day).padStart(2, "0")}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  {...register("month", {})}
                  defaultValue={props.userData.birthDate.split("-")[1]}
                >
                  {Array.from(Array(12), (_, i) => i + 1).map((month) => (
                    <option key={month} value={String(month).padStart(2, "0")}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  {...register("year", {})}
                  defaultValue={props.userData.birthDate.split("-")[0]}
                >
                  {Array.from(Array(100), (_, i) => i + 1).map((year) => (
                    <option key={2000 + year} value={String(1960 + year)}>
                      {1960 + year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input__body">
              <label htmlFor=""></label>
              <Button
                size="medium"
                type="primary"
                title="Lưu"
                disabled={true}
              ></Button>
            </div>
          </div>
          <div className="profile__body__formInfo__right">
            <label className="" htmlFor="imageFileInfo">
              <input
                id="imageFileInfo"
                type="file"
                accept="image/*"
                {...register("image", {})}
              />
              <span className="">Chọn ảnh</span>
              <p>Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG</p>
            </label>
          </div>
        </div>
      </FormSubmit>
    </>
  );
});

export default BodyInfo;
