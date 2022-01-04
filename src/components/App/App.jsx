// External imports
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Components
import FoodLog from "../FoodLog/FoodLog";
import NavBar from "../NavBar/NavBar";
import Overview from "../Overview/Overview";
import Profile from "../Profile/Profile";
import { authentication } from "../../auth/auth";

// CSS
import "./App.css";

function App() {
  const userContext = createContext();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const {
        user: { displayName, uid },
      } = await signInWithPopup(authentication, provider);
      setUser({ displayName, uid });
      localStorage.setItem("user", JSON.stringify({ displayName, uid }));
    } catch (err) {
      console.dir(err);
      setTimeout(() => {
        signIn();
      }, 5000);
    }
  };
  if (!user) {
    signIn();
    return <div className="App">Sign in</div>;
  }
  return (
    <userContext.Provider value={user}>
      <div className="App">
        <Router>
          {/* <button onClick={signIn}>sign in</button> */}
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Overview />} />
            <Route exact path="/food" element={<FoodLog />} />
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </div>
    </userContext.Provider>
  );
}

export default App;
