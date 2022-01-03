import React from "react";
import "./NutrientDisplay.css";

function NutrientDisplay({ title, nutrients }) {
  const displayNutrients = (data) => {
    return Object.entries(data).map((nutrient) => {
      return (
        <div
          key={
            nutrient[0]
          }>{`${nutrient[0]}: ${nutrient[1].amount} ${nutrient[1].units}`}</div>
      );
    });
  };

  return (
    <div className="NutrientDisplay">
      <h3>{title}</h3>
      <hr />
      {displayNutrients(nutrients)}
    </div>
  );
}

export default NutrientDisplay;
