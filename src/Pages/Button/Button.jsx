import React from "react";

const Button = ({ label = "", onClick, className = "", type = "button" }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`cursor-pointer rounded-md px-5 py-2.5 overflow-hidden group bg-primary relative text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300 ${className}`}
    >
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span className="relative font-bold">{label}</span>
    </button>
  );
};

export default Button;
