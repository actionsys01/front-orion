import React , {useCallback, useEffect, useState} from "react"
import BotaoVoltar from "@components/BotaoVoltar";
import { Loading, Tabs } from "@geist-ui/react";
import useRequest from "@hooks/useRequest";
import {Menu} from "./styled";
import Head from "next/head";
import { useRouter } from "next/router";
import AbaNfe from "./AbaNfe";
import AbaProdutosServicos from "./AbaProdutosServicos";
import AbaTotais from "./AbaTotais";
import AbaTransporte from "./AbaTransporte";
import AbaCobranca from "./AbaCobranca";
import AbaInformacoesAdicionais from "./AbaInformacoesAdicionais";
import AbaNotaReferenciada from "./AbaNotaReferenciada";
import AbaRastro from "./AbaRastro";
import getNfeData from "@services/nfe/getNfeData"
import { useSession } from "next-auth/client";
import { nfeXmlProps } from "@services/nfe/dtos/nfeXml"

export default function NfeDetalhes() {
  const router = useRouter();
  const [ session ] = useSession()
  const company_id = Number(session?.usuario.empresa.id)
  const chave_nota = router.query?.chave_nota.toString()
  const [ data, setData] = useState<nfeXmlProps[]>([])


  const getData = useCallback(async () => {
    const response = await getNfeData(chave_nota, company_id)
    const nfeRes = response.data
    // console.log(`nfeRes`, nfeRes)
    setData(nfeRes)
    return nfeRes
    },[data])

    useEffect(() => {
      getData()
    }, [data])

  // if (!data) return <Loading />;
  return (
    <>
      <Head>
        <title>Orion | NFe - Detalhes </title>
      </Head>
      <div style={{ padding: 10 }}>
        <BotaoVoltar />
        <Menu>
        <Tabs initialValue="1" className="style">
          <Tabs.Item label="NFe" value="1">
            <AbaNfe data={data} />
          </Tabs.Item>
          <Tabs.Item label="Produtos/Serviços" value="2">
            <AbaProdutosServicos data={data} />
          </Tabs.Item>
          <Tabs.Item label="Totais" value="3">
            <AbaTotais data={data} />
          </Tabs.Item>
          <Tabs.Item label="Transporte" value="4">
            <AbaTransporte data={data} />
          </Tabs.Item>
          <Tabs.Item label="Cobrança" value="5">
            <AbaCobranca data={data} />
          </Tabs.Item>
          <Tabs.Item label="Informações adicionais" value="6">
            <AbaInformacoesAdicionais data={data} />
          </Tabs.Item>
          <Tabs.Item label="Nota referenciada" value="7">
            <AbaNotaReferenciada data={data} />
          </Tabs.Item>
          <Tabs.Item label="Rastro" value="8">
            <AbaRastro data={data} />
          </Tabs.Item>
        </Tabs>
        </Menu>
      </div>
    </>
  );
}

NfeDetalhes.auth = true;
