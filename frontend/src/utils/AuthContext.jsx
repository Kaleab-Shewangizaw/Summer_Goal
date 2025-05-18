import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/api/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.userData) {
          setUser(data.userData);
          console.log("User data:", data.userData);
        } else {
          setUser(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
