import React, { memo } from "react";
import { UseFormRegister } from "react-hook-form";
import "./Input.scss";
interface InputProps {
  name: string;
  title: string;
  value: string | number;
  type: "text" | "email" | "tel" | "number" | "password";
  disabled?: boolean;
  rules: any;
  register: UseFormRegister<any>;
  errors?: any;
}

const Input = memo((props: InputProps) => {
  const {
    title,
    name,
    value,
    type,
    disabled = false,
    rules,
    register,
    errors,
  } = props;
  return (
    <div className="input__body">
      <label htmlFor={name}>{title}</label>
      <input
        type={type}
        id={name}
        defaultValue={value}
        disabled={disabled}
        {...register(name, { ...rules })}
      />
      <div className=""></div>
      {errors && <span className="">{errors.message}</span>}
    </div>
  );
});

export default Input;
