import React, { useEffect, useContext, useReducer } from "react";
import { useSession } from "next-auth/client";

interface ContextProps  {};

const SecurityContext = React.createContext({} as ContextProps);

const SecurityProvider: React.FC = ({ children }: any) => {
  const session = useSession()
  

  return <SecurityContext.Provider value="value">{children}</SecurityContext.Provider>;
};

export const useSecurityContext = () => {
  return useContext(SecurityContext);
};

export { SecurityContext, SecurityProvider }
