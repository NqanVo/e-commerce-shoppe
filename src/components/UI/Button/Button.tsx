import React, { memo } from "react";
import "./Button.scss";

interface ButtonProps {
  type?: "primary" | "secondary";
  size?: "medium" | "large";
  title: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = memo(
  ({
    type = "secondary",
    size = "medium",
    title,
    onClick,
    disabled = false,
  }: ButtonProps) => {
    // let class : string = "";
    const getClass = () => {
      let classes: string = "button";
      if (type === "primary") classes += " primary";
      if (size === "large") classes += " large";
      if (disabled) classes += " disabled";
      return classes;
    };

    return (
      <button onClick={onClick} className={getClass()} disabled={disabled}>
        {title}
      </button>
    );
  }
);

export default Button;
