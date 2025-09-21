import React from "react";

const Button = ({
  label = "",
  onClick,
  className = "",
  type = "button",
  size = "md", // new prop: sm, md, lg
}) => {
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`
        cursor-pointer rounded-md overflow-hidden group relative text-white
        bg-[var(--color-primary)]
        hover:ring-2 hover:ring-offset-2 hover:ring-[var(--color-primary)]
        transition-all ease-out duration-300
        ${sizes[size]} ${className}
      `}
    >
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span className="relative font-bold">{label}</span>
    </button>
  );
};

export default Button;
