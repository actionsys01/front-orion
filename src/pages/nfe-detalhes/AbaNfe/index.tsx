import { Collapse, Grid, Spacer, Text } from "@geist-ui/react";
import { useRouter } from "next/router";
import DadosGeraisNfe from "../DadosGeraisNfe";
import { GridAlinhaTextoCentro, Titulo } from "../styled";
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
    };
    total: {
      ICMSTot: { vNF: string };
    };
    emitente: {
      xNome: string;
      xFant: string;
      CNPJ: string;
      CNAE: string;
      IM: string;
      enderEmit: {
        fone: string;
        UF: string;
        nro: string;
        CEP: string;
        xBairro: string;
        xPais: string;
        xMun: string;
        xLgr: string;
      };
      IE: string;
    };
    destinatario: {
      xNome: string;
      xFant: string;
      CNPJ: string;
      CNAE: string;
      IM: string;
      enderDest: {
        fone: string;
        UF: string;
        nro: string;
        CEP: string;
        xBairro: string;
        xPais: string;
        xMun: string;
        xLgr: string;
      };
      IE: string;
    };
  };
}
export default function AbaNfe({ data }: IProps) {
  const router = useRouter();
  return (
    <>
      <DadosGeraisNfe data={data} />
      <BackgroundCinza>
        <Text h3>Dados NF-e </Text>
        <Grid.Container gap={2}>
          <GridAlinhaTextoCentro>
            <Titulo>Modelo </Titulo>
            <Text small>{data?.informacoes_nfe?.mod}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Série</Titulo>
            <Text small>{data?.informacoes_nfe?.serie}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Número</Titulo>
            <Text small>{data?.informacoes_nfe?.nNF}</Text>
          </GridAlinhaTextoCentro>
          <Grid>
            <Titulo>Data de emissão</Titulo>
            <Text small>{data?.informacoes_nfe?.dhEmi}</Text>
          </Grid>
          <Grid>
            <Titulo>Data de sáida/entrada</Titulo>
            <Text small>{data?.informacoes_nfe?.dhSaiEnt}</Text>
          </Grid>
          <GridAlinhaTextoCentro>
            <Titulo>Valor total NF-e</Titulo>
            <Text small>{data?.total?.ICMSTot.vNF}</Text>
          </GridAlinhaTextoCentro>
        </Grid.Container>
      </BackgroundCinza>

      <Spacer />
      <BackgroundCinza style={{ padding: 0 }}>
        <Collapse.Group>
          <Collapse title="Dados Emitente">
            <Grid.Container gap={2} direction="row">
              <Grid>
                <Titulo>Razão social</Titulo>
                <Text small>{data?.emitente?.xNome}</Text>
              </Grid>
              <Grid>
                <Titulo>Nome fantasia</Titulo>
                <Text small>{data?.emitente?.xFant}</Text>
              </Grid>
            </Grid.Container>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <Grid>
                <Titulo>CNPJ </Titulo>
                <Text small>{data?.emitente?.CNPJ}</Text>
              </Grid>
              <Grid>
                <Titulo>Inscrição Estadual</Titulo>
                <Text small>{data?.emitente?.IE}</Text>
              </Grid>
              <Grid>
                <Titulo>Inscrição Munincipal</Titulo>
                <Text small>{data?.emitente?.IM}</Text>
              </Grid>
              <Grid>
                <Titulo>CNAE Fiscal</Titulo>
                <Text small>{data?.emitente?.CNAE}</Text>
              </Grid>
            </Grid.Container>
            <Spacer />

            <Grid.Container gap={2} direction="row">
              <Grid>
                <Titulo>Telefone</Titulo>
                <Text small>{data?.emitente?.enderEmit?.fone}</Text>
              </Grid>
              <Grid>
                <Titulo>CEP</Titulo>
                <Text small>{data?.emitente?.enderEmit?.CEP}</Text>
              </Grid>
              <Grid>
                <Titulo>UF</Titulo>
                <Text small>{data?.emitente?.enderEmit?.UF}</Text>
              </Grid>
              <Grid>
                <Titulo>País</Titulo>
                <Text small>{data?.emitente?.enderEmit?.xPais}</Text>
              </Grid>
            </Grid.Container>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <Grid>
                <Titulo>Endereço </Titulo>
                <Text small>{data?.emitente?.enderEmit?.xLgr}</Text>
              </Grid>
              <Grid>
                <Titulo>Número</Titulo>
                <Text small>{data?.emitente?.enderEmit?.nro}</Text>
              </Grid>
            </Grid.Container>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <Grid>
                <Titulo>Bairro</Titulo>
                <Text small>{data?.emitente?.enderEmit?.xBairro}</Text>
              </Grid>
              <Grid>
                <Titulo>Município</Titulo>
                <Text small>{data?.emitente?.enderEmit?.xMun}</Text>
              </Grid>
            </Grid.Container>
          </Collapse>
          <Collapse title="Dados Destinatário">
            <Grid.Container gap={2} direction="row">
              <Grid>
                <Titulo>Razão social</Titulo>
                <Text small>{data?.destinatario?.xNome}</Text>
              </Grid>
              <Grid>
                <Titulo>Nome fantasia</Titulo>
                <Text small>{data?.destinatario?.xFant}</Text>
              </Grid>
            </Grid.Container>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <Grid>
                <Titulo>CNPJ </Titulo>
                <Text small>{data?.destinatario?.CNPJ}</Text>
              </Grid>
              <Grid>
                <Titulo>Inscrição Estadual</Titulo>
                <Text small>{data?.destinatario?.IE}</Text>
              </Grid>
              <Grid>
                <Titulo>Inscrição Munincipal</Titulo>
                <Text small>{data?.destinatario?.IM}</Text>
              </Grid>
              <Grid>
                <Titulo>CNAE Fiscal</Titulo>
                <Text small>{data?.destinatario?.CNAE}</Text>
              </Grid>
            </Grid.Container>
            <Spacer />

            <Grid.Container gap={2} direction="row">
              <Grid>
                <Titulo>Telefone</Titulo>
                <Text small>{data?.destinatario?.enderDest?.fone}</Text>
              </Grid>
              <Grid>
                <Titulo>CEP</Titulo>
                <Text small>{data?.destinatario?.enderDest?.CEP}</Text>
              </Grid>
              <Grid>
                <Titulo>UF</Titulo>
                <Text small>{data?.destinatario?.enderDest?.UF}</Text>
              </Grid>
              <Grid>
                <Titulo>País</Titulo>
                <Text small>{data?.destinatario?.enderDest?.xPais}</Text>
              </Grid>
            </Grid.Container>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <Grid>
                <Titulo>Endereço </Titulo>
                <Text small>{data?.destinatario?.enderDest?.xLgr}</Text>
              </Grid>
              <Grid>
                <Titulo>Número</Titulo>
                <Text small>{data?.destinatario?.enderDest?.nro}</Text>
              </Grid>
            </Grid.Container>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <Grid>
                <Titulo>Bairro</Titulo>
                <Text small>{data?.destinatario?.enderDest?.xBairro}</Text>
              </Grid>
              <Grid>
                <Titulo>Município</Titulo>
                <Text small>{data?.destinatario?.enderDest?.xMun}</Text>
              </Grid>
            </Grid.Container>
          </Collapse>
        </Collapse.Group>
      </BackgroundCinza>
      <Spacer />
      <BackgroundCinza>
        <Text h3>Situação Atual</Text>
        <Grid.Container gap={2}>
          <GridAlinhaTextoCentro>
            <Titulo>Status Sefaz </Titulo>
            <Text small>{router.query.status_sefaz}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Descrição Status</Titulo>
            <Text small>{router.query.desc_status_sefaz}</Text>
          </GridAlinhaTextoCentro>
        </Grid.Container>
      </BackgroundCinza>
    </>
  );
}
