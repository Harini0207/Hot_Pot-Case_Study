// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import { getCurrentUser, getToken } from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    const token = getToken();
    if (token) {
      const user = getCurrentUser();
      setCurrentUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
