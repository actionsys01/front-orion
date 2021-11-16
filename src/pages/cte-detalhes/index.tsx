import React, {useMemo} from "react";
import BotaoVoltar from "@components/BotaoVoltar";
import { Tabs } from "@geist-ui/react";
import useRequest from "@hooks/useRequest";
import {Menu} from "./style";
import Head from "next/head";
import { useRouter } from "next/router";
import AbaCarga from "./AbaCarga";
import AbaCte from "./AbaCte";
import AbaInformacoesAdicionais from "./AbaInformacoesAdicionais";
import AbaTotais from "./AbaTotais";

export default function NfeDetalhes() {
  const router = useRouter();
  const { data } = useRequest<{
    informacoes_cte: {
      mod: string;
      serie: string;
      nNF: string;
      verProc: string;
      dhEmi: string;
      dhSaiEnt: string;
    };
    total: {
      ICMSTot: { vNF: string };
    };
    emitente: {
      xNome: string;
      CNPJ: string;
      enderEmit: {
        UF: string;
        nro: string;
        CEP: string;
        xBairro: string;
        xPais: string;
        xMun: string;
      };
      IE: string;
    };
  } | any>({
    url: `/ctes/${router.query?.chave_nota}`,
  });

 
 
  
  return (
    <>
      <Head>
        <title>Orion | CT-e - Detalhes </title>
      </Head>
      <div style={{ padding: 10 }}>
        <BotaoVoltar />
        <Menu>
        <Tabs initialValue="1" className="style">
          <Tabs.Item label="CTe" value="1">
            <AbaCte data={data} />
          </Tabs.Item>
          <Tabs.Item label="Totais" value="2">
            <AbaTotais data={data} />
          </Tabs.Item>
          <Tabs.Item label="Carga" value="3">
            <AbaCarga data={data} />
          </Tabs.Item>
          <Tabs.Item label="Informações Adicionais" value="4">
            <AbaInformacoesAdicionais data={data} />
          </Tabs.Item>
        </Tabs>
        </Menu>
      </div>
    </>
  );
}

NfeDetalhes.auth = true;
