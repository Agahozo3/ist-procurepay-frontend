import React, { createContext, useContext, useState } from "react";
import { login as loginApi } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (username, password) => {
    try {
      const res = await loginApi({ username, password });

    
      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
        setUser(res.user);
      }

      return res;
    } catch (err) {
      console.error("Auth login error:", err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
