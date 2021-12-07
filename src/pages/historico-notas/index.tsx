import React, {useEffect, useState, useMemo} from "react";
import {Wrapper} from "./style";
import BotaoVoltar from "@components/BotaoVoltar";
import { useToasts} from "@geist-ui/react";
import Head from "next/head";
import { useRouter } from "next/router"
import api from "@services/api";
import {format} from "date-fns"
import { useSession } from "next-auth/client";

interface HistoricoTotal {
    total: number;
    historico: Historico
}

interface Historico {
    id: number;
    chave_nota: string;
    sequencia: number;
    status: number;
    criado_por_app: string;
    atualizado_por_app: string;
    criado_em: string;
    atualizado_em: string;
    descricao: string
}


export default function Historico () {
    const router = useRouter()
    const [session] = useSession();
    const key = router.query.chave_nota
    const empresa_id = Number(session?.usuario.empresa.id)
    const [, setToast] = useToasts();
    const [historicalData, setHistoricalData] = useState<Historico[]>([])

   

    async function getHistoricalNotes() {
        // await api.post(`/historico`, {
        //     empresa: empresa_id, chave_nota: key , sequencia: 22, status: 12, criado_por_app: "gra web", atualizado_por_app: "gra web"
        // })
        try {
            const response = await api.get(`/historico/?empresa_id=${empresa_id}&chave_nota=${key}`)
            const data  = await response.data
           
            return data
        } catch (error) {
            setToast({
                text: "Não foi possível localizar o histórico da nota fornecida.",
                type: "warning"
            })
        }
    }

    useEffect(() => {
        getHistoricalNotes().then(response => setHistoricalData(response.historico))
    }, [])

    const gatheredData = useMemo(() => {
        const allData: any = [];
        if(historicalData) {
            historicalData.forEach((item) => {
                allData.push({
                    ...item,
                    time: format(new Date(item.criado_em), "dd/MM/yyyy HH:mm:ss")
                })
            })
        }
        return allData
    }, [historicalData])

    return <>
    <Head>
        <title>Orion | Histórico da Nota </title>
      </Head>
      <BotaoVoltar />
      <h1>Histórico da Nota</h1>
    <Wrapper>
        <table>
            <thead>
                <tr>
                    <th>Data / Hora</th>
                    <th>Status</th>
                    <th>Definição de Status</th>
                </tr>
            </thead>
            <tbody>
               {gatheredData?.map((item: any, i: any) => (
                <tr key={i}>
                    <td>{item.time}</td>
                    <td>{item.status}</td>
                    <td>{item.descricao}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </Wrapper>

    </>
}



Historico.auth = true