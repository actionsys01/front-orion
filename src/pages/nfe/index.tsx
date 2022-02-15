import React from 'react';
// import Filtro from '@components/Filtro';
import Filtro from '@components/Filtro-Notas/Filter-Modal';
import { useFiltro } from '@contexts/filtro';
import { Row, Spacer, Text } from '@geist-ui/react';
import Head from 'next/head';
import { useSession } from 'next-auth/client';
import NfePagination from '@components/NfePagination';

export default function Nfe() {
  const { nfes } = useFiltro();
  const [session] = useSession();

  /* console.log(session?.usuario.empresa.plano) */

  return (
    <>
      <Head>
        <title>Orion | Painel de Controle NF-e</title>
      </Head>
      <Text h2>Painel de Controle NF-e</Text>
      <Row justify="end" align="middle">
        <Filtro abaAtual="nfe" data={nfes} />
        <Spacer x={0.2} />
      </Row>
      <Spacer y={0.5} />
      <NfePagination company_id={session?.usuario.empresa.id} />
    </>
  );
}

Nfe.auth = true;
