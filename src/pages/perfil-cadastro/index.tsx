import React, { useCallback, useState, useEffect } from "react";
import BotaoVoltar from "@components/BotaoVoltar";
import { Table, ButtonStyle } from "./style";
import { useSession } from "next-auth/client";
import NaoEncontrado from "@components/NaoEncontrado";
import { Checkbox } from '@material-ui/core';
import * as perfil from "@services/perfis"
import Head from "next/head";
import { ChevronDown, ChevronUp  } from '@geist-ui/react-icons'
import {  useRouter } from "next/router";
import {useSecurityContext} from "@contexts/security";
import { useToasts} from "@geist-ui/react";


type ICreateProfile = {
  name: string;
  descricao: string;
  permissions: []
};
type Categoria = {
  categoria: string
};

interface Permissions {
  categoria: string
}

interface Class {
  className: string
}

export default function PerfilCadastro() {
  const router = useRouter();
  // checar permissões
  const {nfePermission, nfeHistoricalPermission, ctePermission,
        cteHistoricalPermission, userPermissions,  profilePermission,
        nfeAwarePermission, nfeConfirmPermission, 
        nfeUnawarePermission, nfeUnauthorizedPermission
      } = useSecurityContext()
  const id_profile = Number(router.query.perfilId);
  const [session] = useSession();
  const [permissions, setPermissions ] = useState<Permissions[]>([])

  // modais
  const [nfeModal, setNfeModal] = useState(false)
  const [cteModal, setCteModal] = useState(false)
  const [nfseModal, setNfseModal] = useState(false)
  const [entranceModal, setEntranceModal] = useState(false)
  const [usersModal, setUsersModal] = useState(false)
  const [profileModal, setProfileModal] = useState(false)
  const [ certificadoVisible, setCertificadoVisible ] = useState(false)
  const [ visible, setVisible] = useState(false)


  const [profileApp, setProfileApp] = useState<number[]>([])
  const [, setToast] = useToasts();


const gatherData = (e: any)  => {
  const findProfileApp = profileApp.find(value => value === Number(e))

    if (!findProfileApp) {
      setProfileApp(state => [...state, Number(e)])
      return
}
  setProfileApp(state => state.filter(value => value !== e))
}

async function createProfile ()  {
try {
  if(!profileApp.length) {
    setToast({
      text: "Por favor, selecione ao menos uma permissão",
      type: "warning"
    })
    return
  }
  await perfil.criar({name: String(router.query.nome), descricao: String(router.query.descricao), permissions: profileApp,  empresa_id: Number(session?.usuario.empresa.id) })
} catch (error) {
  console.log(error);
}
  router.push({pathname: "/perfil-acesso"})
}



const handleNfeModal = useCallback(() => {setNfeModal(!nfeModal)}, [nfeModal])
const handleCteModal = useCallback(() => {setCteModal(!cteModal)}, [cteModal])
const handleNfseModal = useCallback(() => {setNfseModal(!nfseModal)}, [nfseModal])
const handleEntranceModal = useCallback(() => {setEntranceModal(!entranceModal)}, [entranceModal])
const handleUsersModal = useCallback(() => {setUsersModal(!usersModal)}, [usersModal])
const handleProfileModal = useCallback(() => {setProfileModal(!profileModal)}, [profileModal])
const modalHandler = useCallback(() => {setVisible(!visible)}, [visible])
const certificadoModalHandler = useCallback(() => {setCertificadoVisible(!certificadoVisible)}, [certificadoVisible])

  return (
            <>
              <Head>
                <title>Orion | Perfil de Cadastro</title>
              </Head>
              <BotaoVoltar/>
              <h2>Perfil de Cadastro</h2>
              <ButtonStyle>
                <button
                    type="button"
                    className="btn"
                    onClick={createProfile}
                  >
                    Confirmar
                </button>
                </ButtonStyle>
              <Table>
                <div className="main">
                  <header>
                    <span>
                      <h5>Aplicação</h5>
                      <h5 style={{width: "15%", display: "flex", justifyContent: "flex-end"}}>Descrição</h5>
                      <h5></h5>
                    </span>
                  </header>
                  {/* {isNfe && nfePermission  && */}
                  <div className="body-row" >
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
                    <div className="modal">
                      <div >
                        <span>
                          <span><Checkbox value={1} onChange={() => gatherData(1)}/></span>
                          Visualizar</span>
                        {/* {nfeHistoricalPermission &&   */}
                          <span>  
                            <span><Checkbox value={2} onChange={() => gatherData(2)}/></span>
                          Histórico de Notas</span>
                          {/* {nfeAwarePermission &&  */}
                          <span> 
                            <span><Checkbox value={3} onChange={() => gatherData(3)}/></span>
                          Registrar Evento - Ciência da Operação</span>
                          {/* {nfeConfirmPermission &&  */}
                          <span> 
                            <span><Checkbox value={4} onChange={() => gatherData(4)}/></span>
                          Registrar Evento - Confirmação da Operação</span>
                        {/* {nfeUnauthorizedPermission && */}
                          <span> 
                            <span><Checkbox value={6} onChange={() => gatherData(6)}/></span>
                          Registrar Evento - Operação Não Realizada</span>
                          {/* {nfeUnawarePermission &&  */}
                          <span> 
                            <span><Checkbox value={5} onChange={() => gatherData(5)}/></span>
                          Registrar Evento - Desconhecimento da Operação</span>
                          
                      </div>
                    </div>
                      }
                      </div>
                      {/* } */}
                      {/* {isCte && ctePermission && */}
                    <div className="body-row">
                      <div onClick={handleCteModal} style={{cursor: "pointer"}}>  
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
                          {!cteModal ? <ChevronDown   className="icon"/> : <ChevronUp   className="icon"/>}
                        </span>
                    </div>
                    {cteModal &&
                    <div className="modal">
                      <div >
                        <span>
                          <span><Checkbox  onChange={() => gatherData(13)}/></span>
                          Visualizar</span>
                        {/* {cteHistoricalPermission &&  */}
                        <span> 
                          <span><Checkbox  onChange={() => gatherData(14)}/></span>
                          Histórico de Notas</span>
                      </div>
                    </div>
                    }
                    </div> 
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
                      {!nfseModal ? <ChevronDown  className="icon"/> : <ChevronUp  className="icon"/>}
                      </span>
                    </div>
                    {nfseModal &&
                    <div className="modal">
                      <div >
                        <span>
                          <span><Checkbox value={16} onChange={() => gatherData(16)} /></span>
                          Visualizar</span>
                        <span> 
                          <span><Checkbox value={17} onChange={() => gatherData(17)} /></span>
                          Histórico de Notas</span>
                        <span> 
                          <span><Checkbox value={18} onChange={() => gatherData(18)} /></span>
                          Imprimir Notas</span>
                      </div>
                    </div>
                    } 
                    </div>
                    {/* } */}
                    <div className="body-row">
                      <div onClick={handleEntranceModal} style={{cursor: "pointer"}}>
                        <span className="line">
                      <h5>
                        Entrada
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
                    <div className="modal">
                      <div >
                        <span>
                          <span><Checkbox value={19} onChange={() => gatherData(19)}/></span>
                          Visualizar</span>
                        <span> 
                          <span><Checkbox value={20} onChange={() => gatherData(20)}/></span>
                          Autorizar</span>
                        <span> 
                          <span><Checkbox value={21} onChange={() => gatherData(21)}/></span>
                          Editar</span>
                        <span> 
                          <span><Checkbox value={22} onChange={() => gatherData(22)}/></span>
                          Cancelar</span>
                        <span> 
                          <span><Checkbox value={23} onChange={() => gatherData(23)}/></span>
                          Adicionar</span>
                      </div>
                    </div>
                    }
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
                    <div className="modal">
                      <div >
                        <span> 
                          <span><Checkbox  onChange={() => gatherData(11)}/></span>
                          Cadastrar Perfil</span>
                          {/* {profileDeletePermission && */}
                        <span> 
                          <span><Checkbox onChange={() => gatherData(10)}/></span>
                          Excluir Perfil</span>
                          {/* {profileUpdatePermission && */}
                        <span>  
                          <span><Checkbox onChange={() => gatherData(12)} /></span>
                          Editar Perfil</span>
                          
                      </div>
                    </div>
                    }
                    </div>
                    {/* } */}
                  {/* {userPermission && */}
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
                          {!usersModal ? <ChevronDown  className="icon"/> : <ChevronUp className="icon"/>}
                        </span>
                      </div>
                      {usersModal &&
                      <div className="modal">
                        <div >
                          <span> 
                            <span><Checkbox value={8} onChange={() => gatherData(8)}/></span>
                            Adicionar Usuário</span>
                            {/* {userDeletePermission && */}
                          <span> 
                            <span><Checkbox value={7}  onChange={() => gatherData(7)}/></span>
                            Excluir Usuário</span>
                            {/* {userUpdatePermission && */}
                          <span> 
                            <span><Checkbox value={9} onChange={() => gatherData(9)}/></span>
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
                                <span><Checkbox value={25} onChange={() => gatherData(25)}/></span>
                                  Adicionar CNPJ
                              </span>
                              <span>
                                <span><Checkbox value={24} onChange={() => gatherData(24)}/></span>
                                  Excluir CNPJ
                              </span>
                              <span>
                                <span><Checkbox value={26} onChange={() => gatherData(26)}/></span>
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
                                <span><Checkbox value={28} onChange={() => gatherData(28)}/></span>
                                  Adicionar Certificado
                              </span>
                              <span>
                                <span><Checkbox value={27} onChange={() => gatherData(27)}/></span>
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

PerfilCadastro.auth = true;
