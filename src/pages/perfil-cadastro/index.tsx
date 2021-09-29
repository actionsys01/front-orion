import BotaoVoltar from "@components/BotaoVoltar";
import { Table, ButtonStyle } from "./style";
import { useSession } from "next-auth/client";
import NaoEncontrado from "@components/NaoEncontrado";
import {  Button, Loading, Spacer, Text } from "@geist-ui/react";
import { Checkbox } from '@material-ui/core';
import useRequest from "@hooks/useRequest";
import * as perfil from "@services/perfis"
import Head from "next/head";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import {  useRouter } from "next/router";
import React, { useMemo, useState, useEffect } from "react";


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
  const id_profile = Number(router.query.id);
  const [session] = useSession();
  const [permissions, setPermissions ] = useState<Permissions[]>([])
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

  console.log(profileApp, id_profile);
  
  // if (!data) return <Loading />;

console.log("id profile:" ,router.query.perfilId, "nome:", router.query.nome, "desc:", router.query.descricao, "permissions:", profileApp);


  useEffect(() => {
    const data: any =  session?.usuario.empresa.plano.aplicacoes
    setPermissions(data)
    permissions.map((item) => {
      if(item.categoria === "NFE"){
        setIsNfe(true)
      } if (item.categoria === "CTE") {
        setIsCte(true)
      } if(item.categoria === "NFSE") {
        setIsNfse(true)
      }
    })
  }, [session, permissions])

  


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
  await perfil.criar({name: String(router.query.nome), descricao: String(router.query.descricao), permissions: profileApp,  empresa_id: Number(session?.usuario.empresa.id) })
} catch (error) {
  console.log(error);
}
  router.push({pathname: "/perfil-acesso"})
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
          onClick={router.query.perfilId ? updateProfile : createProfile}
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
            {!nfeModal ? <AiFillCaretDown onClick={handleNfeModal} className="icon"/> : <AiFillCaretUp onClick={handleNfeModal} className="icon"/> }
          </span>
        </div>
          {nfeModal &&
        <div className='modal'>
          <div >
            <span>
              <span><Checkbox value={1} onChange={() => gatherData(1)}/></span>
              Visualizar</span>
            <span> 
              <span><Checkbox value={27} onChange={() => gatherData(27)}/></span>
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
            {!cteModal ? <AiFillCaretDown  onClick={handleCteModal}  className="icon"/> : <AiFillCaretUp  onClick={handleCteModal}  className="icon"/>}
          </span>
        </div>
        {cteModal &&
        <div className='modal'>
          <div >
            <span>
              <span><Checkbox  onChange={() => gatherData(5)}/></span>
              Visualizar</span>
            <span> 
              <span><Checkbox  onChange={() => gatherData(21)}/></span>
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
           {!nfseModal ? <AiFillCaretDown onClick={handleNfseModal}  className="icon"/> : <AiFillCaretUp onClick={handleNfseModal}  className="icon"/>}
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
            {!entranceModal ? <AiFillCaretDown onClick={handleEntranceModal}  className="icon"/> : <AiFillCaretUp onClick={handleEntranceModal}  className="icon"/>}
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
            {!profileModal ? <AiFillCaretDown  onClick={handleProfileModal} className="icon"/> : <AiFillCaretUp  onClick={handleProfileModal} className="icon"/>}
          </span>
        </div>
        {profileModal &&
        <div className='modal'>
          <div >
            {/* <span>
              <span><Checkbox/></span>
              Visualizar</span> */}
            <span> 
              <span><Checkbox  onChange={() => gatherData(24)}/></span>
              Cadastrar Perfil</span>
              <span> 
              <span><Checkbox onChange={() => gatherData(25)}/></span>
              Excluir Perfil</span>
              <span> 
              <span><Checkbox onChange={() => gatherData(26)} /></span>
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
            {!usersModal ? <AiFillCaretDown onClick={handleUsersModal} className="icon"/> : <AiFillCaretUp onClick={handleUsersModal} className="icon"/>}
          </span>
        </div>
        {usersModal &&
        <div className='modal'>
          <div >
            {/* <span>
              <span><Checkbox/></span>
              Visualizar</span> */}
            <span> 
              <span><Checkbox value={23} onChange={() => gatherData(23)}/></span>
              Adicionar Usuário</span>
              <span> 
              <span><Checkbox value={22}  onChange={() => gatherData(22)}/></span>
              Excluir Usuário</span>
              <span> 
              <span><Checkbox value={2} onChange={() => gatherData(2)}/></span>
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

PerfilCadastro.auth = true;
