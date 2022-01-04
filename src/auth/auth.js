import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { createContext, useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAtizsNFkwTW8ERX8so21n3SKVmXkQDfzM",
  authDomain: "nutrilog-e33cc.firebaseapp.com",
  projectId: "nutrilog-e33cc",
  storageBucket: "nutrilog-e33cc.appspot.com",
  messagingSenderId: "683822096664",
  appId: "1:683822096664:web:70c0a060fd0c00cca07e6d",
  measurementId: "G-1FDJTLGF16",
};
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);

// export const authContext = createContext();
// export const authProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     app.auth().onAuthStateChanged(setCurrentUser);
//   }, []);

//   return (
//     <authContext.Provider  value={{ currentUser }}>
//       {children}
//     </authContext.Provider>
//   );
// };
