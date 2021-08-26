import { Grid } from "@components/Grid";
import { Checkbox, Loading, Table, Text } from "@geist-ui/react";
import useRequest from "@hooks/useRequest";
import * as funcionalidade from "@services/funcionalidades";
import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
const EMPRESA_NAO_ASSOCIADA = 0;

type IFuncionalidade = {
  funcionalidades_empresas: [];
  id: number;
};
export default function Funcionalidades() {
  const { data, mutate } = useRequest<IFuncionalidade[]>({
    url: `/funcionalidades?empresa_id=${EMPRESA_NAO_ASSOCIADA}`,
  });

  const funcionalidades = useMemo(() => {
    const funcionalidades: any = [];
    if (data) {
      data.forEach((item) => {
        funcionalidades.push({
          ...item,
          checkbox: (
            <Checkbox
              checked={item.funcionalidades_empresas.length ? true : false}
              onChange={(e) => {
                const status = e.target.checked;
                const id = item.id;
                handleAtualizar(status, id);
              }}
            />
          ),
        });
      });
    }

    return funcionalidades;
  }, [data]);

  async function handleAtualizar(status: boolean, id: number) {
    if (status) {
      const response = await funcionalidade.ativar(id);

      const funcionalidades_empresas = response.data;

      const funcionalidadesAtualizadas = funcionalidades.map(
        (funcionalidade) => {
          if (funcionalidade.id === id)
            return {
              ...funcionalidade,
              funcionalidades_empresas: [funcionalidades_empresas],
            };

          return { ...funcionalidade };
        }
      );

      mutate(funcionalidadesAtualizadas);
    } else {
      funcionalidade.desativar(id);

      const funcionalidadesAtualizadas = funcionalidades.map(
        (funcionalidade) => {
          if (funcionalidade.id === id)
            return { ...funcionalidade, funcionalidades_empresas: [] };

          return { ...funcionalidade };
        }
      );
      mutate(funcionalidadesAtualizadas, false);
    }
  }

  if (!data) return <Loading />;

  return (
    <>
      <Head>
        <title>Orion | Funcionalidades</title>
      </Head>
      <Text h2>Funcionalidades</Text>
      <Grid>
        <Table data={funcionalidades}>
          <Table.Column prop="checkbox" label="Status" />
          <Table.Column prop="descricao_01" label="Funcionalidades" />
          <Table.Column
            prop="grupo_codigo"
            label="Perfil de acesso"
            width={"30%"}
          />
        </Table>
      </Grid>
    </>
  );
}

Funcionalidades.auth = true;
