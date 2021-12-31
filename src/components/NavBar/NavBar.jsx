import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/img/nutrilog_logo.png";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="NavBar">
      <Link to="/">
        <img src={Logo} alt="Nutrilog" />
      </Link>

      <div>
        <Link to="/">Overview</Link>
        <Link to="/food">Food Log</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}

export default NavBar;
