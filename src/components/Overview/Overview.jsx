import React, { useEffect, useState } from "react";
import "./Overview.css";

import Logo from "../../assets/img/nutrilog_logo.png";
import Graph from "../Graph/Graph";

// function getTimestamp() {
//   return new Date().toISOString().substring(0, 10).split("-").join("");
// }

const EMPTY_NUTRIENT_OBJECT = {
  protein: 0,
  fat: 0,
  carbs: 0,
  energy: 0,
};

function Overview() {
  const [dailyNutrients, setDailyNutrients] = useState({});

  useEffect(() => {
    const foodHistory = JSON.parse(localStorage.getItem("foodHistory")) || {};
    foodHistory && setDailyNutrients(getDailyNutrients(foodHistory));
  }, []);

  const getDailyNutrients = (foodHistory) => {
    const historyCopy = JSON.parse(JSON.stringify(foodHistory));
    // const todayHistory = historyCopy[timestamp] ? historyCopy[timestamp] : [];

    // Create an array sorted by days of last 31 days
    const historyArr = Object.entries(historyCopy)
      .sort((a, b) => a[0] - b[0])
      .slice(0, 31);
    // Make an array of objects with everyday's nutrient intake
    return historyArr.reduce((days, day) => {
      // console.log(`day`, day);
      const dayNutrients = day
        ? day[1].reduce((accNutrients, item) => {
            // console.log(`item`, item);
            console.log(`accNutrients`, accNutrients);
            return Object.keys(accNutrients).reduce((acc, nutrient) => {
              // console.log(`acc`, acc);
              // console.log(`nutrient`, nutrient);
              // console.log(`item[nutrient]`, item[nutrient]);

              return {
                ...acc,
                [nutrient]:
                  parseInt(accNutrients[nutrient]) +
                  parseInt(item[nutrient].amount),
              };
            }, {});
          }, EMPTY_NUTRIENT_OBJECT)
        : EMPTY_NUTRIENT_OBJECT;
      console.log(`dayNutrients`, dayNutrients);
      return { ...days, [day[0]]: dayNutrients };
    }, {});
  };

  const parseNutrients = (requestedNutrient) => {
    console.log("dailyNutrients", dailyNutrients);
    return Object.values(dailyNutrients).reduce(
      (acc, nutrients) => [...acc, nutrients[requestedNutrient]],
      []
    );
  };

  const generateGraphData = (nutrientArr, color, nutrientName) => {
    console.log(nutrientArr, color, nutrientName);
    return {
      labels: Object.keys(nutrientArr),
      datasets: [
        {
          label: nutrientName,
          data: Object.values(nutrientArr),
          backgroundColor: [color],
          borderWidth: 4,
        },
      ],
    };
  };

  return (
    <div className="Overview">
      <div className="Overview__logo">
        <img src={Logo} alt="Nutrilog" />
      </div>
      <div className="graphs">
        <Graph
          data={generateGraphData(
            parseNutrients("protein"),
            "green",
            "protein"
          )}
        />
        <Graph
          data={generateGraphData(parseNutrients("fat"), "yellow", "fat")}
        />
        <Graph
          data={generateGraphData(parseNutrients("carbs"), "red", "carbs")}
        />
        <Graph
          data={generateGraphData(parseNutrients("energy"), "blue", "energy")}
        />
      </div>
    </div>
  );
}

export default Overview;
