import { Grid, GridStyle } from "./style";
import React, { useState, useMemo, useEffect, useCallback} from 'react'; 
import {
  Button,
  Loading,
  Popover,
  Row,
  Spacer,
  Text,
  useToasts
} from "@geist-ui/react";

import { PaginationAlign, Pages } from "./styledComponent"

import { MoreHorizontal, Plus } from "@geist-ui/react-icons";
import {useSecurityContext} from "@contexts/security"
import Pagination from "@material-ui/lab/Pagination";
import * as usuario from "@services/usuarios";
import { useSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import getUsersByCompanyId from "@services/usuarios/getUsersByCompanyId";
import UserPopover from "./Popover";

export interface IUsuario  {
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
  const {userPermission} = useSecurityContext()
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [page, setPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1)
 


  
  const handleChange = (event : React.ChangeEvent<unknown>, value : number) => {
    setPage(value)
  }

  const getUsersAndTotalPage = useCallback(async () => {
    
    const responseNfes: any = await getUsersByCompanyId(page)

    const { data } = responseNfes;


    setUsuarios(data.usuarios)
  
    setQuantityPage(Math.ceil(data.total / 8));
    }, [page])
      

  useEffect(() => {

    getUsersAndTotalPage();


  }, [page])


function optionUserPopover (data: any) {
  return <UserPopover data={data} usuarios={usuarios} setUsuarios={setUsuarios} />
}

  const UsersByCompanyData = useMemo(() => {
    const allData: any = [];
    if(usuarios) {
      usuarios.forEach((item) => {
        allData.push({
          ...item,
          perfil_nome: item.perfil.nome,
          emailFormatted: item.email.toLowerCase(),
          option:  optionUserPopover(item)
        });
      });
    }
    
    return allData;
  },[usuarios])


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
   {userPermission &&
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
        {UsersByCompanyData.map((item: any, i: any) => (
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
}
      <Pages>
    <Pagination style={{margin : "0 auto"}} onChange={handleChange} count={quantityPage}  shape='rounded' />
    </ Pages>
   
    </>
  );
}

Usuarios.auth = true;
