import { Grid } from "./styled";
import React, { useState, useMemo, useEffect} from 'react'; 
import {
  Button,
  Loading,
  Popover,
  Row,
  Spacer,
  Table,
  Text,
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



export default function Usuarios({}) {
  const [session] = useSession();
  const [visible, setVisible] = useState<boolean>(false)
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  
  

 
  const getAllUsersByCompanyId = async () : Promise<IUsuario[]> => {
    const response = await api.get(`/usuarios/`)
    const {data}= response;
    return data
  }
 
  useEffect(() => {
    getAllUsersByCompanyId().then(response => setUsuarios(response))
   
  }, [])

  const popoverHandler = () => {!visible ? setVisible(true) : setVisible(false)}

  const UsersByCompanyData = () => {
    const allData:any = [];
    if(usuarios) {
      usuarios.forEach((item) => {
        allData.push({
          ...item,
          perfil_nome: item.perfil.nome,
          option: (actions: any, data: any) => (
            <Popover
              placement="right"
              visible={visible}
              content={
                <>
                  <Popover.Item>
                    <Text
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        const { id } = data.rowValue;
                        const perfil_nome = data.rowValue.perfil_id;
                        const nome = data.rowValue.nome;
                        const email = data.rowValue.email;
                        router.push({
                          pathname: "/cadastrar-usuario",
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
                        const { id } = data.rowValue;
                        deletar(id);
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
        })
      })
    } 

    return allData;
  }

  

  function deletar(id: number) {
    usuario.deletar(id);
    const usuariosAtualizados = usuarios.filter((usuario) => usuario.id !== id);
    setVisible(false)
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
      <Grid>
        <Table data={UsersByCompanyData}>
          <Table.Column prop="option" />
          <Table.Column prop="nome" label="Nome" />
          <Table.Column prop="email" label="Email" />
          <Table.Column prop="perfil_nome" label="Perfil" />
        </Table>
      </Grid>
    </>
  );
}

Usuarios.auth = true;
