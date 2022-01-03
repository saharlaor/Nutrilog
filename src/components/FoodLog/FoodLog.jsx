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

function FoodLog() {
  const [nutrients, setNutrients] = useState({
    protein: { amount: 0, units: "G" },
    fat: { amount: 0, units: "G" },
    carbs: { amount: 0, units: "G" },
    energy: { amount: 0, units: "KCAL" },
  });
  const [selectedFood, setSelectedFood] = useState({
    name: "",
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

      getOptions();
    }, 500);
    return () => {
      clearTimeout(timeoutToken);
    };
  }, [term]);

  useEffect(() => {
    // Deep copy protein, fat, carbs, energy, for recalculation of nutrients
    const { protein, fat, carbs, energy } = JSON.parse(
      JSON.stringify(selectedFood)
    );

    protein.amount = ((protein.amount * amount) / 100).toFixed(2);
    fat.amount = ((fat.amount * amount) / 100).toFixed(2);
    carbs.amount = ((carbs.amount * amount) / 100).toFixed(2);
    energy.amount = ((energy.amount * amount) / 100).toFixed(2);

    setNutrients({ protein, fat, carbs, energy });
  }, [amount, selectedFood]);

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
    setSelectedFood({
      ...parseSelectedFood(data.foodNutrients),
      name: data.description,
    });
    const nutrientsObj = parseNutrients(data.foodNutrients);
    console.log(`nutrientsObj`, nutrientsObj); // TODO: delete
    setNutrients(nutrientsObj);
  };

  const parseSelectedFood = (data) => {
    return data.reduce((accNutrients, nutrient) => {
      accNutrients[NUTRIENT_CODES[nutrient.number]] = {
        amount: (nutrient.amount / 100) * 100,
        units: nutrient.unitName,
      };
      return accNutrients;
    }, {});
  };

  const parseNutrients = (data) => {
    return data.reduce((accNutrients, nutrient) => {
      accNutrients[NUTRIENT_CODES[nutrient.number]] = {
        amount: (nutrient.amount / 100) * amount,
        units: nutrient.unitName,
      };
      return accNutrients;
    }, {});
  };

  const displayNutrients = () => {
    return Object.entries(nutrients).map((nutrient) => {
      return (
        <div
          key={
            nutrient[0]
          }>{`${nutrient[0]}: ${nutrient[1].amount} ${nutrient[1].units}`}</div>
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
          autoFocus
          changeHandler={handleFoodChange}
          selectHandler={handleFoodSelect}
        />
        <Input
          title="amount (G)"
          type="number"
          value={amount}
          changeHandler={handleAmountChange}
        />
      </div>
      <div className="nutrient-display">
        <h3>{selectedFood.name}</h3>
        {displayNutrients()}
      </div>
    </div>
  );
}

export default FoodLog;
