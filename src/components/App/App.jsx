// External imports
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import FoodLog from "../FoodLog/FoodLog";
import NavBar from "../NavBar/NavBar";
import Overview from "../Overview/Overview";
import Profile from "../Profile/Profile";

// CSS
import "./App.css";

function App() {
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
