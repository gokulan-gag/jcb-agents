"use client";

import { useState, type PropsWithChildren } from "react";

import { Toaster } from "react-hot-toast";
import { GlobalContext } from "../contexts";

type GlobalProviderProps = PropsWithChildren & {};

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [activeMenuName, setActiveMenuName] = useState<string>("");

  return (
    <GlobalContext.Provider
      value={{
        activeMenuName,
        setActiveMenuName,
      }}
    >
      {" "}
      <Toaster position="top-right" />
      {children}
    </GlobalContext.Provider>
  );
}
