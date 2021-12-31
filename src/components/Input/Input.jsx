import React, { useState } from "react";
import "./Input.css";

function Input({ title, type }) {
  const [value, setValue] = useState(type === "number" ? 0 : "");

  const handleChange = (e) => {
    setValue(e.target.value);
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
