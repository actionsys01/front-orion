import NaoEncontrado from "@components/NaoEncontrado";
import {
  Button,
  Input,
  Loading,
  Modal,
  Popover,
  Row,
  Spacer,
  Table,
  Text,
  useModal,
  useToasts,
} from "@geist-ui/react";
import Pagination from "@material-ui/lab/Pagination";
import { useSession } from "next-auth/client";
import { MoreHorizontal, Plus } from "@geist-ui/react-icons";
import useRequest from "@hooks/useRequest";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Grid } from "./styled";
import {Pages} from "@styles/pages"
import * as perfil from "@services/perfis";
import {useSecurityContext} from "@contexts/security"
import ProfilePopover from "./Popover";
import capitalize from "@utils/capitalize"
import getProfileAnTotalByCompanyId from '@services/perfis/getProfileAnTotalByCompanyId'



export interface IPerfilAplicacao {
  id: number;
  nome: string;
  descricao: string;
  atualizadoEm: string;
  atualizadoPorIp: string;
  criadoEm: string;
  criadoPorIp: string
}

export interface IUpdateProfile{
  id_profile : number;
  nome : string;
  descricao : string;
  permissions : Number[];
}
export interface IPerfil  {
  nome: string;
  descricao: string;
  id: number;
  perfil: IPerfilAplicacao;
};

export default function PerfilAcesso() {
  const [session] = useSession();
  const {profilePermission} = useSecurityContext()
  const { setVisible, bindings } = useModal();
  const [empresaId, setEmpresaId] = useState<number>()
  const [perfilId, setPerfiId] = useState<number>();
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [perfisAplicacoes, setPerfisAplicacoes] = useState<IPerfilAplicacao[]>([]);
  const [page, setPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1)
  const [acao, setAcao] = useState<"editar" | "cadastrar" | "copiar">(
    "cadastrar"
  );
  const [, setToast] = useToasts();
  const router = useRouter();
  


  const handleChange = (event : React.ChangeEvent<unknown>, value : number) => {
   
    setPage(value)
  }



  const getProfileData = useCallback(async () => {
    const response = await getProfileAnTotalByCompanyId(session?.usuario.empresa.id, page)
    
    const { data } = response

    setQuantityPage(Math.ceil(data.total / 8));
    
    return data.perfis
  }, [page])

  useEffect(() => {
      getProfileData().then(response => setPerfisAplicacoes(response))
      const companyId = session?.usuario.empresa.id
      setEmpresaId(companyId)
      
  },[page])



  const perfis = useMemo(() => {
    const perfis: any = [];
    if (perfisAplicacoes) {
      perfisAplicacoes.forEach((item) => {
        perfis.push({
          ...item,
          nome: capitalize(item.nome),
          link: (action: any, data: any) => (
           <ProfilePopover data={data}  setPerfisAplicacoes={setPerfisAplicacoes}/>
          ),
        });
      });
    }

    return perfis.sort(comparations);
  }, [perfisAplicacoes]);

  function comparations (a: any, b: any) {
    if ( a.nome < b.nome ){
      return -1;
    }
    if ( a.nome > b.nome ){
      return 1;
    }
    return 0;
   }
   


  async function cadastrar() {
    if(!nome || !descricao) {
      setToast({
        text: "Informe todos os dados do perfil.",
        type: "warning"}); 
        return
    } 
      router.push({
        pathname: "/perfil-cadastro",
        query: { nome, descricao, empresaId },
      });
  }

  // if (!data) return <Loading />;

  return (
    <>
      <Head>
        <title>Orion | Perfil de Acesso</title>
      </Head>
      <Text h2>Perfil de Acesso</Text>
      <Row justify="end" align="middle">
        <Button
          type="success-light"
          size="small"
          icon={<Plus />}
          onClick={() => {
            setVisible(true);
          }}
        >
          Adicionar
        </Button>
      </Row>

      <Spacer y={1} />
     
        <Grid>
         {profilePermission && 
         <Table data={perfis}>
            <Table.Column prop="link" width={15} />
            <Table.Column prop="nome" label="Nome" width={500} />
            <Table.Column prop="descricao" label="Descrição" width={500} />
          </Table>}
          <Pages>
          <Pagination style={{margin : "0 auto"}} onChange={handleChange} count={quantityPage}  shape='rounded' />
          </Pages>
        </Grid>
      

    <Modal
        disableBackdropClick={true}
        {...bindings}
        onClose={() => {
          setNome("");
          setDescricao("");
        }}
      >
        <Modal.Title>{acao}</Modal.Title>
        <Modal.Subtitle>Perfil de Acesso</Modal.Subtitle>
        <Modal.Content>
          <Text small>Nome</Text>
          <Input
            width="100%"
            placeholder="Ex: ADMIN"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Text small>Descrição</Text>
          <Input
            width="100%"
            placeholder="Ex: Permitir deletar"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)} type="abort">
          CANCELAR
        </Modal.Action>
        <Modal.Action onClick={cadastrar} >
          CONTINUAR
        </Modal.Action>
      </Modal> 
      <style>{`.backdrop {z-index: 1200 !important}`}</style>
    </>
  );
}

PerfilAcesso.auth = true;