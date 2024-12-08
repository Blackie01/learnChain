"use client";
import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: any;
  smallButton?: boolean;
  disable?: boolean;
  maxWidth?: string;
  textColor?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  smallButton = false,
  disable = false,
  maxWidth,
  textColor,
}) => {
  const small = `px-2 py-1 bg-[#EEEFEF] text-[12px]`;
  const normal = `px-4 py-2 border border-[#C7F86F]`;

  return (
    <button
      onClick={onClick}
      className={`
                ${smallButton ? small : normal} 
                ${disable && "text-[#8c8382]"} 
                ${maxWidth && "truncate"}
                rounded-2xl
                `}
      disabled={disable}
      style={{ maxWidth: maxWidth, color: `${!disable && textColor}` }}
    >
      {children}
    </button>
  );
};

export default Button;
