import { useContext } from "react";
import { GlobalContext } from "../contexts";

export function useGlobal() {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("useGlobal must be used within an Global Provider");
  }
  return context;
}
