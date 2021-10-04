import React, { useEffect, useContext, useReducer, useState } from "react";
import { useSession } from "next-auth/client";

interface ContextProps  {

};

const SecurityContext = React.createContext({} as ContextProps);

const SecurityProvider: React.FC = ({ children }: any) => {
  const [session] = useSession();
  const permissions = session?.usuario.perfil.permissoes;
  const [userPermission, setUserPermission] = useState<boolean>(true)
  const [profilePermission, setProfilePermission] = useState<boolean>(false)
  const [nfePermission, setNfePermission] = useState<boolean>(false)
  const [ctePermission, setCtePermission] = useState<boolean>(false)
  const [nfsePermission, setNfsePermission] = useState<boolean>(false)
  const [entrancePermission, setEntrancePermission] = useState<boolean>(false)
 


// const getPermission = () => {

// }

// useEffect(() => {
//   getPermission()
// }, [])
  

  return <SecurityContext.Provider value="value">{children}</SecurityContext.Provider>;
};

export const useSecurityContext = () => {
  return useContext(SecurityContext);
};

export { SecurityContext, SecurityProvider }
