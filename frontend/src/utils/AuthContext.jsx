import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.userData) {
          setUser(data.userData);
          console.log(data.userData);
        } else {
          setUser(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, []);
  const id = user ? user._id : null;
  return (
    <UserContext.Provider value={{ user, setUser, userInfo, setUserInfo, id }}>
      {children}
    </UserContext.Provider>
  );
};
