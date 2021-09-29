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
import { useSession } from "next-auth/client";
import { MoreHorizontal, Plus } from "@geist-ui/react-icons";
import useRequest from "@hooks/useRequest";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useMemo, useState, useEffect } from "react";
import { Grid } from "./styled";
import * as perfil from "@services/perfis";
import * as perfilAplicacao from "../../services/perfis-aplicacoes";
import api from "@services/api";


interface IPerfilAplicacao {
  id: number;
  nome: string;
  descricao: string;
  atualizadoEm: string;
  atualizadoPorIp: string;
  criadoEm: string;
  criadoPorIp: string
}

interface IUpdateProfile{
  id_profile : number;
  nome : string;
  descricao : string;
  permissions : Number[];
}
interface IPerfil  {
  nome: string;
  descricao: string;
  id: number;
  perfil: IPerfilAplicacao;
};

export default function PerfilAcesso() {
  const [session] = useSession();
  const { setVisible, bindings } = useModal();
  const [empresaId, setEmpresaId] = useState<number>()
  const [perfilId, setPerfiId] = useState<number>();
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [perfisAplicacoes, setPerfisAplicacoes] = useState<IPerfilAplicacao[]>([]);
  
  const [acao, setAcao] = useState<"editar" | "cadastrar" | "copiar">(
    "cadastrar"
  );
  console.log(perfilId);
  
  const [, setToast] = useToasts();
  const router = useRouter();

  const getProfileData = async () => {
    const response = await api.get(`/perfil/${session?.usuario.empresa.id}`)
    
    const {data} = response
    
    return data
  }

  useEffect(() => {
      getProfileData().then(response => setPerfisAplicacoes(response))
      const companyId = session?.usuario.empresa.id
      setEmpresaId(companyId)
      
  },[])



  const perfis = useMemo(() => {
    const perfis: any = [];
    if (perfisAplicacoes) {
      perfisAplicacoes.forEach((item) => {
        perfis.push({
          ...item,
          link: (action: any, data: any) => (
            <Popover
              placement="right"
              content={
                <>
                  <Popover.Item>
                    <Text
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const item = data.rowValue as IPerfilAplicacao;
                        editar(item);
                      }}
                    >
                      Editar
                    </Text>
                  </Popover.Item>
                  <Popover.Item>
                    <Text
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const item = data.rowValue as IPerfilAplicacao;
                        deletar(item) ;
                      }}
                    >
                      Deletar
                    </Text>
                  </Popover.Item>
                  <Popover.Item>
                    <Text
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const item = data.rowValue as IPerfil;
                        copiar(item);
                      }}
                    >
                      Copiar
                    </Text>
                  </Popover.Item>
                </>
              }
            >
              <span style={{ cursor: "pointer" }}>
                <MoreHorizontal />
              </span>
            </Popover>
          ),
        });
      });
    }

    return perfis;
  }, [perfisAplicacoes]);

  async function copiar({
    nome,
    descricao,
    perfil,
  }: Omit<IPerfil, "id">) {
    setAcao("copiar");
    setVisible(true);
    setNome(nome);
    setDescricao(descricao);
    // setPerfisAplicacoes(perfil);
  }

  async function editar({
    nome,
    descricao,
    id,
  }: Omit<IPerfilAplicacao, "atualizadoEm" | "atualizadoPorIp" | "criadoEm" | "criadoPorIp">) {
    setAcao("editar");
    setVisible(true);
    setNome(nome);
    setDescricao(descricao);
    setPerfiId(id)
  }

 async function deletar({
    id,
  }: Omit<IPerfilAplicacao, "nome" | "descricao" | "atualizadoEm" | "atualizadoPorIp" | "criadoEm" | "criadoPorIp">) {
    try {
      await perfil.deletar(id);
    } catch (error) {
      const mensagem = error.response.data.mensagem;
      setToast({ text: mensagem, type: "warning" });
    }
    const perfisAtualizados = perfis.filter(
      (perfil: IPerfil) => perfil.id !== id
    );
    setPerfisAplicacoes(perfisAtualizados)
  }  

  async function cadastrar() {
    if(!nome || !descricao) {
      setToast({
        text: "Informe todos os dados do usuário.",
        type: "warning"}); 
        return
    } if (acao === "editar") {
      router.push({
        pathname: "/perfil-cadastro",
        query: { nome, descricao, perfilId },
      })
    } if (acao === "cadastrar") {
      
      router.push({
        pathname: "/perfil-cadastro",
        query: { nome, descricao, empresaId },
      });
    }
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
            setAcao("cadastrar");
            setVisible(true);
          }}
        >
          Adicionar
        </Button>
      </Row>

      <Spacer y={1} />
     
        <Grid>
          <Table data={perfis}>
            <Table.Column prop="link" width={15} />
            <Table.Column prop="nome" label="Nome" width={500} />
            <Table.Column prop="descricao" label="Descrição" width={500} />
          </Table>
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
            disabled={acao === "editar" ? true : false}
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
