"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode
} from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <GlobalContext.Provider value={{ accessToken, setAccessToken}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
