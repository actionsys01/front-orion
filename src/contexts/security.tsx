import React, { useEffect, useContext, useReducer, useState, useMemo } from "react";
import { useSession } from "next-auth/client";
import { useToasts} from "@geist-ui/react";

interface ContextProps  {
nfePermission: boolean;
nfeHistoricalPermission: boolean;
ctePermission: boolean;
cteHistoricalPermission: boolean;
nfsePermission: boolean;
userPermission: boolean;
profilePermission: boolean;
entrancePermission: boolean;
};

interface Permissions {
  categoria: string;
  acao: string

}

const SecurityContext = React.createContext({} as ContextProps);

const SecurityProvider: React.FC = ({ children }: any) => {
  const [session] = useSession();
  const [permissions, setPermissions] = useState<Permissions[]>([])
  const [nfePermission, setNfePermission] = useState<boolean>(false)
  const [nfeHistoricalPermission, setNfeHistoricalPermission] = useState<boolean>(false)
  const [ctePermission, setCtePermission] = useState<boolean>(false)
  const [cteHistoricalPermission, setCteHistoricalPermission] = useState<boolean>(false)
  const [nfsePermission, setNfsePermission] = useState<boolean>(false)
  const [entrancePermission, setEntrancePermission] = useState<boolean>(false)
  const [profilePermission, setProfilePermission] = useState<boolean>(false)
  const [userPermission, setUserPermission] = useState<boolean>(false)
  const [, setToast] = useToasts();
 
  console.log("contextest:",permissions)
  // console.log("context:",permissions)
  // console.log("constext session:",session)
   console.log("nfe H perm:",nfeHistoricalPermission)
   console.log("cte H perm:", cteHistoricalPermission)
  console.log("portaria perm:",entrancePermission)

   const getPermissions = async () => {
     try {
      const data = session?.usuario.perfil.permissoes;
       console.log("inside permission", data)
       return data || []
     } catch (error) {
       setToast({
         text: "Houve um erro, por favor reinicie seu navegador.",
         type: "warning"
        })

        return []
     }
    
   }

    useEffect(() => {
      getPermissions().then(response => setPermissions(response))
      
     
   }, [session])



   useEffect(() => {
     if(permissions) {
      setNfePermission(Boolean(permissions?.find((item) => item.categoria === "NFE" && item.acao === "VISUALIZAR")))
      setNfeHistoricalPermission(Boolean(permissions?.find((item) => item.categoria === "NFE" && item.acao === "HISTORICO")))
      setCtePermission(Boolean(permissions?.find((item) => item.categoria === "CTE" && item.acao === "VISUALIZAR")))
      setCteHistoricalPermission(Boolean(permissions?.find((item) => item.categoria === "CTE" && item.acao === "HISTORICO")))
      setNfsePermission(Boolean(permissions?.find((item) => item.categoria === "NFSE" && item.acao === "VISUALIZAR")))
      setUserPermission(Boolean(permissions?.find((item) => item.categoria === "USUARIO" && item.acao === "ADICIONAR")))
      setProfilePermission(Boolean(permissions?.find((item) => item.categoria === "PERFIS" && item.acao === "ADICIONAR")))
      setEntrancePermission(Boolean(permissions?.find((item) => item.categoria === "PORTARIA" && item.acao === "VISUALIZAR")))
    }
   },[session, permissions])
  


  return <SecurityContext.Provider value={{ nfePermission, nfeHistoricalPermission, ctePermission, cteHistoricalPermission, nfsePermission, userPermission, profilePermission}}>{children}</SecurityContext.Provider>;
};

export const useSecurityContext = () => {
  return useContext(SecurityContext);
};

export { SecurityContext, SecurityProvider }
