import React from "react";
import { COLORS } from "../../constants/data";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  const baseStyles =
    "font-semibold rounded-2xl transition-all duration-200 inline-flex items-center justify-center gap-2";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary: `bg-[${COLORS.primary}] text-white hover:opacity-90 active:scale-95`,
    secondary: `bg-[${COLORS.secondary}] text-white hover:opacity-90 active:scale-95`,
    outline: `border-2 border-[${COLORS.primary}] text-[${COLORS.primary}] hover:bg-[${COLORS.primary}] hover:text-white active:scale-95`,
    ghost: `text-[${COLORS.primary}] hover:bg-gray-100 active:scale-95`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizes[size]} ${
        variant === "primary"
          ? "bg-[#08478B] text-white hover:opacity-90 active:scale-95"
          : variant === "secondary"
            ? "bg-[#469838] text-white hover:opacity-90 active:scale-95"
            : variant === "outline"
              ? "border-2 border-[#08478B] text-[#08478B] hover:bg-[#08478B] hover:text-white"
              : "text-[#08478B] hover:bg-gray-100"
      } ${fullWidth ? "w-full" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
