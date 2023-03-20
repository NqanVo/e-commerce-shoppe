import React, { memo } from "react";
import { IconType } from "react-icons";
import "./Button.scss";

interface ButtonProps {
  type?: "primary" | "secondary" | "normal";
  size?: "medium" | "large";
  title?: string;
  Icon?: IconType;
  sizeIcon?: number;
  colorIcon?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = memo(
  ({
    type = "normal",
    size = "medium",
    title,
    Icon,
    sizeIcon = 16,
    colorIcon = "black",
    onClick,
    disabled = false,
  }: ButtonProps) => {
    const getClass = () => {
      let classes: string = "button";
      if (type === "primary") classes += " primary";
      if (type === "secondary") classes += " secondary";
      if (size === "large") classes += " large";
      if (disabled) classes += " disabled";
      return classes;
    };

    return (
      <button onClick={onClick} className={getClass()} disabled={disabled}>
        {Icon && <Icon size={sizeIcon} color={colorIcon} />} {title && title}
      </button>
    );
  }
);

export default Button;
