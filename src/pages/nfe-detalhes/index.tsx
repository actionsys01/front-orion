import React , {useCallback, useEffect, useState} from "react"
import BotaoVoltar from "@components/BotaoVoltar";
import { Loading, Tabs } from "@geist-ui/react";
import { TopNfeMenu } from "./styled";
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
import DadosGeraisNfe from "./DadosGeraisNfe";
import getNfeData from "@services/nfe/getNfeData"
import { useSession } from "next-auth/client";
import { NfeProps } from "@services/nfe/dtos/nfeXml"
import { useToasts } from "@geist-ui/react";
import { TopMenu, CardStyle } from "@styles/vizualizar";

export default function NfeDetalhes() {
  const router = useRouter();
  const [ session ] = useSession()
  const [, setToast] = useToasts();
  const company_id = Number(session?.usuario.empresa.id)
  const chave_nota = router.query?.chave_nota.toString()
  const [ data, setData] = useState<NfeProps>()
  const [ tab, setTab ] = useState<'AbaNfe' | 'AbaProdutosServicos' |
    'AbaTotais' | 'AbaTransporte' | 'AbaCobranca' |
    'AbaInformacoesAdicionais' | 'AbaNotaReferenciada' | 'AbaRastro'>("AbaNfe")

  const getData = useCallback(async () => {
      try {
        const response = await getNfeData(chave_nota, company_id)
        const nfeRes = response.data
      // console.log(`nfeRes`, nfeRes)
        setData(nfeRes)
        return nfeRes
      } catch (error) {
        setToast({
          text: "Houve um problema tente novamente",
          type: "warning"
      })
    }
    },[])

    useEffect(() => {
      getData()
    }, [])

  // if (!data) return <Loading />;
  return (
    <>
      <Head>
        <title>Orion | NFe - Detalhes </title>
      </Head>
      <BotaoVoltar />
      <TopNfeMenu>
        <ul>
          <li 
            onClick={() => setTab('AbaNfe')}
            className={tab === 'AbaNfe' && 'active'}>
              NF-e</li>
          <li 
            onClick={() => setTab('AbaProdutosServicos')}
            className={tab === 'AbaProdutosServicos' &&  'active'}>
              Produtos/Serviços</li>
          <li 
            onClick={() => setTab('AbaTotais')}
            className={tab === 'AbaTotais' && 'active'}>
              Totais</li>
          <li 
            onClick={() => setTab('AbaTransporte')}
            className={tab === 'AbaTransporte' && 'active'}>
              Transporte</li>
          <li 
            onClick={() => setTab('AbaCobranca')}
            className={tab === 'AbaCobranca' && 'active'}>
              Cobrança</li>
          <li 
            onClick={() => setTab('AbaInformacoesAdicionais')}
            className={tab === 'AbaInformacoesAdicionais' && 'active'}>
              Informações Adicionais</li>
          <li 
            onClick={() => setTab('AbaNotaReferenciada')}
            className={tab === 'AbaNotaReferenciada' && 'active'}>
              Nota Referenciada</li>
          <li
            onClick={() => setTab('AbaRastro')}
            className={tab === 'AbaRastro' && 'active'}>  
              Rastro</li>
        </ul>
      </TopNfeMenu>
      <DadosGeraisNfe data={data}/>

      {tab === 'AbaNfe' ?  <AbaNfe data={data}/> :
      tab === 'AbaProdutosServicos' ? <AbaProdutosServicos data={data}/> : 
      tab === 'AbaTotais' ? <AbaTotais data={data}/> :
      tab === 'AbaTransporte' ? <AbaTransporte data={data}/> :
      tab === 'AbaCobranca' ? <AbaCobranca data={data}/> :
      tab === 'AbaInformacoesAdicionais' ? <AbaInformacoesAdicionais data={data}/> :
      tab === 'AbaNotaReferenciada' ? <AbaNotaReferenciada data={data}/> :
      tab === 'AbaRastro' ? <AbaRastro data={data}/> : ''
      }
      
    </>
  );
}

NfeDetalhes.auth = true;
