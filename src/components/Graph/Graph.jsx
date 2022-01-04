// External
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// CSS
import "./Graph.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Graph({ data }) {
  // data: {labels: ["your x axis tags"],
  // datasets: [{label: "line name", data: ["your data points (Number)"], backgroundColor: ["colors of data points"], borderWidth: "line thickness"}]}
  const [chartData, setChartData] = useState(data);
  console.log(`data`, data);
  return (
    <div className="Graph">
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
}

export default Graph;
