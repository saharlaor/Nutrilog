// External imports
import React, { useState } from "react";

// Components
import Input from "../Input/Input";

// CSS
import "./FoodLog.css";

function FoodLog() {
  const [term, setTerm] = useState("");
  const [amount, setAmount] = useState(0);

  const handleFoodChange = (newTerm) => {
    setTerm(newTerm);
  };

  const handleAmountChange = (newAmount) => {
    setAmount((prevAmount) => (newAmount >= 0 ? newAmount : prevAmount));
  };

  const getOptions = () => {
    return [{ label: "Test", value: "test" }];
  };

  return (
    <div className="FoodLog">
      <h2>Food Log</h2>
      <div className="FoodLog__inputs">
        <Input
          title="food item"
          type="text"
          value={term}
          changeHandler={handleFoodChange}
          options={getOptions()}
        />
        <Input
          title="amount"
          type="number"
          value={amount}
          changeHandler={handleAmountChange}
        />
      </div>
    </div>
  );
}

export default FoodLog;
