// src/context/AuthProvider.tsx
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

interface DecodedToken {
  exp: number;
}
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  const checkAuth = async (): Promise<boolean> => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      setIsAuthorized(false);
      return false;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration < now) {
        const isRefreshed = await refreshToken();
        setIsAuthorized(isRefreshed);
        return isRefreshed;
      }

      setIsAuthorized(true);
      return true;
    } catch {
      setIsAuthorized(false);
      return false;
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        return true;
      }
    } catch (error) {
      console.error(error);
    }

    return false;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setIsAuthorized(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
