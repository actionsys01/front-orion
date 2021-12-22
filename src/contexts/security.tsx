import React, { useEffect, useContext, useCallback, useState, useMemo } from "react";
import { useSession } from "next-auth/client";
import { useToasts} from "@geist-ui/react";
import { tripleLabels, entranceLabels, middlePermissions} from "@utils/permissions-labels"

interface ContextProps  {
nfePermission: boolean;
nfeHistoricalPermission: boolean;
nfeAwarePermission: boolean;
nfeConfirmPermission: boolean;
nfeUnawarePermission: boolean;
nfeUnauthorizedPermission: boolean;
ctePermission: boolean;
cteHistoricalPermission: boolean;
nfsePermissions: NewPermissions;
entrancePermissions: NewPermissions;
cnpjPermissions: NewPermissions;
userPermissions: NewPermissions;
profilePermission: NewPermissions;
certificatePermissions: NewPermissions;
};

interface Permissions {
categoria: string;
acao: string

}

interface NewPermissions {
[key: string] : boolean
}

const initialState = {
'VISUALIZAR': false,
'HISTORICO': false,
'CIENCIA': false,
'CONFIRMACAO': false,
'DESCONHECIMENTO': false,
'OPERACAO_NAO_REALIZADA': false
}

const initial = {
  "ADICIONAR": false,
  "EXCLUIR": false,
  "EDITAR": false
}

const initialStateEntrada = {
  "ADICIONAR": false,
  "CANCELAR": false,
  "AUTORIZAR": false,
  "VISUALIZAR": false,
  "EDITAR": false
}

const initialStateB = {
  'VISUALIZAR': false,
  'HISTORICO': false,
  'IMPRIMIR': false
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
const [, setToast] = useToasts();

const [ profilePermission, setProfilePermission ] = useState({...initial})
const [ cnpjPermissions, setCnpjPermissions ] = useState({...initial})
const [ userPermissions, setUserPermissions ] = useState({...initial})
const [ certificatePermissions, setCertificatePermissions ] = useState({...initial})
const [ nfsePermissions, setNfseePermissions ] = useState({...initialStateB})
const [ entrancePermissions, setEntrancePermissions ] = useState({...initialStateEntrada})

// console.log(`newPermissions pt I`, newPermissions)


const getPermissions = async () => {
  try {
    const data = session?.usuario.perfil.permissoes;
    //  console.log("inside permission", data)
    setPermissions(data)
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
    getPermissions()/* .then(response => setPermissions(response)) */
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
  }
},[session, permissions])

function getUserPermissions() {
  if(permissions) {
    const cnpjPermissionCheck: any[] = permissions?.filter((item) => item.categoria === "CNPJS").map((permit) => permit.acao)
    verifyPermissions(cnpjPermissionCheck, 'cnpj')
    const userPermissionCheck: any[] = permissions?.filter((item) => item.categoria === "USUARIO").map((permit) => permit.acao)
    verifyPermissions(userPermissionCheck, "usuario")
    const profileCheck: any[] = permissions?.filter((item) => item.categoria === "PERFIS").map((permit) => permit.acao)
      profileCheck && verifyPermissions(profileCheck, 'perfis')
    const certificateCheck: any[] = permissions?.filter((item) => item.categoria === "CERTIFICADO").map((permit) => permit.acao)
      certificateCheck && verifyPermissions(certificateCheck, 'certificado')
    const entranceCheck: any[] = permissions?.filter((item) => item.categoria === "ENTRADA").map((permit) => permit.acao)
      entranceCheck && verifyFurtherPermissions(entranceCheck, 'entrada')
    const nfseCheck: string [] = permissions?.filter((item) => item.categoria === "NFSE").map((permit) => permit.acao)
      // console.log(`nfseCheck`, nfseCheck)
      nfseCheck && verifyFurtherPermissions(nfseCheck, 'nfse')
  }
} 

  function verifyPermissions(param, type) {
    let currentPermissions
    for(let i = 0; i < param.length; i++){
      currentPermissions = tripleLabels.find((item) => item === param[i])
      // console.log(`currentPermissions`, currentPermissions)
        if(currentPermissions && type === 'cnpj') {
          const permissionsFormatted = cnpjPermissions
              permissionsFormatted[currentPermissions] = true
              setCnpjPermissions(permissionsFormatted)
        }
        if(currentPermissions && type === 'usuario') {
          const permissionsFormatted = userPermissions
              permissionsFormatted[currentPermissions] = true
              setUserPermissions(permissionsFormatted)
        }
        if(currentPermissions && type === 'perfis') {
          const permissionsFormatted = profilePermission
              permissionsFormatted[currentPermissions] = true
              setProfilePermission(permissionsFormatted)
        }
        if(currentPermissions && type === 'certificado') {
          const permissionsFormatted = certificatePermissions
              permissionsFormatted[currentPermissions] = true
              setCertificatePermissions(permissionsFormatted)
        }
        
    }
  }

  function verifyFurtherPermissions(param, type) {
    if(type === 'entrada') {
      let current
      for(let i = 0; i < param.length; i++){
        current = entranceLabels.find((item) => item === param[i])
          if(current) {
            const permissionsFormatted = entrancePermissions
                permissionsFormatted[current] = true
                setEntrancePermissions(permissionsFormatted)
          }
      }
    }
    if(type === 'nfse') {
      let current
      for(let i = 0; i < param.length; i++){
        current = middlePermissions.find((item) => item === param[i])
          if(current) {
            const permissionsFormatted = nfsePermissions
                permissionsFormatted[current] = true
                setNfseePermissions(permissionsFormatted)
          }
      }
    }
  }

useEffect(() => {
  getUserPermissions()
}, [permissions])
// console.log(`nfsePermissions`, nfsePermissions)



return <SecurityContext.Provider value={{ 
  nfePermission, nfeHistoricalPermission, ctePermission, 
  cteHistoricalPermission, entrancePermissions, 
  userPermissions, profilePermission, nfsePermissions,
  nfeAwarePermission, nfeConfirmPermission, nfeUnawarePermission, nfeUnauthorizedPermission,
  cnpjPermissions, certificatePermissions
}}>{children}</SecurityContext.Provider>;
};

export const useSecurityContext = () => {
return useContext(SecurityContext);
};

export { SecurityContext, SecurityProvider }