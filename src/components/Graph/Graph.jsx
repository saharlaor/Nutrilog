// External
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Graph({ data, type }) {
  return (
    <div className="Graph">
      {type === "line" ? (
        <Line data={data} options={{ responsive: true }} />
      ) : (
        <Bar data={data} options={{ responsive: true }} />
      )}
    </div>
  );
}

export default Graph;
