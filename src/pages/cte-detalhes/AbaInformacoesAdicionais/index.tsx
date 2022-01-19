import { Spacer, Table, Text, Grid as GridGeist } from "@geist-ui/react";
import { BackgroundCinza } from "@components/BackgroundCinza/styled";
import DadosGeraisCte from "../DadosGeraisCte";
import { Grid } from "@components/Grid";
import { useEffect, useState } from "react";
import { GridAlinhaTextoCentro } from "@components/GridAlinhaTextoCentro";
import { Titulo } from "@pages/nfe-detalhes/styled";
import { CardStyle, LineStyle } from "@styles/vizualizar";

interface IProps {
  data: {
    complemento: {
      xObs: string;
      xCaracSer: string;
      xCaracAd: string;
      xEmi: string;
      fluxo: { xOrig: string };
      ObsCont:  { xCampo: string; xTexto: string }[];
    };
    imposto: {
      ICMSSN: { infAdFisco: string };
    };
    informacoes_cte: {cCT: string};
    versao: string
  };
}
export default function AbaInformacoesAdicionais({ data }) {
  const [observacoes, setObservacoes] = useState< { xCampo: string; xTexto: string }[]>([]);
  
  //console.log(data)

  useEffect(() => {
    // const observacoes = [];
    const ObsCont = data?.complemento?.ObsCont;
    if (Array.isArray(ObsCont)) {
      ObsCont.map((item) => {
        const { xCampo , xTexto } = item;
        observacoes.push({ xCampo, xTexto });
      });
    } else {
      const { xCampo, xTexto } = ObsCont;
      observacoes.push({ xCampo, xTexto });
    }
    setObservacoes(observacoes);
  }, [data]);

  return (
    <>
      <BackgroundCinza>
        <Text h3>Informações Adicionais de Interesse do Fisco</Text>
        <Text small>{data?.imposto?.ICMSSN?.infAdFisco} </Text>
      </BackgroundCinza>
      <Spacer />
      <BackgroundCinza>
        <Text h3>Informações Complementares de Interesse do Contribuinte </Text>
        <Text small>{data?.complemento?.xObs} </Text>
      </BackgroundCinza>
      <Spacer />
      <BackgroundCinza>
        <Text h3>Complementos </Text>
        <GridGeist.Container gap={2}>
          <GridGeist>
            <Titulo h6>Características Adicionais de Transporte </Titulo>
            <Text small>{data?.complemento?.xCaracAd}</Text>
          </GridGeist>
          <GridAlinhaTextoCentro>
            <Titulo>Características Adicionais do Serviço </Titulo>
            <Text small>{data?.complemento?.xCaracSer}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Funcionário emissor do CTe </Titulo>
            <Text small>{data?.complemento?.xEmi}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Código de Filial / Porto de Origem </Titulo>
            <Text small>{data?.complemento?.fluxo?.xOrig}</Text>
          </GridAlinhaTextoCentro>
        </GridGeist.Container>
      </BackgroundCinza>
      <Spacer />
      <Text h3>Observações </Text>
      {observacoes.length && (
        <Grid>
          <Table data={observacoes}>
            <Table.Column prop="xCampo" label="Identificação do campo" />
            <Table.Column prop="xTexto" label="Empregado NFe Emissor" />
          </Table>
        </Grid>
      )}
    </>
  );
}
