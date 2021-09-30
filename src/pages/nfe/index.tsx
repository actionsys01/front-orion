import {useMemo , useEffect, useState } from "react";
import Filtro from "@components/Filtro";
import Paginacao from "@components/Paginacao";
import TabelaControle from "@components/TabelaControle";
import { useFiltro } from "@contexts/filtro";
import { Loading, Row, Spacer, Text } from "@geist-ui/react";
import Head from "next/head";
import { Provider, signIn, signOut, useSession } from "next-auth/client";
import NfePagination from "@components/NfePagination";
import  getNfePagesByCompanyId from '@services/nfe'
import INfeDto from '@services/nfe/dtos/INfeDTO';

export default function Nfe() {
  const { nfes } = useFiltro();
  const [session] = useSession();


  

  /* console.log(session?.usuario.empresa.plano) */



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
      <NfePagination company_id={session?.usuario.empresa.id} token={session?.token}  />
      {/* <TabelaControle notas={data?.nfes} pathname="/nfe-detalhes" />
      // <Paginacao totalPagina={totalPagina} setPagina={setPagina} /> */}


  
    </>
  );
}

Nfe.auth = true;
