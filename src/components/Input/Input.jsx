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
  enterHandler,
}) {
  const handleChange = (newVal) => {
    changeHandler(newVal);
  };

  const handleSelect = (value) => {
    selectHandler(value);
    // changeHandler("");
    enterHandler && enterHandler();
  };

  const handleEnter = () => {
    enterHandler();
  };

  let component;
  switch (type) {
    case "autocomplete":
      component = (
        <AutoComplete
          dropdownMatchSelectWidth={250}
          value={value}
          options={options}
          autoFocus={autoFocus}
          onChange={handleChange}
          onSelect={handleSelect}
          onPressEnter={handleEnter}
        />
      );
      break;

    case "number":
      component = (
        <InputNumber
          value={value}
          onChange={handleChange}
          autoFocus={autoFocus}
          onPressEnter={handleEnter}
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
          onPressEnter={handleEnter}
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
