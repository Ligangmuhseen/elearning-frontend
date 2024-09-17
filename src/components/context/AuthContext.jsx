import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [role, setRole] = useState(() => localStorage.getItem("Role")); // Initialize useremail with value from local storage


  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

 

  useEffect(() => {
    if (role) {
      localStorage.setItem("Role", role);
    } else {
      localStorage.removeItem("Role");
    }
  }, [role]);


  // utils/auth.js
const isLoggedIn = () => {
  // Replace "authToken" with the actual key you're using for authentication tokens
  return !!localStorage.getItem("token");
};


 

  const logout = () => {
    setToken(null); // Clear the token
    setRole("");
   
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout,isLoggedIn,role,setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

