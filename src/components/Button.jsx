
import React from "react";

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-400 hover:bg-blue-500 text-white text-lg font-medium py-3 rounded-lg shadow-md transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
