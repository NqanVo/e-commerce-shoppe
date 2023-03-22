import React, { memo } from "react";
import { useForm } from "react-hook-form";
import FormSubmit from "../../../UI/FormSubmit/FormSubmit";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";
import { ProfileProps } from "../../Profile";
import { fetchWithAuth } from "../../../../fetchApi/fetchWithAuth";
import "./BodyInfo.scss";

interface FormValues {
  [key: string]: string | File;
  username: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "male" | "female";
  day: string;
  month: string;
  year: string;
  image: File;
}

interface BodyInfoProps {
  userData: ProfileProps;
  handleUpdate: (data: ProfileProps) => void;
}

const BodyInfo = memo((props: BodyInfoProps) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const birthDate = data.year + "-" + data.month + "-" + data.day;
    const newData = { ...data, birthDate: birthDate };
    const { day, year, month, ...other }: FormValues = newData;
    const formData = new FormData();

    for (let key in other) formData.append(key, other[key]);
    // console.log(formData);

    await fetchWithAuth(`https://dummyjson.com/users/${props.userData.id}`, {
      method: "PUT",
      body: formData,
    }).then((data) => {
      props.handleUpdate(data);
    });
  };

  return (
    <>
      <div className="profile__body__heading">
        <div className="profile__body__heading__title">
          <h2>Hồ Sơ Của Tôi</h2>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
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
              rules={{}}
              disabled={true}
            ></Input>
            <Input
              title="Tên"
              name="lastName"
              register={register}
              value={props.userData.lastName}
              errors={errors.lastName}
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
              <div className="input__body__raido">
                <div className="input__body">
                  <label htmlFor="male">Nam</label>
                  <input
                    type="radio"
                    id="male"
                    value="male"
                    defaultChecked={props.userData.gender === "male"}
                    {...register("gender", {})}
                  />
                </div>
                <div className="input__body">
                  <label htmlFor="female">Nữ</label>
                  <input
                    type="radio"
                    id="female"
                    value="female"
                    defaultChecked={props.userData.gender === "female"}
                    {...register("gender", {})}
                  />
                </div>
              </div>
            </div>
            <div className="input__body">
              <label>Ngày sinh</label>
              <div className="input__body__select">
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
              <Button size="medium" type="primary" title="Lưu"></Button>
            </div>
          </div>
          <div className="profile__body__formInfo__right">
            <div className="">
              <Input
                title="Link ảnh"
                name="image"
                register={register}
                value={props.userData.image}
                errors={errors.image}
                type="text"
                rules={{}}
              ></Input>
              <p>Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG</p>
            </div>
          </div>
        </div>
      </FormSubmit>
    </>
  );
});

export default BodyInfo;
