import { createContext } from "react";

type GlobalContextType = {
  activeMenuName: string;
  setActiveMenuName: React.Dispatch<React.SetStateAction<string>>;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);
