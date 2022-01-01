// External imports
import React from "react";
import { AutoComplete, InputNumber, Input as InputText } from "antd";

// CSS
import "./Input.css";

function Input({ title, type, value, changeHandler, options }) {
  const handleChange = (newVal) => {
    console.log(newVal);
    changeHandler(newVal);
  };

  let component;
  switch (type) {
    case "text":
      component = (
        <AutoComplete
          dropdownMatchSelectWidth={250}
          style={{
            width: 300,
          }}
          value={value}
          onChange={handleChange}
          options={options}
          onSelect={(e) => console.log(e)}
        />
      );
      break;

    case "number":
      component = <InputNumber value={value} onChange={handleChange} />;
      break;

    default:
      component = <InputText value={value} onChange={handleChange} />;
      break;
  }

  return (
    <div className="Input">
      <label htmlFor={title.split(" ").join("")}>{title}</label>
      {component}
      {/* <input
        type={type}
        name={title}
        id={title}
        placeholder={`${title}...`}
        value={value}
        onChange={handleChange}
      /> */}
    </div>
  );
}

export default Input;
