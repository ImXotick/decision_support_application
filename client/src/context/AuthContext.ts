// src/context/AuthContext.ts
import { createContext } from "react";

interface AuthContextType {
  isAuthorized: boolean;
  checkAuth: () => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
