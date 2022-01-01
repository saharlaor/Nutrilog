import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import Logo from "../../assets/img/nutrilog_logo.png";
import "./NavBar.css";

const MenuItem = Menu.Item;

function NavBar() {
  return (
    <Menu mode="horizontal" className="NavBar">
      <MenuItem>
        <Link to="/">
          <img src={Logo} alt="Nutrilog" />
        </Link>
      </MenuItem>

      <div className="NavBar__items">
        <MenuItem>
          <Link to="/">Overview</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/food">Food Log</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/profile">Profile</Link>
        </MenuItem>
      </div>
    </Menu>
  );
}

export default NavBar;
