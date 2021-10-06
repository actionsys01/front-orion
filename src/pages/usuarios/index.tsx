import { Grid, GridStyle } from "./style";
import React, { useState, useMemo, useEffect} from 'react'; 
import {
  Button,
  Loading,
  Popover,
  Row,
  Spacer,
  Text,
  useToasts
} from "@geist-ui/react";
import { MoreHorizontal, Plus } from "@geist-ui/react-icons";
import useRequest from "@hooks/useRequest";
import * as perfis from "@services/perfis";
import * as usuario from "@services/usuarios";
import { useSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import api from "@services/api"

interface IUsuario  {
  id: number;
  nome: string;
  email: string;
  perfil: Perfil
};

interface Perfil {
  id: number;
  nome: string;
  descricao: string;
  criadoEm: string;
  atualizadaEm: string;
  criadoPorIp: string;
  atualizadoPorIp: string;
}

interface UserData {
  id: number;
  nome: string;
  email: string;
  perfil: Perfil;
  perfil_nome: string;
  emailFormatted: string;
  option: any
}



export default function Usuarios({}) {
  const [session] = useSession();
  const [visible, setVisible] = useState<boolean>(false)
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<IUsuario[] | undefined>([]);
  const [, setToast] = useToasts();
  

 
  const getAllUsersByCompanyId = async () : Promise<IUsuario[] | undefined> => {
    try {
      const response = await api.get(`/usuarios/`)
      const {data}= response;
      return data
    } catch (error) {
      setToast({
        text: "Houve um erro, por favor reinicie seu navegador",
        type: "warning"
      })
    }

  }
 
  useEffect(() => {
    getAllUsersByCompanyId().then(response => setUsuarios(response))
   
  }, [])

  const popoverHandler = () => !visible ? setVisible(true) : setVisible(false);

  const PopOption = ( data: any) => (
 
    <Popover
      placement="right"
     
      content={
        <>
          <Popover.Item>
            <Text
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                const { id } = data;
                const perfil_nome = data.perfil_id;
                const nome = data.nome;
                const email = data.email;
                router.push({
                  pathname: "/atualizar-usuario",
                  query: { perfil_nome, nome, email, id },
                });
              }}
            >
              Editar
            </Text>
          </Popover.Item>
          <Popover.Item>
            <Text
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                const { id } = data;
                deletar(id);
                setVisible(false)
              }}
            >
              Deletar
            </Text>
          </Popover.Item>
        </>
      }
    >
      <span style={{ cursor: "pointer" }}>
        <MoreHorizontal />
      </span>
    </Popover>
  
)

  const UsersByCompanyData = useMemo(() => {
    const allData: UserData[] = [];
    if(usuarios) {
      usuarios.forEach((item) => {
        allData.push({
          ...item,
          perfil_nome: item.perfil.nome,
          emailFormatted: item.email.toLowerCase(),
          option: PopOption(item),
        })
      })
    }
    
    return allData;
  },[usuarios])

 
  

  function deletar(id: number) {
    usuario.deletar(id);
    const usuariosAtualizados = usuarios?.filter((usuario) => usuario.id !== id);
    setUsuarios(usuariosAtualizados)
  } 


 /*  if (!data) return <Loading />; */

  return (
    <>
      <Head>
        <title>Orion | Usuários</title>
      </Head>
      <Text h2>Usuários</Text>
      <Row justify="end" align="middle">
        <Button
          type="success-light"
          size="small"
          icon={<Plus />}
          onClick={() => router.push("/cadastrar-usuario")}
        >
          Adicionar
        </Button>
      </Row>
      <Spacer y={1} />
      {/* <Grid>
        <Table data={UsersByCompanyData}>
          <Table.Column prop="option" />
          <Table.Column prop="nome" label="Nome" />
          <Table.Column prop="emailFormatted"  label="Email" />
          <Table.Column prop="perfil_nome" label="Perfil" />
        </Table>
      </Grid> */}
    <GridStyle>
      <table>
        <thead>
          <tr>
          <th></th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Perfil</th>
          </tr>
        </thead>
        <tbody>
        {UsersByCompanyData.map((item, i) => (
        <tr key={i}>
          <td>{item.option}</td>
          <td style={{textTransform: "capitalize"}}>{item.nome }</td>
          <td>{item.email}</td>
          <td>{item.perfil_nome}</td>
        </tr>
        ))}
        </tbody>
      </table>
    </GridStyle>

    </>
  );
}

Usuarios.auth = true;
