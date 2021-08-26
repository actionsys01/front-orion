import Filtro from "@components/Filtro";
import Paginacao from "@components/Paginacao";
import TabelaControle from "@components/TabelaControle";
import { useFiltro } from "@contexts/filtro";
import { Loading, Row, Spacer, Text } from "@geist-ui/react";
import useRequest from "@hooks/useRequest";
import Head from "next/head";
import { useMemo } from "react";
import { useEffect, useState } from "react";

export default function Nfe() {
  const { nfes } = useFiltro();
  const [pagina, setPagina] = useState(1);

  const { data } = useRequest<{ nfes: []; total: number }>({
    url: "/nfes/controle",
    params: { pagina, filtro: JSON.stringify(nfes) },
  });



  const totalPagina = useMemo(() => {
    if (data?.nfes) {
      return data.total;
    }
  }, [data, nfes]);

  if (!data) return <Loading />;

  return (
    <>
      <Head>
        <title>Orion | Painel de Controle NFe</title>
      </Head>
      <Text h2>Painel de Controle NFe</Text>
      <Row justify="end" align="middle">
        <Filtro abaAtual="nfe" data={nfes} />
        <Spacer x={0.2} />
      </Row>
      <Spacer y={0.5} />
      <TabelaControle notas={data?.nfes} pathname="/nfe-detalhes" />
      <Paginacao totalPagina={totalPagina} setPagina={setPagina} />
    </>
  );
}

Nfe.auth = true;
