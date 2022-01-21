import { Spacer, Text } from "@geist-ui/react";
import { Grid } from "@components/Grid";
import DadosGeraisNfe from "../DadosGeraisNfe";
import { Titulo } from "@components/Titulo";
import { BackgroundCinza } from "@components/BackgroundCinza/styled";

interface IProps {
  data: {
    informacoes_nfe: {
      mod: string;
      serie: string;
      nNF: string;
      verProc: string;
      dhEmi: string;
      dhSaiEnt: string;
      tpImp: string;
    };
    informacoes_adicionais: {
      infCpl: string;
      infAdFisco: string;
      compra: {
        xNEmp: string;
        xPed: string;
        xCont: string;
      };
    };
    duplicadas: [
      {
        nDup: string;
        dVenc: string;
        vDup: string;
      }
    ];
    versao: string;
  };
}
export default function AbaInformacoesAdicionais({ data }) {
  return (
    <>
      <BackgroundCinza>
        <Text h3>Informações Adicionais </Text>
        <Grid.Container gap={2} direction="row">
          <Grid>
            <Titulo>Formato de Impressão do DANFE </Titulo>
            <Text small>{data?.informacoes_nfe?.tpImp}</Text>
          </Grid>
        </Grid.Container>
      </BackgroundCinza>
      <Spacer />
      <BackgroundCinza>
        <Text h3>Informações de Compra </Text>
        <Grid.Container gap={2} direction="row">
          <Grid>
            <Titulo>Nota de Empenho </Titulo>
            <Text small>{data?.informacoes_adicionais?.compra?.xNEmp}</Text>
          </Grid>
          <Grid>
            <Titulo>Pedido </Titulo>
            <Text small>{data?.informacoes_adicionais?.compra?.xPed}</Text>
          </Grid>
          <Grid>
            <Titulo>Contrato </Titulo>
            <Text small>{data?.informacoes_adicionais?.compra?.xCont}</Text>
          </Grid>
        </Grid.Container>
      </BackgroundCinza>
      <Spacer />
      <BackgroundCinza>
        <Text h3>Informações Complementares de Interesse do Contribuinte</Text>
        <Grid.Container gap={2} direction="row">
          <Grid>
            <Titulo>Informações Complementares Contibuinte </Titulo>
            <Text small>{data?.informacoes_adicionais.infCpl}</Text>
          </Grid>
          <Grid>
            <Titulo>Informações Adicionais do Fisco </Titulo>
            <Text small>{data?.informacoes_adicionais.infAdFisco}</Text>
          </Grid>
        </Grid.Container>
      </BackgroundCinza>
    </>
  );
}
