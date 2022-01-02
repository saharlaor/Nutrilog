// External imports
import React, { useState } from "react";

// Components
import Input from "../Input/Input";

// CSS
import "./FoodLog.css";

function FoodLog() {
  const [term, setTerm] = useState("");
  const [amount, setAmount] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const timeoutToken = setTimeout(() => {
      getOptions();
    }, 500);
    return () => {
      clearTimeout(timeoutToken);
    };
  }, [term]);

  const handleFoodChange = (newTerm) => {
    setTerm(newTerm);
  };

  const handleAmountChange = (newAmount) => {
    setAmount((prevAmount) => (newAmount >= 0 ? newAmount : prevAmount));
  };

  const getOptions = async () => {
    // return [{ label: "Test", value: "test" }];
    console.log(`term`, term);
    try {
      const {
        data: { foods },
      } = await foodApi.get("foods/search", {
        params: {
          query: term,
        },
      });
      // console.log(`foods`, foods);
      setOptions(
        foods.map((food) => {
          return { label: food.description, value: food.fdcId };
        })
      );
    } catch (err) {
      console.log(err);
      setOptions(["There seems to be a problem..."]);
    }
  };

  return (
    <div className="FoodLog">
      <h2>Food Log</h2>
      <div className="FoodLog__inputs">
        <Input
          title="food item"
          type="autocomplete"
          value={term}
          changeHandler={handleFoodChange}
          options={term ? options : []}
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
