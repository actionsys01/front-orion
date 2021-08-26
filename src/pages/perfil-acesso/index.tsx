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
import { MoreHorizontal, Plus } from "@geist-ui/react-icons";
import useRequest from "@hooks/useRequest";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { Grid } from "../../components/Grid";
import * as perfil from "../../services/perfis";
import * as perfilAplicacao from "../../services/perfis-aplicacoes";

interface IPerfilAplicacao {
  nome: string;
  acao: string;
  descricao: string;
  perfil_id: number;
  codigo_id: number;
  id: number;
}
type IPerfil = {
  nome: string;
  descricao: string;
  id: number;
  perfis_aplicacoes: IPerfilAplicacao[];
};

export default function PerfilAcesso() {
  const { setVisible, bindings } = useModal();
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [perfisAplicacoes, setPerfisAplicacoes] = useState<IPerfilAplicacao[]>(
    []
  );
  const [perfilId, setPerfiId] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const [acao, setAcao] = useState<"editar" | "cadastrar" | "copiar">(
    "cadastrar"
  );

  const [, setToast] = useToasts();

  const router = useRouter();

  const { data, mutate } = useRequest<IPerfil[]>({ url: `/perfis/empresas` });

  const perfis = useMemo(() => {
    const perfis: any = [];
    if (data) {
      data.forEach((item) => {
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
                        const item = data.rowValue as IPerfil;
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
                        const item = data.rowValue as IPerfil;
                        deletar(item);
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
  }, [data]);

  async function copiar({
    nome,
    descricao,
    perfis_aplicacoes,
  }: Omit<IPerfil, "id">) {
    setAcao("copiar");
    setVisible(true);
    setNome(nome);
    setDescricao(descricao);
    setPerfisAplicacoes(perfis_aplicacoes);
  }

  async function editar({
    nome,
    descricao,
    id,
  }: Omit<IPerfil, "perfis_aplicacoes">) {
    setAcao("editar");
    setVisible(true);
    setNome(nome);
    setDescricao(descricao);
    setPerfiId(id);
  }

  async function deletar({
    id,
    perfis_aplicacoes,
  }: Omit<IPerfil, "nome" | "descricao">) {
    try {
      await perfil.deletar(id);

      perfis_aplicacoes.map(async (perfil) => {
        const { id } = perfil;
        perfilAplicacao.deletar(id);
      });

      const perfisAtualizados = perfis.filter(
        (perfil: IPerfil) => perfil.id !== id
      );

      mutate(perfisAtualizados, false);
    } catch (error) {
      const mensagem = error.response.data.mensagem;
      setToast({ text: mensagem, type: "warning" });
    }
  }

  async function cadastrar() {
    setLoading(true);
    let id: number;

    try {
      if (acao === "editar") {
        const response = await perfil.atualizar({
          descricao,
          id: perfilId,
        });

        id = response.data.id;
      } else if (acao === "cadastrar") {
        const response = await perfil.criar({ descricao, nome });

        id = response.data.id;
      } else {
        const response = await perfil.criar({ descricao, nome });

        id = response.data.id;

        perfisAplicacoes.map(async (perfil) => {
          const { codigo_id, acao, descricao, nome } = perfil;
          await perfilAplicacao.criar({
            codigo_id,
            perfil_id: id,
            acao,
            descricao,
            nome,
          });
        });
      }

      router.push({
        pathname: "/perfil-cadastro",
        query: { nome, descricao, id, acao },
      });
    } catch (error) {
      setLoading(false);
      const mensagem = error.response.data.mensagem;
      setToast({ text: mensagem, type: "warning" });
    }
  }

  if (!data) return <Loading />;

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
      {perfis.length ? (
        <Grid>
          <Table data={perfis}>
            <Table.Column prop="link" width={15} />
            <Table.Column prop="nome" label="Nome" width={500} />
            <Table.Column prop="descricao" label="Descrição" width={500} />
          </Table>
        </Grid>
      ) : (
        <NaoEncontrado />
      )}

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
        <Modal.Action onClick={cadastrar} loading={loading}>
          CONTINUAR
        </Modal.Action>
      </Modal>
      <style>{`.backdrop {z-index: 1200 !important}`}</style>
    </>
  );
}

PerfilAcesso.auth = true;
