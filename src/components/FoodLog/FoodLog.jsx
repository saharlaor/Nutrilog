// External imports
import React, { useEffect, useState } from "react";

// Components
import Input from "../Input/Input";
import foodApi from "../../api/foodApi";

// CSS
import "./FoodLog.css";

const NUTRIENT_CODES = {
  203: "protein",
  204: "fat",
  205: "carbs",
  208: "energy",
};

function parseNutrients(data) {
  return data.foodNutrients.reduce((accNutrients, nutrient) => {
    accNutrients[NUTRIENT_CODES[nutrient.number]] = {
      amount: nutrient.amount,
      units: nutrient.unitName,
    };
    return accNutrients;
  }, {});
}

function FoodLog() {
  const [nutrients, setNutrients] = useState({
    protein: { amount: 0, units: "G" },
    fat: { amount: 0, units: "G" },
    carbs: { amount: 0, units: "G" },
    energy: { amount: 0, units: "KCAL" },
  });
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

  const handleFoodSelect = async (value) => {
    console.log("Handling food selection");
    const { data } = await foodApi.get(`food/${value}`, {
      params: {
        format: "abridged",
        nutrients: Object.keys(NUTRIENT_CODES).join(","),
      },
    });
    console.log(`data`, data); // TODO: delete
    const nutrientsObj = parseNutrients(data);
    console.log(`nutrientsObj`, nutrientsObj); // TODO: delete
    setNutrients(nutrientsObj);
  };

  const getOptions = async () => {
    console.log(`term`, term); // TODO: delete
    try {
      const {
        data: { foods },
      } = await foodApi.get("foods/search", {
        params: {
          query: term,
        },
      });
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

  const displayNutrients = () => {
    return Object.entries(nutrients).map((nutrient) => {
      return (
        <div>{`${nutrient[0]}: ${nutrient[1].amount} ${nutrient[1].units}`}</div>
      );
    });
  };

  return (
    <div className="FoodLog">
      <h2>Food Log</h2>
      <div className="FoodLog__inputs">
        <Input
          title="food item"
          type="autocomplete"
          value={term}
          options={term ? options : []}
          changeHandler={handleFoodChange}
          selectHandler={handleFoodSelect}
        />
        <Input
          title="amount"
          type="number"
          value={amount}
          changeHandler={handleAmountChange}
        />
      </div>
      <div className="nutrient-display">{displayNutrients()}</div>
    </div>
  );
}

export default FoodLog;
