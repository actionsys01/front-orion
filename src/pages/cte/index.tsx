import Filtro from '@components/Filtro';
import CtePagination from '@components/CtePagination';
import { useFiltro } from '@contexts/filtro';
import { Row, Spacer, Text } from '@geist-ui/react';
import Head from 'next/head';

import { useSession } from 'next-auth/client';

export default function Cte() {
    const { ctes } = useFiltro();

    const [session] = useSession();

    return (
        <>
            <Head>
                <title>Orion | Painel de Controle CT-e</title>
            </Head>
            <Text h2>Painel de Controle CT-e</Text>
            <Row justify="end" align="middle">
                <Filtro abaAtual={'cte'} data={ctes} />
                <Spacer x={0.2} />
            </Row>
            <Spacer y={0.5} />
            <CtePagination
                company_id={session?.usuario.empresa.id}
                token={session?.token}
            />
        </>
    );
}

Cte.auth = true;
