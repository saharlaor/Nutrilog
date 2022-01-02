import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import Logo from "../../assets/img/nutrilog_logo.png";
import "./NavBar.css";

const MenuItem = Menu.Item;

function NavBar() {
  return (
    <Menu mode="horizontal" theme="dark" className="NavBar">
      <MenuItem key="logo">
        <Link to="/">
          <img src={Logo} alt="Nutrilog" />
        </Link>
      </MenuItem>

      <div className="NavBar__items">
        <MenuItem key="overview">
          <Link to="/">Overview</Link>
        </MenuItem>
        <MenuItem key="food">
          <Link to="/food">Food Log</Link>
        </MenuItem>
        <MenuItem key="profile">
          <Link to="/profile">Profile</Link>
        </MenuItem>
      </div>
    </Menu>
  );
}

export default NavBar;
