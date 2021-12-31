import React from "react";
import Input from "../Input/Input";
import "./FoodLog.css";

function FoodLog() {
  return (
    <div className="FoodLog">
      <h2>Food Log</h2>
      <Input title="food item" type="text" />
    </div>
  );
}

export default FoodLog;
