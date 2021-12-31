// External imports
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import foodApi from "../../api/foodApi";

// Components
import FoodLog from "../FoodLog/FoodLog";
import NavBar from "../NavBar/NavBar";
import Overview from "../Overview/Overview";
import Profile from "../Profile/Profile";

// CSS
import "./App.css";

function App() {
  foodApi
    .get("foods/search", {
      params: {
        query: "apple",
        pageSize: 2,
      },
    })
    .then(({ data }) => console.log(data));

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Overview />} />
          <Route exact path="/food" element={<FoodLog />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
