import React, { useEffect, useContext, useReducer, useState } from "react";
import { useSession } from "next-auth/client";

interface ContextProps  {
permissions: Permissions
};

interface Permissions {
  categoria: string;
  acao: string
}

const SecurityContext = React.createContext({} as ContextProps);

const SecurityProvider: React.FC = ({ children }: any) => {
  const [session] = useSession();
  const [permissions, setPermissions] = useState<Permissions[]>([])
  const [userPermission, setUserPermission] = useState<boolean>(true)
  const [profilePermission, setProfilePermission] = useState<boolean>(false)
  const [nfePermission, setNfePermission] = useState<boolean>(false)
  const [ctePermission, setCtePermission] = useState<boolean>(false)
  const [nfsePermission, setNfsePermission] = useState<boolean>(false)
  const [entrancePermission, setEntrancePermission] = useState<boolean>(false)
 
  // console.log("contextest:",permissions)
  // console.log("context:",permissions)
  
  // const getPrimaryPermissions = () => {
  //  const nfe = permissions.filter((item) => item.categoria === "NFE" && item.acao === "VISUALIZAR")
  //  const cte = permissions.filter((item) => item.categoria === "CTE" && item.acao === "VISUALIZAR")
  //  const nfse = permissions.filter((item) => item.categoria === "NFSE" && item.acao === "VISUALIZAR") 
  //  const usuario = permissions.filter((item) => item.categoria === "USUARIO" && item.acao === "VISUALIZAR")
  //  const perfil = permissions.filter((item) => item.categoria === "PERFIS" && item.acao === "VISUALIZAR")
  //  const portaria = permissions.filter((item) => item.categoria === "PORTARIA" && item.acao === "VISUALIZAR")
  //  if(nfe) {
  //    console.log("iihhhhh");
     
  //  }
  //  return nfe
  // }
  


//   useEffect(() => {
//    const getPermissions: any = session?.usuario.perfil.permissoes;
//    setPermissions(getPermissions);
//    getPrimaryPermissions()
//  }, [])
  

  return <SecurityContext.Provider value="value">{children}</SecurityContext.Provider>;
};

export const useSecurityContext = () => {
  return useContext(SecurityContext);
};

export { SecurityContext, SecurityProvider }
