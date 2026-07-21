import { createContext, useContext } from "react";
import type { PostContextType } from "../types/generalTypes";

export const PostContext = createContext<PostContextType | undefined>(
  undefined,
);

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
