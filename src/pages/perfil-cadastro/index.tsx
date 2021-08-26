import BotaoVoltar from "@components/BotaoVoltar";
import { Grid } from "@components/Grid";
import NaoEncontrado from "@components/NaoEncontrado";
import { Checkbox, Input, Loading, Spacer, Table, Text } from "@geist-ui/react";
import useRequest from "@hooks/useRequest";
import * as perfilAplicacao from "@services/perfis-aplicacoes";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

type IPerfil = {
  aplicacoes: string;
  perfis_aplicacoes?: [];
  descricao_01: string;
  descricao: string;
  codigo_id: number;
  acao: string;
};
type IRow = {
  grupo_codigo: string;
  descricao_01: string;
  acao: string;
  id: number;
  perfis_aplicacoes: [{ id: number }];
};

export default function PerfilCadastro() {
  const router = useRouter();
  const perfil_id = router.query.id;

  const { data, mutate } = useRequest<IPerfil[]>({
    url: "/codigos",
    params: {
      grupo_codigo: "PROGRAMAS",
      perfil_id,
    },
  });
  const aplicacoes = useMemo(() => {
    const aplicacoes: any = [];
    if (data) {
      data.forEach((item) => {
        aplicacoes.push({
          ...item,
          checkbox: (actions: any, data: any) => (
            <Checkbox
              checked={item.perfis_aplicacoes?.length ? true : false}
              onChange={(e) => {
                const status = e.target.checked;
                const item = data.rowValue;
                handleRow(status, item);
              }}
            />
          ),
        });
      });
    }

    return aplicacoes;
  }, [data]);

  async function handleRow(status: boolean, item: IRow) {
    const {
      id: codigo_id,
      acao,
      descricao_01,
      grupo_codigo,
      perfis_aplicacoes,
    } = item;

    const perfil_id = Number(router.query.id);

    if (status) {
      const response = await perfilAplicacao.criar({
        codigo_id,
        perfil_id,
        acao,
        descricao: descricao_01,
        nome: grupo_codigo,
      });

      const perfil_aplicacao = response.data;

      const aplicacoesAtualizadas = aplicacoes.map((aplicacao) => {
        if (aplicacao.codigo_id === codigo_id)
          return { ...aplicacao, perfis_aplicacoes: [perfil_aplicacao] };

        return { ...aplicacao };
      });

      mutate(aplicacoesAtualizadas, false);
    } else {
      const { id } = perfis_aplicacoes[0];

      await perfilAplicacao.deletar(id);

      const aplicacoesAtualizadas = aplicacoes.map((aplicacao) => {
        if (aplicacao.codigo_id === codigo_id)
          return { ...aplicacao, perfis_aplicacoes: [] };

        return { ...aplicacao };
      });

      mutate(aplicacoesAtualizadas, false);
    }
  }

  if (!data) return <Loading />;

  return (
    <>
      <Head>
        <title>Orion | Perfil de Cadastro</title>
      </Head>
      <div>
        <BotaoVoltar />
      </div>
      <Text h2>Perfil de Cadastro</Text>
      <Grid.Container gap={0.8} direction="row" alignItems="stretch">
        <Grid xs={12}>
          <Input
            disabled={true}
            width="100%"
            placeholder="Ex: ADMIN"
            value={router.query.nome as string}
          >
            Nome
          </Input>
        </Grid>
        <Grid xs={12}>
          <Input
            width="100%"
            disabled={true}
            placeholder="Ex: Permitir deletar"
            value={router.query.descricao as string}
          >
            Descrição
          </Input>
        </Grid>
      </Grid.Container>
      <Spacer y={0.5} />
      {aplicacoes.length ? (
        <Grid>
          <Table data={aplicacoes}>
            <Table.Column prop="checkbox" label="status" />
            <Table.Column prop="grupo_codigo_id" label="aplicativo" />
            <Table.Column prop="descricao_01" label="descrição" />
            <Table.Column prop="acao" label="categoria" />
          </Table>
        </Grid>
      ) : (
        <NaoEncontrado />
      )}
    </>
  );
}

PerfilCadastro.auth = true;
