import { BackgroundCinza } from "@components/BackgroundCinza/styled";
import { Grid as GridGeist, Spacer, Text } from "@geist-ui/react";
import { useRouter } from "next/router";
import DadosGeraisNfe from "../DadosGeraisNfe";
import { GridAlinhaTextoCentro, Titulo } from "../styled";

interface IProps {
  data: {
    informacoes_nfe: {
      mod: string;
      serie: string;
      nNF: string;
      verProc: string;
      dhEmi: string;
      dhSaiEnt: string;
    };
    total: {
      ICMSTot: {
        vNF: string;
        vICMS: string;
        vBCST: string;
        vBC: string;
        vST: string;
        vProd: string;
        vFrete: string;
        vSeg: string;
        vDesc: string;
        vII: string;
        vIPI: string;
        vOutro: string;
        vCOFINS: string;
        vPIS: string;
        vICMSDeson: string;
      };
    };
    versao: string;
  };
}
export default function AbaTotais({ data }: IProps) {
  return (
    <>
      <DadosGeraisNfe data={data} />
      <BackgroundCinza>
        <Text h3>Totais </Text>
        <GridGeist.Container gap={2}>
          <GridGeist>
            <Titulo h6>Base de Calculo do IMCS </Titulo>
            <Text small>{data?.total.ICMSTot?.vBC}</Text>
          </GridGeist>
          <GridAlinhaTextoCentro>
            <Titulo>Valor Total do ICMS </Titulo>
            <Text small>{data?.total.ICMSTot?.vICMS}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Valor Total do ICMS desonerado</Titulo>
            <Text small>{data?.total?.ICMSTot?.vICMSDeson}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Base de Cálculo do IMCS ST</Titulo>
            <Text small>{data?.total?.ICMSTot?.vBCST}</Text>
          </GridAlinhaTextoCentro>
        </GridGeist.Container>
        <GridGeist.Container gap={2}>
          <GridGeist>
            <Titulo h6>Valor ICMS Subistituição </Titulo>
            <Text small>{data?.total.ICMSTot?.vST}</Text>
          </GridGeist>
          <GridAlinhaTextoCentro>
            <Titulo>Valor Total dos Produtos </Titulo>
            <Text small>{data?.total.ICMSTot?.vProd}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Valor do Frete</Titulo>
            <Text small>{data?.total?.ICMSTot?.vFrete}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Valor do Seguro</Titulo>
            <Text small>{data?.total?.ICMSTot?.vSeg}</Text>
          </GridAlinhaTextoCentro>
        </GridGeist.Container>
        <GridGeist.Container gap={2}>
          <GridGeist>
            <Titulo h6>Outras Desp. Acessórias </Titulo>
            <Text small>{data?.total.ICMSTot?.vOutro}</Text>
          </GridGeist>
          <GridAlinhaTextoCentro>
            <Titulo>Valor Total do IPI </Titulo>
            <Text small>{data?.total.ICMSTot?.vIPI}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Valor Total da NF-e</Titulo>
            <Text small>{data?.total?.ICMSTot?.vNF}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Valor dos Desconto</Titulo>
            <Text small>{data?.total?.ICMSTot?.vDesc}</Text>
          </GridAlinhaTextoCentro>
        </GridGeist.Container>
        <GridGeist.Container gap={2}>
          <GridGeist>
            <Titulo h6>Valor Total 2 </Titulo>
            <Text small>{data?.total.ICMSTot?.vII}</Text>
          </GridGeist>
          <GridAlinhaTextoCentro>
            <Titulo>Valor do PIS</Titulo>
            <Text small>{data?.total.ICMSTot?.vPIS}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Valor do COFINS</Titulo>
            <Text small>{data?.total?.ICMSTot?.vCOFINS}</Text>
          </GridAlinhaTextoCentro>
        </GridGeist.Container>
      </BackgroundCinza>
    </>
  );
}
