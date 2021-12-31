import React from "react";
import Input from "../Input/Input";
import "./FoodLog.css";

function FoodLog() {
  return (
    <div className="FoodLog">
      <h2>Food Log</h2>
      <Input title="food item" type="text" />
      <Input title="amount" type="number" />
    </div>
  );
}

export default FoodLog;
