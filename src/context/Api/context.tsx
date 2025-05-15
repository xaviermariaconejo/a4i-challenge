import { createContext } from "react";

export interface ApiContextType {
  key: string;
  setKey: (newKey: string) => void;
}

export const ApiContext = createContext<ApiContextType | null>(null);
