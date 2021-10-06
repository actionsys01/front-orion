import BotaoVoltar from "@components/BotaoVoltar";
import { Table, ButtonStyle } from "./style";
import { useSession } from "next-auth/client";
import {  Button, Loading, Spacer, Text } from "@geist-ui/react";
import { Checkbox } from '@material-ui/core';
import * as perfil from "@services/perfis"
import Head from "next/head";
import { ChevronDown, ChevronUp  } from '@geist-ui/react-icons'
import {  useRouter } from "next/router";
import React, { useMemo, useState, useEffect } from "react";
import api from "@services/api"


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


export default function AtualizarCadastro() {
  const router = useRouter();
  const id_profile = Number(router.query.perfilId);
  const [session] = useSession();
  const [permissions, setPermissions ] = useState<CompanyPermissions[]>([])
  const [profilePermissions, setProfilePermissions] = useState<ProfilePermissions[]>([])
  const [nfeModal, setNfeModal] = useState<boolean>(false)
  const [cteModal, setCteModal] = useState<boolean>(false)
  const [nfseModal, setNfseModal] = useState<boolean>(false)
  const [entranceModal, setEntranceModal] = useState<boolean>(false)
  const [usersModal, setUsersModal] = useState<boolean>(false)
  const [profileModal, setProfileModal] = useState<boolean>(false)
  const [isNfe, setIsNfe] = useState<boolean>(false)
  const [isCte, setIsCte] = useState<boolean>(false)
  const [isNfse, setIsNfse] = useState<boolean>(false)
  const [profileApp, setProfileApp] = useState<number[]>([])

  console.log(id_profile);
 
  //checkbox states
  const [nfeVisualizar, setNfeVizualizar] = useState<boolean>(false)
  const [nfeHistorico, setNfeHistorico] = useState<boolean>(false)
  const [cteVisualizar, setCteVizualizar] = useState<boolean>(false)
  const [cteHistorico, setCteHistorico] = useState<boolean>(false)
  const [nfseVisualizar, setNfseVizualizar] = useState<boolean>(false)
  const [nfseHistorico, setNfseHistorico] = useState<boolean>(false)
  const [usuarioEditar, setUsuarioEditar] = useState<boolean>(false)
  const [usuarioAdcionar, setUsuarioAdicionar] = useState<boolean>(false)
  const [usuarioExcluir, setUsuarioExcluir] = useState<boolean>(false)
  const [perfilEditar, setPerfilEditar] = useState<boolean>(false)
  const [perfilAdcionar, setPerfilAdicionar] = useState<boolean>(false)
  const [perfilExcluir, setPerfilExcluir] = useState<boolean>(false)

  
  // if (!data) return <Loading />;

const getAllPermissions = async () => {
  const response = await api.get(`/perfil/search/?profile_id=${id_profile}`);
  const data = await response.data.permissoes;
 
const currentPermissions: any = [];
data.map((item: any) => 
currentPermissions.push(item.id)
)
setProfilePermissions(data)
setProfileApp(currentPermissions)
  return currentPermissions
}

const getNfePermissions = useMemo(() => {
const nfePermissions: ProfilePermissions[] = [];
 if(profilePermissions) {
    const visualizarNfe = profilePermissions.find((item) => item.categoria === "NFE");
    const historicoNfe = profilePermissions.find((item) => item.categoria === "NFE" && item.acao === "HISTORICO")
    const visualizarCte = profilePermissions.find((item) => item.categoria === "CTE");
    const historicoCte = profilePermissions.find((item) => item.categoria === "CTE" && item.acao === "HISTORICO")
    const editarUsuario = profilePermissions.find((item) => item.categoria === "USUARIO" && item.acao === "EDITAR")
    const adicionarUsuario = profilePermissions.find((item) => item.categoria === "USUARIO" && item.acao === "ADICIONAR")
    const excluirUsuario = profilePermissions.find((item) => item.categoria === "USUARIO" && item.acao === "EXCLUIR")
    const editarPerfil = profilePermissions.find((item) => item.categoria === "PERFIS" && item.acao === "EDITAR")
    const adicionarPerfil = profilePermissions.find((item) => item.categoria === "PERFIS" && item.acao === "ADICIONAR")
    const excluirPerfil = profilePermissions.find((item) => item.categoria === "PERFIS" && item.acao === "EXCLUIR")
    if(visualizarNfe){setNfeVizualizar(true)}
    if(historicoNfe){setNfeHistorico(true)}
    if(visualizarCte){setCteVizualizar(true)}
    if(historicoCte){setCteHistorico(true)}
    if(editarUsuario){setUsuarioEditar(true)}
    if(adicionarUsuario) {setUsuarioAdicionar(true)}
    if(excluirUsuario){setUsuarioExcluir(true)} 
    if(editarPerfil) {setPerfilEditar(true)}
    if(adicionarPerfil){setPerfilAdicionar(true)}
    if(excluirPerfil) {setPerfilExcluir(true)}

    }
    return nfePermissions
}, [profilePermissions])

// const getNfePermissions = useMemo(() => {
//   const nfePermissions: ProfilePermissions[] = [];
//    if(profilePermissions) {
//       const visualizarNfe = profilePermissions.filter((item) => item.categoria === "NFE");
//       if(visualizarNfe){
//           setNfeVizualizar(true)
//           // data.forEach((item: any) => {
//           //     nfePermissions.push({
//           //         ...item,
//           //         row: (<Checkbox checked/>)
//           //     })
//           // })
//       }
      
//       }
//       return nfePermissions
//   }, [profilePermissions])



  useEffect(() => {
    const dataApp: any =  session?.usuario.empresa.plano.aplicacoes
    setPermissions(dataApp)
    permissions.map((item) => {
      if(item.categoria === "NFE"){
        setIsNfe(true)
      } if (item.categoria === "CTE") {
        setIsCte(true)
      } if(item.categoria === "NFSE") {
        setIsNfse(true)
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
    await perfil.atualizar({id_profile: Number(router.query.perfilId), nome: String(router.query.nome), descricao: String(router.query.descricao), permissions: profileApp})
  } catch (error) {
    console.log(error);
  }
  router.push({pathname: "/perfil-acesso"})
}

const handleNfeModal = () => {!nfeModal ? setNfeModal(true) : setNfeModal(false)}
const handleCteModal = () => {!cteModal ? setCteModal(true) : setCteModal(false)}
const handleNfseModal = () => {!nfseModal ? setNfseModal(true) : setNfseModal(false)}
const handleEntranceModal = () => {!entranceModal ? setEntranceModal(true) : setEntranceModal(false)}
const handleUsersModal = () => {!usersModal ? setUsersModal(true) : setUsersModal(false)}
const handleProfileModal = () => {!profileModal ? setProfileModal(true) : setProfileModal(false)}




  return (
    <>
      <Head>
        <title>Orion | Perfil de Cadastro</title>
      </Head>
      <BotaoVoltar/>
      <h2>Perfil de Cadastro </h2>
      <ButtonStyle>
      <Button
          type="success-light"
          size="small"
          className="btn"
          onClick={updateProfile}
        >
          Confirmar
        </Button>
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
      {isNfe  &&
      <div className="body-row">
        <div>
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
            {!nfeModal ? <ChevronDown onClick={handleNfeModal} className="icon"/> : <ChevronUp onClick={handleNfeModal} className="icon"/> }
          </span>
        </div>
          {nfeModal &&
        <div className='modal'>
          <div >
            <span>
              <span><Checkbox  value={1} checked={nfeVisualizar}  onChange={() => gatherData(1)} onClick={nfeVisualizar ? ()=> setNfeVizualizar(false) : ()=> setNfeVizualizar(true)}/></span>
              Visualizar</span>
            <span> 
              <span><Checkbox value={27} checked={nfeHistorico} onChange={() => gatherData(27)} onClick={nfeHistorico ? ()=> setNfeHistorico(false) : ()=> setNfeHistorico(true)}/></span>
              Histórico de Notas</span>
              <span> 
              <span><Checkbox/></span>
              Registrar Evento - Ciência da Operação</span>
              <span> 
              <span><Checkbox/></span>
              Registrar Evento - Confirmação da Operação</span>
              <span> 
              <span><Checkbox/></span>
              Registrar Evento - Operação Não Realizada</span>
              <span> 
              <span><Checkbox/></span>
              Registrar Evento - Desconhecimento da Operação</span>
          </div>
        </div>
          }
          </div>
          }
          {isCte &&
        <div className="body-row">
          <div>
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
            {!cteModal ? <ChevronDown  onClick={handleCteModal}  className="icon"/> : <ChevronUp  onClick={handleCteModal}  className="icon"/>}
          </span>
        </div>
        {cteModal &&
        <div className='modal'>
          <div >
            <span>
              <span><Checkbox checked={cteVisualizar} onChange={() => gatherData(5)} onClick={cteVisualizar ? ()=> setCteVizualizar(false) : ()=> setCteVizualizar(true)}/></span>
              Visualizar</span>
            <span> 
              <span><Checkbox checked={cteHistorico}  onChange={() => gatherData(21)} onClick={cteHistorico ? ()=> setCteHistorico(false) : ()=> setCteHistorico(true)}/></span>
              Histórico de Notas</span>
              <span> 
              <span><Checkbox/></span>
              Registrar Evento - Ciência da Operação</span>
              <span> 
              <span><Checkbox/></span>
              Registrar Evento - Confirmação da Operação</span>
              <span> 
              <span><Checkbox/></span>
              Registrar Evento - Operação Não Realizada</span>
              <span> 
              <span><Checkbox/></span>
              Registrar Evento - Desconhecimento da Operação</span>
          </div>
        </div>
        }
        </div>
        }
        {isNfse &&
        <div className="body-row">
          <div>
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
           {!nfseModal ? <ChevronDown onClick={handleNfseModal}  className="icon"/> : <ChevronUp onClick={handleNfseModal}  className="icon"/>}
          </span>
        </div>
        {nfseModal &&
        <div className='modal'>
          <div >
            <span>
              <span><Checkbox/></span>
              Visualizar</span>
            <span> 
              <span><Checkbox/></span>
              Histórico de Notas</span>
              <span> 
              <span><Checkbox/></span>
              Registrar Evento - Ciência da Operação</span>
              <span> 
              <span><Checkbox/></span>
              Registrar Evento - Confirmação da Operação</span>
              <span> 
              <span><Checkbox/></span>
              Registrar Evento - Operação Não Realizada</span>
              <span> 
              <span><Checkbox/></span>
              Registrar Evento - Desconhecimento da Operação</span>
          </div>
        </div>
        } 
        </div>
        }
        <div className="body-row">
          <div>
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
            {!entranceModal ? <ChevronDown onClick={handleEntranceModal}  className="icon"/> : <ChevronUp onClick={handleEntranceModal}  className="icon"/>}
          </span>
        </div>
        {entranceModal &&
        <div className='modal'>
          <div >
            <span>
              <span><Checkbox /></span>
              Visualizar</span>
            <span> 
              <span><Checkbox/></span>
              Autorizar</span>
              <span> 
              <span><Checkbox/></span>
              Editar</span>
              <span> 
              <span><Checkbox/></span>
              Cancelar</span>
              <span> 
              <span><Checkbox/></span>
              Adicionar</span>
              {/* <span> 
              <span><Checkbox/></span>
              Registrar Evento - Desconhecimento da Operação</span> */}
          </div>
        </div>
        }
        </div>
        <div className="body-row">
          <div>
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
            {!profileModal ? <ChevronDown  onClick={handleProfileModal} className="icon"/> : <ChevronUp  onClick={handleProfileModal} className="icon"/>}
          </span>
        </div>
        {profileModal &&
        <div className='modal'>
          <div >
            {/* <span>
              <span><Checkbox/></span>
              Visualizar</span> */}
            <span> 
              <span><Checkbox checked={perfilAdcionar}  onChange={() => gatherData(24)} onClick={perfilAdcionar ? ()=> setPerfilAdicionar(false) : ()=> setPerfilAdicionar(true)}/></span>
              Cadastrar Perfil</span>
              <span> 
              <span><Checkbox checked={perfilExcluir}  onChange={() => gatherData(25)}  onClick={perfilExcluir ? ()=> setPerfilExcluir(false) : ()=> setPerfilExcluir(true)}/></span>
              Excluir Perfil</span>
              <span> 
              <span><Checkbox checked={perfilEditar}  onChange={() => gatherData(26)}  onClick={perfilEditar ? ()=> setPerfilEditar(false) : ()=> setPerfilEditar(true)} /></span>
              Editar Perfil</span>
              {/* <span> 
              <span><Checkbox/></span>
              Registrar Evento - Operação Não Realizada</span>
              <span> 
              <span><Checkbox/></span>
              Registrar Evento - Desconhecimento da Operação</span> */}
          </div>
        </div>
        }
        </div>
        <div className="body-row">
          <div>
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
            {!usersModal ? <ChevronDown onClick={handleUsersModal} className="icon"/> : <ChevronUp onClick={handleUsersModal} className="icon"/>}
          </span>
        </div>
        {usersModal &&
        <div className='modal'>
          <div >
            {/* <span>
              <span><Checkbox/></span>
              Visualizar</span> */}
            <span> 
              <span><Checkbox checked={usuarioAdcionar}  value={23} onChange={() => gatherData(23)} onClick={usuarioAdcionar ? ()=> setUsuarioAdicionar(false) : ()=> setUsuarioAdicionar(true)}/></span>
              Adicionar Usuário</span>
              <span> 
              <span><Checkbox checked={usuarioExcluir} value={22}  onChange={() => gatherData(22)} onClick={usuarioExcluir ? ()=> setUsuarioExcluir(false) : ()=> setUsuarioExcluir(true)}/></span>
              Excluir Usuário</span>
              <span> 
              <span><Checkbox checked={usuarioEditar} value={2} onChange={() => gatherData(2)} onClick={usuarioEditar ? ()=> setUsuarioEditar(false) : ()=> setUsuarioEditar(true)}/></span>
              Editar Usuário</span>
              {/* <span> 
              <span><Checkbox/></span>
              Registrar Evento - Operação Não Realizada</span>
              <span> 
              <span><Checkbox/></span>
              Registrar Evento - Desconhecimento da Operação</span> */}
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
