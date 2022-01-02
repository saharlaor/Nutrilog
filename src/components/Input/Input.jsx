// External imports
import React from "react";
import { AutoComplete, InputNumber, Input as InputText } from "antd";

// CSS
import "./Input.css";

function Input({
  title,
  type,
  value,
  options,
  autoFocus,
  changeHandler,
  selectHandler,
}) {
  const handleChange = (newVal) => {
    console.log(newVal);
    changeHandler(newVal);
  };

  const handleSelect = (value) => {
    selectHandler(value);
    changeHandler("");
  };

  let component;
  switch (type) {
    case "autocomplete":
      component = (
        <AutoComplete
          dropdownMatchSelectWidth={250}
          style={{
            width: 300,
          }}
          value={value}
          options={options}
          autoFocus={autoFocus}
          onChange={handleChange}
          onSelect={handleSelect}
        />
      );
      break;

    case "number":
      component = (
        <InputNumber
          value={value}
          onChange={handleChange}
          autoFocus={autoFocus}
        />
      );
      break;

    case "text":
    default:
      component = (
        <InputText
          value={value}
          onChange={handleChange}
          autoFocus={autoFocus}
        />
      );
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
