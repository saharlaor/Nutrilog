import React from "react";
import "./Input.css";

function Input({ title, type }) {
  return (
    <div className="Input">
      <label htmlFor={title.split(" ").join("")}>{title}</label>
      <input type={type} name={title} id={title} placeholder={`${title}...`} />
    </div>
  );
}

export default Input;
