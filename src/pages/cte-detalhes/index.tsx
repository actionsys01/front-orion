import React, {useMemo,useState, useCallback, useEffect} from "react";
import { TopMenu, CardStyle } from "@styles/vizualizar";
import BotaoVoltar from "@components/BotaoVoltar";
import Head from "next/head";
import { useRouter } from "next/router";
import AbaCarga from "./AbaCarga";
import AbaCte from "./AbaCte";
import AbaInformacoesAdicionais from "./AbaInformacoesAdicionais";
import AbaTotais from "./AbaTotais";
import DadosGeraisCte from "./DadosGeraisCte";
import getCteXml from "@services/cte/getCteXml";
import { CteXmlProps } from "@services/cte-mongo/cte-type/cte";
import { useToasts } from "@geist-ui/react";

export default function NfeDetalhes() {
  const router = useRouter();
  const [ data, setData ] = useState<CteXmlProps>()
  const [, setToast] = useToasts();
  const [ tab, setTab ] = useState<'AbaCte' | 'AbaTotais' | 'AbaCarga' | 'AbaInformacoesAdicionais'>("AbaCte")

  const getXml = useCallback(async() => {
      try {
        const response = await getCteXml(String(router.query?.chave_nota))
        const data = response.data
        setData(data)
      } catch (error) {
        console.log(error)
        setToast({
          text: "Houve um problema tente novamente",
          type: "warning"
      })
      }
    },[],)

    useEffect(() => {
      getXml()
    }, [])

  return (
    <>
      <Head>
        <title>Orion | CT-e - Detalhes </title>
      </Head>
      <BotaoVoltar />
      <TopMenu>
        <ul>
          <li 
            onClick={() => setTab('AbaCte')}
            className={tab === 'AbaCte' && 'active'}>
              CT-e</li>
          <li 
            onClick={() => setTab('AbaTotais')}
            className={tab === 'AbaTotais' && 'active'}>
              Totais</li>
          <li 
            onClick={() => setTab('AbaCarga')}
            className={tab === 'AbaCarga' && 'active'}>
              Carga</li>
          <li 
            onClick={() => setTab('AbaInformacoesAdicionais')}
            className={tab === 'AbaInformacoesAdicionais' && 'active'}>
              Informações Adicionais</li>
        </ul>
      </TopMenu>
      <DadosGeraisCte data={data} />

      {tab === 'AbaCte' ? <AbaCte data={data}/> :
      tab === 'AbaTotais' ? <AbaTotais data={data}/> : 
      tab === 'AbaCarga' ? <AbaCarga data={data}/> :
      tab === 'AbaInformacoesAdicionais' ? <AbaInformacoesAdicionais data={data}/> : ""
    }
    </>
  );
}

NfeDetalhes.auth = true;
