import React, { useEffect, useContext, useReducer, useState, useMemo } from "react";
import { useSession } from "next-auth/client";
import { useToasts} from "@geist-ui/react";

interface ContextProps  {
nfePermission: boolean;
nfeHistoricalPermission: boolean;
nfeAwarePermission: boolean;
nfeConfirmPermission: boolean;
nfeUnawarePermission: boolean;
nfeUnauthorizedPermission: boolean;
ctePermission: boolean;
cteHistoricalPermission: boolean;
nfsePermission: boolean;
profilePermission: boolean;
profileUpdatePermission: boolean;
profileDeletePermission: boolean;
userPermission: boolean;
userUpdatePermission: boolean;
userDeletePermission: boolean;
entrancePermission: boolean;
// test: any[]
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
  const [nfeAwarePermission, setNfeAwarePermission] = useState<boolean>(false)
  const [nfeConfirmPermission, setNfeConfirmPermission] = useState<boolean>(false)
  const [nfeUnawarePermission, setNfeUnawarePermission] = useState<boolean>(false)
  const [nfeUnauthorizedPermission, setNfeUnauthorizedPermission] = useState<boolean>(false)
  const [ctePermission, setCtePermission] = useState<boolean>(false)
  const [cteHistoricalPermission, setCteHistoricalPermission] = useState<boolean>(false)
  const [nfsePermission, setNfsePermission] = useState<boolean>(false)
  const [entrancePermission, setEntrancePermission] = useState<boolean>(false)
  const [profilePermission, setProfilePermission] = useState<boolean>(false)
  const [profileUpdatePermission, setProfileUpdatePermission] = useState<boolean>(false)
  const [profileDeletePermission, setProfileDeletePermission] = useState<boolean>(false)
  const [userPermission, setUserPermission] = useState<boolean>(false)
  const [userUpdatePermission, setUserUpdatePermission] = useState<boolean>(false)
  const [userDeletePermission, setUserDeletePermission] = useState<boolean>(false)
  const [, setToast] = useToasts();

  // const [newPermissions, setNewPermissions] = useState({
  //   visualizar: false,
  //   historico: false,
  //   ciencia: false,
  //   confirmar: false,
  //   desconhecimento: false,
  //   op_nao_realizada: false
  // })

  // console.log(`newPermissions`, newPermissions)
 

   const getPermissions = async () => {
     try {
      const data = session?.usuario.perfil.permissoes;
      //  console.log("inside permission", data)
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
      setNfeAwarePermission(Boolean(permissions?.find((item) => item.categoria === "NFE" && item.acao === "CIENCIA")))
      setNfeConfirmPermission(Boolean(permissions?.find((item) => item.categoria === "NFE" && item.acao === "CONFIRMACAO")))
      setNfeUnawarePermission(Boolean(permissions?.find((item) => item.categoria === "NFE" && item.acao === "DESCONHECIMENTO")))
      setNfeUnauthorizedPermission(Boolean(permissions?.find((item) => item.categoria === "NFE" && item.acao === "OPERACAO_NAO_REALIZADA")))
      setCtePermission(Boolean(permissions?.find((item) => item.categoria === "CTE" && item.acao === "VISUALIZAR")))
      setCteHistoricalPermission(Boolean(permissions?.find((item) => item.categoria === "CTE" && item.acao === "HISTORICO")))
      setNfsePermission(Boolean(permissions?.find((item) => item.categoria === "NFSE" && item.acao === "VISUALIZAR")))
      setProfilePermission(Boolean(permissions?.find((item) => item.categoria === "PERFIS" && item.acao === "ADICIONAR")))
      setProfileUpdatePermission(Boolean(permissions?.find((item) => item.categoria === "PERFIS" && item.acao === "EDITAR")))
      setProfileDeletePermission(Boolean(permissions?.find((item) => item.categoria === "PERFIS" && item.acao === "EXCLUIR")))
      setUserPermission(Boolean(permissions?.find((item) => item.categoria === "USUARIO" && item.acao === "ADICIONAR")))
      setUserUpdatePermission(Boolean(permissions?.find((item) => item.categoria === "USUARIO" && item.acao === "EDITAR")))
      setUserDeletePermission(Boolean(permissions?.find((item) => item.categoria === "USUARIO" && item.acao === "EXCLUIR")))
    }
   },[session, permissions])



  //  const test: any[] = permissions.filter((item) => item.categoria === "NFE")
  //  const test2: string[] = test.map((item) => item.acao)

  //  const util = ['VISUALIZAR', 'HISTORICO', 'CIENCIA', 'CONFRIMACAO', 'DESCONHECIMENTO', 'OPERACAO_NAO_REALIZADA']

  //  function getNfePermissions() {
  //    test.map((item) => {
  //      for(let i = 0; i < util.length; i++){
  //         util[i].includes(item.acao)
  //    }
  //    })
     
  //  }
  
  //  console.log(`test`, test2)

  return <SecurityContext.Provider value={{ 
    nfePermission, nfeHistoricalPermission, ctePermission, 
    cteHistoricalPermission, nfsePermission, userPermission,
    userUpdatePermission, userDeletePermission,  profilePermission, 
     entrancePermission, profileUpdatePermission, profileDeletePermission,
     nfeAwarePermission, nfeConfirmPermission, nfeUnawarePermission, nfeUnauthorizedPermission,
     /* test */
    }}>{children}</SecurityContext.Provider>;
};

export const useSecurityContext = () => {
  return useContext(SecurityContext);
};

export { SecurityContext, SecurityProvider }
