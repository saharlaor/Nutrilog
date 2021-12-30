import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="NavBar">
      <Link to="/">Overview</Link>
      <Link to="/food">Food Log</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}

export default NavBar;
