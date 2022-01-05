import React, { useCallback, useEffect, useState } from "react";
import Detail from "./Detail/Detail";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  useEffect(() => {
    console.log(`user`, user);
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleChange = useCallback((key, val) => {
    console.log(`val`, val);
    console.log(`key`, key);
    setUser((prevUser) => {
      return {
        ...prevUser,
        [key]: val,
      };
    });
  }, []);

  return (
    <div className="Profile">
      <h2>Profile</h2>
      <div className="Profile__details">
        <span>Name: {user.name || ""}</span>
        <Detail
          title="Height"
          type="number"
          currDetail={user.height}
          changeHandler={handleChange}
        />
        <Detail
          title="Weight"
          type="number"
          currDetail={user.weight}
          changeHandler={handleChange}
        />
        <Detail
          title="Gender"
          type="autocomplete"
          options={[
            { label: "male", value: "male" },
            { label: "female", value: "female" },
            { label: "other", value: "other" },
          ]}
          currDetail={user.gender}
          changeHandler={handleChange}
          selectHandler={handleChange}
          // selectHandler={handleGenderSelect}
        />
      </div>
    </div>
  );
}

export default Profile;
