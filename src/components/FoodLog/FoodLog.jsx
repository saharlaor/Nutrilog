import React, { useState } from "react";
import Input from "../Input/Input";
import "./FoodLog.css";

function FoodLog() {
  const [term, setTerm] = useState("");
  const [amount, setAmount] = useState(0);

  const handleFoodChange = (newTerm) => {
    setTerm(newTerm);
  };

  const handleAmountChange = (newAmount) => {
    setAmount(newAmount);
  };

  return (
    <div className="FoodLog">
      <h2>Food Log</h2>
      <Input
        title="food item"
        type="text"
        value={term}
        changeHandler={handleFoodChange}
      />
      <Input
        title="amount"
        type="number"
        value={amount}
        changeHandler={handleAmountChange}
      />
    </div>
  );
}

export default FoodLog;
