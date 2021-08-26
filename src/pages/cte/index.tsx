import Filtro from "@components/Filtro";
import Paginacao from "@components/Paginacao";
import TabelaControle from "@components/TabelaControle";
import { useFiltro } from "@contexts/filtro";
import { Loading, Row, Spacer, Text } from "@geist-ui/react";
import useRequest from "@hooks/useRequest";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Cte() {
  const { ctes } = useFiltro();
  const [pagina, setPagina] = useState(1);
  const [totalPagina, setTotalPagina] = useState<number>(0);
  const { data } = useRequest<{ ctes: []; total: number }>({
    url: "/ctes/controle",
    params: { pagina, filtro: JSON.stringify(ctes) },
  });

  useEffect(() => {
    if (data?.ctes) {
      setTotalPagina(data.total);
    }
  }, [data]);

  if (!data) return <Loading />;

  return (
    <>
      <Head>
        <title>Orion | Painel de Controle CTe</title>
      </Head>
      <Text h2>Painel de Controle CTe</Text>
      <Row justify="end" align="middle">
        <Filtro abaAtual={"cte"} data={ctes} />
        <Spacer x={0.2} />
      </Row>
      <Spacer y={0.5} />
      <TabelaControle notas={data?.ctes} pathname="/cte-detalhes" />
      <Paginacao totalPagina={totalPagina} setPagina={setPagina} />
    </>
  );
}

Cte.auth = true;
