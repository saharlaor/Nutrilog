// External
import React, { useEffect, useState } from "react";

// Components
import Input from "../../Input/Input";

// CSS
import "./Detail.css";

function Detail({ title, type, options, currDetail, changeHandler }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(currDetail);

  useEffect(() => {
    value && changeHandler(title.toLowerCase(), value);
  }, [value, title, changeHandler]);

  const handleInputChange = (newVal) => {
    setValue(newVal);
  };

  const handleEnter = () => {
    setEditing((prevState) => !prevState);
  };

  const toggleEdit = () => {
    setEditing((prevState) => !prevState);
  };

  return (
    <div className="Detail">
      {editing ? (
        <Input
          title={title}
          type={type}
          options={options}
          value={value}
          changeHandler={handleInputChange}
          selectHandler={handleInputChange}
          enterHandler={handleEnter}
        />
      ) : (
        <span onClick={toggleEdit}>
          {title}: {value || ""}
        </span>
      )}
    </div>
  );
}

export default Detail;
