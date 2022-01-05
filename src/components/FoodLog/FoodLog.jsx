// External imports
import React, { useEffect, useState } from "react";

// Components
import Input from "../Input/Input";
import foodApi from "../../api/foodApi";

// CSS
import "./FoodLog.css";
import NutrientDisplay from "../NutrientDisplay/NutrientDisplay";
import Graph from "../Graph/Graph";
// import Graph from "../Graph/Graph";

const NUTRIENT_CODES = {
  203: "protein",
  204: "fat",
  205: "carbs",
  208: "energy",
};

function getTimestamp() {
  return new Date().toISOString().substring(0, 10).split("-").join("");
}

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
  const [foodHistory, setFoodHistory] = useState(
    JSON.parse(localStorage.getItem("foodHistory")) || {}
  );

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

  useEffect(() => {
    localStorage.setItem("foodHistory", JSON.stringify(foodHistory));
  }, [foodHistory]);

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
    setTerm("");
  };

  const handleSubmitClick = () => {
    // Create a timestamp by day
    const timestamp = getTimestamp();
    let todayHistory = JSON.parse(JSON.stringify(foodHistory));
    todayHistory = {
      ...todayHistory,
      [timestamp]: todayHistory[timestamp]
        ? [
            ...todayHistory[timestamp],
            { ...nutrients, name: selectedFood.name },
          ]
        : [{ ...nutrients, name: selectedFood.name }],
    };
    setFoodHistory(todayHistory);
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

  const getDailyNutrients = () => {
    const timestamp = getTimestamp();
    const historyCopy = JSON.parse(JSON.stringify(foodHistory));
    const todayHistory = historyCopy[timestamp] ? historyCopy[timestamp] : [];

    // Make a single object with the day's nutrient intake
    return todayHistory
      ? todayHistory.reduce(
          (accNutrients, item) => {
            return Object.keys(accNutrients).reduce((obj, nutrient) => {
              return {
                ...obj,
                [nutrient]: {
                  amount:
                    parseInt(accNutrients[nutrient].amount) +
                    parseInt(item[nutrient].amount),
                  units: accNutrients[nutrient].units,
                },
              };
            }, {});
          },
          {
            protein: { amount: 0, units: "G" },
            fat: { amount: 0, units: "G" },
            carbs: { amount: 0, units: "G" },
            energy: { amount: 0, units: "KCAL" },
          }
        )
      : {
          protein: { amount: 0, units: "G" },
          fat: { amount: 0, units: "G" },
          carbs: { amount: 0, units: "G" },
          energy: { amount: 0, units: "KCAL" },
        };
  };

  const getDailyNutrientsGraphData = (nutrient, color) => {
    const dailyNutrients = getDailyNutrients();
    const data = {
      labels: ["Consumed", "Recommended"],
      datasets: [
        {
          data: [
            dailyNutrients[nutrient].amount,
            calculateNutrientRecommendation(nutrient),
          ],
          backgroundColor: [color, "purple"],
          borderWidth: 4,
        },
      ],
    };
    return data;
    // data: {labels: ["your x axis tags"],
    // datasets: [{label: "line name", data: ["your data points (Number)"], backgroundColor: ["colors of data points"], borderWidth: "line thickness"}]}
  };

  const calculateNutrientRecommendation = (nutrient) => {
    const { weight, gender } = JSON.parse(localStorage.getItem("user"));
    switch (nutrient) {
      case "carbs":
        return weight * 4;
      case "protein":
        return weight;
      case "fat":
        return weight * 0.5;
      case "energy":
        return weight * (gender === "male" ? 35 : 30);

      default:
        console.log(`Unexpected nutrient ${nutrient}`);
        break;
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
          options={term ? options : []}
          autoFocus
          changeHandler={handleFoodChange}
          selectHandler={handleFoodSelect}
        />
      </div>
      <div className="nutrient-display">
        <NutrientDisplay
          title="Daily Nutrients"
          nutrients={getDailyNutrients()}
        />
        <NutrientDisplay title={selectedFood.name} nutrients={nutrients} />
        <div className="nutrient-display__inputs">
          <Input
            title="amount (G)"
            type="number"
            value={amount}
            changeHandler={handleAmountChange}
          />
          <button onClick={handleSubmitClick}>OK</button>
        </div>
      </div>
      <div className="FoodLog__graphs">
        <Graph
          data={getDailyNutrientsGraphData("protein", "green")}
          type="bar"
        />
        <Graph data={getDailyNutrientsGraphData("fat", "yellow")} type="bar" />
        <Graph data={getDailyNutrientsGraphData("carbs", "red")} type="bar" />
        <Graph data={getDailyNutrientsGraphData("energy", "blue")} type="bar" />
      </div>
    </div>
  );
}

export default FoodLog;
