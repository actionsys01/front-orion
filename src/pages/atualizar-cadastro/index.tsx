import React, { useMemo, useState, useEffect, useCallback } from "react";
import BotaoVoltar from "@components/BotaoVoltar";
import { Table, ButtonStyle } from "../perfil-cadastro/style";
import { useSession } from "next-auth/client";
import { Spacer } from "@geist-ui/react";
import { Checkbox } from '@material-ui/core';
import * as perfil from "@services/perfis"
import Head from "next/head";
import { ChevronDown, ChevronUp  } from '@geist-ui/react-icons'
import {  useRouter } from "next/router";
import api from "@services/api"
import {useSecurityContext} from "@contexts/security"
import { useToasts} from "@geist-ui/react";
import { tripleLabels, middlePermissions, entranceLabels} from "@utils/permissions-labels"


type ICreateProfile = {
  name: string;
  descricao: string;
  permissions: []
};
type ProfilePermissions = {
    id: number;
    acao: string;
    categoria: string
};

interface CompanyPermissions {
  categoria: string
}

const initialStateA = {
  "ADICIONAR": false,
  "EXCLUIR": false,
  "EDITAR": false
}

const initialStateE = {
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


export default function AtualizarCadastro() {
  const router = useRouter();
  const id_profile = Number(router.query.perfilId);
  const [session] = useSession();
  const [permissions, setPermissions ] = useState<CompanyPermissions[]>([])
  const [profilePermissions, setProfilePermissions] = useState<ProfilePermissions[]>([])
  const [, setToast] = useToasts();
  const {nfePermission, nfeHistoricalPermission, ctePermission,
    cteHistoricalPermission, userPermissions, profilePermission,
    nfeAwarePermission, nfeConfirmPermission, 
    nfeUnawarePermission, nfeUnauthorizedPermission
  } = useSecurityContext()
  // modais
  const [nfeModal, setNfeModal] = useState<boolean>(false)
  const [cteModal, setCteModal] = useState<boolean>(false)
  const [nfseModal, setNfseModal] = useState<boolean>(false)
  const [entranceModal, setEntranceModal] = useState<boolean>(false)
  const [usersModal, setUsersModal] = useState<boolean>(false)
  const [profileModal, setProfileModal] = useState<boolean>(false)
  const [ visible, setVisible] = useState(false)
  const [ certificadoVisible, setCertificadoVisible ] = useState(false)

  const [isNfe, setIsNfe] = useState<boolean>(false)
  const [isCte, setIsCte] = useState<boolean>(false)
  const [profileApp, setProfileApp] = useState<number[]>([])

  const [ isCnpj, setIsCnpj ] = useState({...initialStateA})
  const [ isCertificate, setIsCertificate ] = useState({...initialStateA})
  const [ isUser, setIsUser ] = useState({...initialStateA})
  const [ isProfile, setIsProfile ] = useState({...initialStateA})
  const [ isEntrance, setIsEntrance ] = useState({...initialStateE})
  const [ isNfse, setIsNfse ] = useState({...initialStateB})

  // console.log(id_profile);
 
  //checkbox states
  // nfe
  const [nfeVisualizar, setNfeVizualizar] = useState<boolean>(false)
  const [nfeHistorico, setNfeHistorico] = useState<boolean>(false)
  const [nfeEventoCiencia, setNfeEventoCiencia] = useState<boolean>(false)
  const [nfeEventoConfirmar, setNfeEventoConfirmar] = useState<boolean>(false)
  const [nfeEventoDesconhecimento, setNfeEventoDesconhecimento] = useState<boolean>(false)
  const [nfeEventoNaoRealizado, setNfeEventoNaoRealizado] = useState<boolean>(false)
  // cte
  const [cteVisualizar, setCteVizualizar] = useState<boolean>(false)
  const [cteHistorico, setCteHistorico] = useState<boolean>(false)

const getAllPermissions = async () => {
  const response = await api.get(`/perfil/search/?profile_id=${id_profile}`);
  const data = await response.data.permissoes;
  
  const currentPermissions: any = [];
  data.map((item: any) => currentPermissions.push(item.id))

  setProfilePermissions(data)
  setProfileApp(currentPermissions)
  return currentPermissions
  }

const getPermissions = useMemo(() => {
const permissions: ProfilePermissions[] = [];
 if(profilePermissions) {
   // nfe 
    const visualizarNfe = profilePermissions.find((item) => item.categoria === "NFE" && item.acao === "VISUALIZAR");
    const historicoNfe = profilePermissions.find((item) => item.categoria === "NFE" && item.acao === "HISTORICO")
    const eventoCienciaNfe = profilePermissions.find((item) => item.categoria === "NFE" && item.acao === "CIENCIA")
    const eventoConfirmarNfe = profilePermissions.find((item) => item.categoria === "NFE" && item.acao === "CONFIRMACAO")
    const eventoDesconhecimentoNfe = profilePermissions.find((item) => item.categoria === "NFE" && item.acao === "DESCONHECIMENTO")
    const eventoNaoRealizadoNfe = profilePermissions.find((item) => item.categoria === "NFE" && item.acao === "OPERACAO_NAO_REALIZADA")
    // cte
    const visualizarCte = profilePermissions.find((item) => item.categoria === "CTE" && item.acao === "VISUALIZAR");
    const historicoCte = profilePermissions.find((item) => item.categoria === "CTE" && item.acao === "HISTORICO")
    // nfe check
    if(visualizarNfe){setNfeVizualizar(true)}
    if(historicoNfe){setNfeHistorico(true)}
    if(eventoCienciaNfe) {setNfeEventoCiencia(true)}
    if(eventoConfirmarNfe){setNfeEventoConfirmar(true)}
    if(eventoDesconhecimentoNfe) {setNfeEventoDesconhecimento(true)}
    if(eventoNaoRealizadoNfe) {setNfeEventoNaoRealizado(true)}
    // cte check
    if(visualizarCte){setCteVizualizar(true)}
    if(historicoCte){setCteHistorico(true)}
    }
    return permissions
}, [profilePermissions])

function getUserPermissions() {
  if(profilePermissions) {
    const cnpjPermissionCheck: any[] = profilePermissions?.filter((item) => item.categoria === "CNPJS").map((permit) => permit.acao)
      cnpjPermissionCheck && verifyPermissions(cnpjPermissionCheck, 'cnpj')
    const userPermissionCheck: any[] = profilePermissions?.filter((item) => item.categoria === "USUARIO").map((permit) => permit.acao)
      userPermissionCheck && verifyPermissions(userPermissionCheck, "usuario")
    const profileCheck: any[] = profilePermissions?.filter((item) => item.categoria === "PERFIS").map((permit) => permit.acao)
      profileCheck && verifyPermissions(profileCheck, 'perfis')
    const certificateCheck: any[] = profilePermissions?.filter((item) => item.categoria === "CERTIFICADO").map((permit) => permit.acao)
      certificateCheck && verifyPermissions(certificateCheck, 'certificado')
    const entranceCheck: any[] = profilePermissions?.filter((item) => item.categoria === "ENTRADA").map((permit) => permit.acao)
      entranceCheck && verifyFurtherPermissions(entranceCheck,'entrada')
    const nfseCheck: string [] = profilePermissions?.filter((item) => item.categoria === "NFSE").map((permit) => permit.acao)
      console.log(`nfseCheck`, nfseCheck)
      nfseCheck && verifyFurtherPermissions(nfseCheck, 'nfse')
  }
} 


  function verifyPermissions(param, type) {
    let currentPermissions
    for(let i = 0; i < param.length; i++){
      currentPermissions = tripleLabels.find((item) => item === param[i])
      // console.log(`currentPermissions`, currentPermissions)
        if(currentPermissions && type === 'cnpj') {
          const permissionsFormatted = isCnpj
              permissionsFormatted[currentPermissions] = true
              setIsCnpj(permissionsFormatted)
        }
        if(currentPermissions && type === 'usuario') {
          const permissionsFormatted = isUser
              permissionsFormatted[currentPermissions] = true
              setIsUser(permissionsFormatted)
        }
        if(currentPermissions && type === 'perfis') {
          const permissionsFormatted = isProfile
              permissionsFormatted[currentPermissions] = true
              setIsProfile(permissionsFormatted)
        }
        if(currentPermissions && type === 'certificado') {
          const permissionsFormatted = isCertificate
              permissionsFormatted[currentPermissions] = true
              setIsCertificate(permissionsFormatted)
        }
    }
  }

  function verifyFurtherPermissions(param, type) {
    if(type === 'entrada') {
      let current
      for(let i = 0; i < param.length; i++){
        current = entranceLabels.find((item) => item === param[i])
          if(current) {
            const permissionsFormatted = isEntrance
                permissionsFormatted[current] = true
                setIsEntrance(permissionsFormatted)
          }
      }
    }
    if(type === 'nfse') {
      let current
      for(let i = 0; i < param.length; i++){
        current = middlePermissions.find((item) => item === param[i])
          if(current) {
            const permissionsFormatted = isNfse
                permissionsFormatted[current] = true
                setIsNfse(permissionsFormatted)
          }
      }
    }
  }

  useEffect(() => {
    getUserPermissions() 
  }, [profilePermissions])

  useEffect(() => {
    const dataApp: any =  session?.usuario.empresa.plano.aplicacoes
    setPermissions(dataApp)
    permissions.map((item) => {
      if(item.categoria === "NFE"){
        setIsNfe(true)
      } if (item.categoria === "CTE") {
        setIsCte(true)
      } 
    })
    getAllPermissions();
  }, [permissions])

  

const gatherData = (e: any)  => {

const findProfileApp = profileApp.find(value => value === Number(e))

if (!findProfileApp) {
  setProfileApp(state => [...state, Number(e)])
  return
}
  setProfileApp(state => state.filter(value => value !== e))
}


async function updateProfile() {
  try {
    await perfil.atualizar({id_profile: Number(router.query.perfilId), 
      nome: String(router.query.name), 
      descricao: String(router.query.descricao), 
      permissions: profileApp})
      setToast({
        text: "Perfil atualizado com sucesso",
        type: "success"
      })
  } catch (error) {
    console.log(error);
    setToast({
      text: "Houve um problema, por favor tente novamente",
      type: "warning"
    })
  }
  router.push({pathname: "/perfil-acesso"})
}
const handleNfeModal = useCallback(() => {setNfeModal(!nfeModal)}, [nfeModal])
const handleCteModal = useCallback(() => {setCteModal(!cteModal)}, [cteModal])
const handleNfseModal = useCallback(() => {setNfseModal(!nfseModal)}, [nfseModal])
const handleEntranceModal = useCallback(() => {setEntranceModal(!entranceModal)}, [entranceModal])
const handleUsersModal = useCallback(() => {setUsersModal(!usersModal)}, [usersModal])
const handleProfileModal = useCallback(() => {setProfileModal(!profileModal)}, [profileModal])
const certificadoModalHandler = useCallback(() => {setCertificadoVisible(!certificadoVisible)}, [certificadoVisible])
const modalHandler = useCallback(() => {setVisible(!visible)}, [visible])




  return (
    <>
      <Head>
        <title>Orion | Perfil de Cadastro</title>
      </Head>
      <BotaoVoltar/>
      <h2>Perfil de Cadastro{profileApp} </h2>
      <ButtonStyle>
        <button
            className="btn"
            onClick={updateProfile}
          >
            Confirmar
        </button>
      </ButtonStyle>
        <Spacer y={1} />
        <Table>
          <div className="main">
            <header>
              <span>
                <h5>Aplicação</h5>
                <h5 style={{width: "15%", display: "flex", justifyContent: "flex-end"}}>Descrição</h5>
                <h5></h5>
              </span>
            </header>
            {/* {isNfe  && nfePermission && */}
            <div className="body-row">
                <div onClick={handleNfeModal} style={{cursor: "pointer"}}>
                  <span className="line">
                    <h5>
                      Nf-e
                    </h5>
                  </span>
                  <span className="line">
                    <h5>
                      Painel e Visualização de Nf-e
                    </h5>
                  </span>
                  <span>
                    {!nfeModal ? <ChevronDown  className="icon"/> : <ChevronUp  className="icon"/> }
                  </span>
                </div>
                {nfeModal &&
              <div className='modal'>
                <div >
                  <span>
                    <span><Checkbox  value={1} 
                    checked={nfeVisualizar}  
                    onChange={() => gatherData(1)} 
                    onClick={nfeVisualizar ? ()=> setNfeVizualizar(false) : ()=> setNfeVizualizar(true)}/></span>
                      Visualizar</span>
                    {/* {nfeHistoricalPermission &&  */}
                    <span> 
                      <span><Checkbox value={2} 
                      checked={nfeHistorico} 
                      onChange={() => gatherData(2)} 
                      onClick={nfeHistorico ? ()=> setNfeHistorico(false) : ()=> setNfeHistorico(true)}/></span>
                        Histórico de Notas</span>
                    {/* {nfeAwarePermission &&  */}
                    <span> 
                      <span><Checkbox  
                      checked={nfeEventoCiencia}
                      onChange={() => gatherData(3)} 
                      onClick={nfeEventoCiencia ? ()=> setNfeEventoCiencia(false) : ()=> setNfeEventoCiencia(true)}/></span>
                        Registrar Evento - Ciência da Operação</span>
                    {/* {nfeConfirmPermission &&  */}
                    <span> 
                      <span><Checkbox 
                      checked={nfeEventoConfirmar} 
                      onChange={() => gatherData(4)} 
                      onClick={nfeEventoConfirmar ? ()=> setNfeEventoConfirmar(false) : ()=> setNfeEventoConfirmar(true)}/></span>
                        Registrar Evento - Confirmação da Operação</span>
                    {/* {nfeUnauthorizedPermission &&  */}
                    <span> 
                      <span><Checkbox  
                      checked={nfeEventoNaoRealizado} 
                      onChange={() => gatherData(6)} 
                      onClick={nfeEventoNaoRealizado ? ()=> setNfeEventoNaoRealizado(false) : ()=> setNfeEventoNaoRealizado(true)}/></span>
                        Registrar Evento - Operação Não Realizada</span>
                    {/* {nfeUnawarePermission &&  */}
                    <span> 
                      <span><Checkbox  
                      checked={nfeEventoDesconhecimento} 
                      onChange={() => gatherData(5)} 
                      onClick={nfeEventoDesconhecimento ? ()=> setNfeEventoDesconhecimento(false) : ()=> setNfeEventoDesconhecimento(true)}/></span>
                        Registrar Evento - Desconhecimento da Operação</span>
                </div>
              </div>
          }
            </div>
              {/* } */}
              {isCte &&
                <div className="body-row">
                  <div onClick={handleCteModal}  style={{cursor: "pointer"}}>
                    <span className="line">
                      <h5>
                        Ct-e
                      </h5>
                    </span>
                    <span className="line">
                      <h5>
                        Painel e Visualização de Ct-e
                      </h5>
                    </span>
                    <span>
                      {!cteModal ? <ChevronDown  className="icon"/> : <ChevronUp  className="icon"/>}
                    </span>
                </div>
                {cteModal &&
                  <div className='modal'>
                    <div >
                      <span>
                        <span><Checkbox 
                        checked={cteVisualizar} 
                        onChange={() => gatherData(13)} 
                        onClick={cteVisualizar ? ()=> setCteVizualizar(false) : ()=> setCteVizualizar(true)}/></span>
                        Visualizar</span>
                      <span> 
                        <span><Checkbox 
                        checked={cteHistorico}  
                        onChange={() => gatherData(14)} onClick={cteHistorico ? ()=> setCteHistorico(false) : ()=> setCteHistorico(true)}/></span>
                        Histórico de Notas</span>
                    </div>
                  </div>
                }
                </div>
                }
                {isNfse &&
                <div className="body-row">
                  <div onClick={handleNfseModal} style={{cursor: "pointer"}}>
                    <span className="line">
                      <h5>
                        Nfs-e
                      </h5>
                    </span>
                    <span className="line">
                      <h5>
                        Painel e Visualização de Nfs-e
                      </h5>
                    </span>
                    <span>
                    {!nfseModal ? <ChevronDown   className="icon"/> : <ChevronUp  className="icon"/>}
                    </span>
                </div>
                {nfseModal &&
                <div className='modal'>
                  <div >
                    <span>
                      <span><Checkbox value={10}
                      checked={isNfse.VISUALIZAR}
                      onClick={() => setIsNfse({...isNfse, VISUALIZAR : !isNfse.VISUALIZAR})}
                      onChange={() => gatherData(16)} /></span>
                      Visualizar</span>
                    <span> 
                      <span><Checkbox value={11} 
                      checked={isNfse.HISTORICO}
                      onClick={() => setIsNfse({...isNfse, HISTORICO : !isNfse.HISTORICO})}
                      onChange={() => gatherData(17)} /></span>
                      Histórico de Notas</span>
                    <span> 
                      <span><Checkbox value={12} 
                      checked={isNfse.IMPRIMIR}
                      onClick={() => setIsNfse({...isNfse, IMPRIMIR : !isNfse.IMPRIMIR})}
                      onChange={() => gatherData(18)} /></span>
                      Imprimir Notas</span>
                  </div>
                </div>
                } 
                </div>
                }
                <div className="body-row">
                  <div onClick={handleEntranceModal} style={{cursor: "pointer"}}>
                    <span className="line">
                      <h5>
                        Portaria
                      </h5>
                    </span>
                    <span className="line">
                      <h5>
                        Painel e Visualização de  Portaria
                      </h5>
                    </span>
                    <span>
                      {!entranceModal ? <ChevronDown   className="icon"/> : <ChevronUp  className="icon"/>}
                    </span>
                  </div>
                {entranceModal &&
                  <div className='modal'>
                    <div >
                      <span>
                        <span><Checkbox value={19} 
                        checked={isEntrance.VISUALIZAR}
                        onChange={() => gatherData(19)} 
                        onClick={() => setIsEntrance({...isEntrance, VISUALIZAR : !isEntrance.VISUALIZAR})} /></span>
                          Visualizar</span>
                      <span> 
                        <span><Checkbox value={20} 
                        checked={isEntrance.AUTORIZAR}
                        onChange={() => gatherData(20)} 
                        onClick={() => setIsEntrance({...isEntrance, AUTORIZAR : !isEntrance.AUTORIZAR})}  /></span>
                          Autorizar</span>
                        <span> 
                        <span><Checkbox value={21} 
                        checked={isEntrance.EDITAR}
                        onChange={() => gatherData(21)} 
                        onClick={() => setIsEntrance({...isEntrance, EDITAR : !isEntrance.EDITAR})}  /></span>
                          Editar</span>
                        <span> 
                        <span><Checkbox value={22} 
                        checked={isEntrance.CANCELAR}
                        onChange={() => gatherData(22)} 
                        onClick={() => setIsEntrance({...isEntrance, CANCELAR : !isEntrance.CANCELAR})}  /></span>
                          Cancelar</span>
                        <span> 
                        <span><Checkbox value={23} 
                        checked={isEntrance.ADICIONAR}
                        onChange={() => gatherData(23)} 
                        onClick={() => setIsEntrance({...isEntrance, ADICIONAR : !isEntrance.ADICIONAR})}  /></span>
                          Adicionar</span>
                    </div>
                  </div>}
                </div>
              {/* {profilePermission && */}
                <div className="body-row">
                  <div onClick={handleProfileModal} style={{cursor: "pointer"}}>
                    <span className="line">
                      <h5>
                        Perfis
                      </h5>
                    </span>
                    <span className="line">
                      <h5>
                        Cadastro de Perfis
                      </h5>
                    </span>
                    <span>
                      {!profileModal ? <ChevronDown   className="icon"/> : <ChevronUp className="icon"/>}
                    </span>
                  </div>
                {profileModal &&
                <div className='modal'>
                  <div >
                    <span> 
                      <span><Checkbox checked={isProfile.ADICIONAR}  onChange={() => gatherData(11)} 
                      onClick={() => setIsProfile({...isProfile, ADICIONAR : !isProfile.ADICIONAR})}/></span>
                        Cadastrar Perfil</span>
                      {/* {profileDeletePermission &&  */}
                    <span> 
                      <span><Checkbox checked={isProfile.EXCLUIR}  onChange={() => gatherData(10)}  
                      onClick={() => setIsProfile({...isProfile, EXCLUIR : !isProfile.EXCLUIR})}/></span>
                        Excluir Perfil</span>
                      {/* {profileUpdatePermission &&  */}
                    <span> 
                      <span><Checkbox checked={isProfile.EDITAR}  onChange={() => gatherData(12)}  
                      onClick={() => setIsProfile({...isProfile, EDITAR : !isProfile.EDITAR})} /></span>
                        Editar Perfil</span>
                  </div>
                </div>
                }
                </div>
                {/* } */}
                {/* {userPermission &&  */}
                <div className="body-row">
                  <div onClick={handleUsersModal} style={{cursor: "pointer"}}>
                    <span className="line">
                      <h5>
                        Usuários
                      </h5>
                    </span>
                    <span className="line">
                      <h5>
                        Cadastro de Usuários
                      </h5>
                    </span>
                    <span> 
                      {!usersModal ? <ChevronDown className="icon"/> : <ChevronUp className="icon"/>}
                    </span>
                </div>
                {usersModal &&
                <div className='modal'>
                  <div >
                    <span> 
                      <span><Checkbox checked={isUser.ADICIONAR}  value={8} onChange={() => gatherData(8)} 
                      onClick={() => setIsUser({...isUser, ADICIONAR : !isUser.ADICIONAR})} /></span>
                        Adicionar Usuário</span>
                      {/* {userDeletePermission &&  */}
                    <span> 
                      <span><Checkbox checked={isUser.EXCLUIR} value={7}  onChange={() => gatherData(7)} 
                      onClick={() => setIsUser({...isUser, EXCLUIR : !isUser.EXCLUIR})} /></span>
                        Excluir Usuário</span>
                      {/* {userUpdatePermission &&  */}
                    <span> 
                      <span><Checkbox checked={isUser.EDITAR} value={9} onChange={() => gatherData(9)} 
                      onClick={() => setIsUser({...isUser, EDITAR : !isUser.EDITAR})} /></span>
                        Editar Usuário</span>
                  </div>
                </div>
            }
            </div>
            {/* } */}
            <div className="body-row">
                        <div onClick={modalHandler} style={{cursor: "pointer"}} >
                            <span className="line">
                              <h5>
                                CNPJs da Empresa
                              </h5>
                            </span>
                            <span className="line">
                              <h5>
                                Cadastro de CNPJs
                              </h5>
                            </span>
                            <span> 
                              {!visible ? <ChevronDown  className="icon"/> : <ChevronUp className="icon"/>}
                            </span>
                        </div>
                        {visible &&
                          <div className="modal">
                            <div>
                              <span>
                                <span><Checkbox value={25} checked={isCnpj.ADICIONAR} 
                                onChange={() => gatherData(25)} 
                                onClick={() => setIsCnpj({...isCnpj, ADICIONAR : !isCnpj.ADICIONAR})}/></span>
                                  Adicionar CNPJ
                              </span>
                              <span>
                                <span><Checkbox value={24} checked={isCnpj.EXCLUIR} 
                                onChange={() => gatherData(24)} 
                                onClick={() => setIsCnpj({...isCnpj, EXCLUIR : !isCnpj.EXCLUIR})}/></span>
                                  Excluir CNPJ
                              </span>
                              <span>
                                <span><Checkbox value={26} checked={isCnpj.EDITAR} 
                                onChange={() => gatherData(26)} 
                                onClick={() => setIsCnpj({...isCnpj, EDITAR : !isCnpj.EDITAR})}/></span>
                                  Editar CNPJ
                              </span>
                            </div>
                          </div>}
                    </div>
                    <div className="body-row">
                      <div onClick={certificadoModalHandler} style={{cursor: "pointer"}}>
                        <span className="line">
                          <h5>
                            Certificado Digital
                          </h5>
                        </span>
                        <span className="line">
                          <h5>
                            Upload do Certificado Digital
                          </h5>
                        </span>
                        <span> 
                          {!certificadoVisible ? <ChevronDown  className="icon"/> : <ChevronUp className="icon"/>}
                        </span>
                      </div>
                      {certificadoVisible &&
                        <div className="modal">
                          <div>
                              <span>
                                <span><Checkbox value={28} checked={isCertificate.ADICIONAR}
                                  onChange={() => gatherData(28)} 
                                  onClick={() => setIsCertificate({...isCertificate, ADICIONAR : !isCertificate.ADICIONAR})}/></span>
                                    Adicionar Certificado
                              </span>
                              <span>
                                <span><Checkbox value={27} checked={isCertificate.EXCLUIR}
                                  onChange={() => gatherData(27)} 
                                  onClick={() => setIsCertificate({...isCertificate, EXCLUIR : !isCertificate.EXCLUIR})}/></span>
                                    Excluir Certificado
                              </span>
                          </div>
                        </div>
                      }
                    </div>
            </div>
    </Table>
    </>

  )
}

AtualizarCadastro.auth = true;
