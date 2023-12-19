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
  const [loader, setLoader] = useState(false);
  const [guac, setGuac] = useState(0);
  const [rfc, setRefreshGuac] = useState(false);

  const refreshGuac = () => {
    setRefreshGuac(prev => !prev);
  }

  return (
    <GlobalContext.Provider value={{ loader, setLoader, guac, setGuac, rfc , refreshGuac}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
