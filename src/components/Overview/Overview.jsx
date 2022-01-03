import React from "react";
import "./Overview.css";

import Logo from "../../assets/img/nutrilog_logo.png";

function Overview() {
  return (
    <div className="Overview">
      <div className="Overview__logo">
        <img src={Logo} alt="Nutrilog" />
      </div>
    </div>
  );
}

export default Overview;
