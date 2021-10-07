import { Grid, Spacer, Text } from "@geist-ui/react";
import { Titulo } from "@components/Titulo";
import { GridAlinhaTextoCentro } from "@components/GridAlinhaTextoCentro";
import { BackgroundCinza } from "@components/BackgroundCinza/styled";
import DadosGeraisCte from "../DadosGeraisCte";

interface IProps {
  data: {
    impostos: {
      ICMS: {
        ICMS00: { CST: string; vBC: string; vICMS: string; pICMS: string };
        ICMS20: { vBC: string; vICMS: string; pICMS: string };
        ICMS60: { vBCSTRet: string; vICMSSTRet: string; pICMSSTRet: string };
        ICMSOutraUF: {
          vBCOutraUF: string;
          pICMSOutraUF: string;
          vICMSOutraUF: string;
        };
      };
    };
    valores_servicos: { vTPrest: string; vRec: string };
  };
}
export default function AbaTotais({ data }: IProps) {
  //console.log(data)
  return (
    <>
      <DadosGeraisCte data={data} />
      <BackgroundCinza>
        <Text h3>Totais </Text>
        <Grid.Container gap={2}>
          <GridAlinhaTextoCentro>
            <Titulo>Valor Total da Prestação de Serviços </Titulo>
            <Text small>{data?.valores_servicos?.vTPrest}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Valor a Receber</Titulo>
            <Text small>{data?.valores_servicos?.vRec}</Text>
          </GridAlinhaTextoCentro>
        </Grid.Container>
      </BackgroundCinza>
      <BackgroundCinza>
        <Text h3>Impostos </Text>
        <Grid.Container gap={2}>
          <GridAlinhaTextoCentro>
            <Titulo>CST </Titulo>
            <Text small>{data?.impostos?.ICMS?.ICMS00?.CST}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Valor do ICMS</Titulo>
            <Text small>{data?.impostos?.ICMS?.ICMS00?.vICMS}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>BC do ICMS Outra UF</Titulo>
            <Text small>{data?.impostos?.ICMS?.ICMSOutraUF?.vBCOutraUF}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Alíquota Redução ICMS ST Ret</Titulo>
            <Text small>{data?.impostos?.ICMS?.ICMS60?.vBCSTRet}</Text>
          </GridAlinhaTextoCentro>
          {/* <GridAlinhaTextoCentro>
            <Titulo>ICMS Indicador SN</Titulo>
            <Text small>{data?.informacoes_cte?.serie}</Text>
          </GridAlinhaTextoCentro> */}
        </Grid.Container>
        <Grid.Container gap={2}>
          <GridAlinhaTextoCentro>
            <Titulo>BC do ST Ret</Titulo>
            <Text small>{data?.impostos?.ICMS?.ICMS60?.vBCSTRet}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Alíquota ICMS Outra UF</Titulo>
            <Text small>{data?.impostos?.ICMS?.ICMSOutraUF?.pICMSOutraUF}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Alíquota de redução da BC</Titulo>
            <Text small>{data?.impostos?.ICMS?.ICMS60?.vBCSTRet}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>BC do ICMS</Titulo>
            <Text small>{data?.impostos?.ICMS?.ICMS00?.vBC}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Alíquota ICMS ST Ret </Titulo>
            <Text small>{data?.impostos?.ICMS?.ICMS60?.pICMSSTRet}</Text>
          </GridAlinhaTextoCentro>
        </Grid.Container>
        <Grid.Container gap={2}>
          <GridAlinhaTextoCentro>
            <Titulo>Valor ICMS Outra UF</Titulo>
            <Text small>{data?.impostos?.ICMS?.ICMSOutraUF?.vICMSOutraUF}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Alíquota do ICMS</Titulo>
            <Text small>{data?.impostos?.ICMS?.ICMS00?.pICMS}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Valor do ICMS ST Ret</Titulo>
            <Text small>{data?.impostos?.ICMS?.ICMS60?.vICMSSTRet}</Text>
          </GridAlinhaTextoCentro>
        </Grid.Container>
      </BackgroundCinza>
      <Spacer />
    </>
  );
}
