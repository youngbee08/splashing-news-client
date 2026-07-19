import { createContext, useContext } from "react";
import type { UserContextType } from "../types/generalTypes";

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};