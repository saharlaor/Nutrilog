import React from "react";
import "./Input.css";

function Input({ title, type, value, changeHandler }) {
  const handleChange = (e) => {
    changeHandler(e.target.value);
  };

  return (
    <div className="Input">
      <label htmlFor={title.split(" ").join("")}>{title}</label>
      <input
        type={type}
        name={title}
        id={title}
        placeholder={`${title}...`}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default Input;
