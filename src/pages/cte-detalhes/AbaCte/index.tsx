import { Collapse, Grid, Spacer, Text } from "@geist-ui/react";
import { Titulo } from "@components/Titulo";
import { GridAlinhaTextoCentro } from "@components/GridAlinhaTextoCentro";
import { useRouter } from "next/router";
import { BackgroundCinza } from "@components/BackgroundCinza/styled";
import DadosGeraisCte from "../DadosGeraisCte";

interface IProps {
  data: {
    informacoes_cte: {
      mod: string;
      serie: string;
      cCT: string;
      verProc: string;
      dhEmi: string;
      dhSaiEnt: string;
      modal: string;
      tpServ: string;
      nCFOP: string;
      tpEmis: string;
      xMunFim: string;
      UFFim: string;
      UFIni: string;
      xMunIni: string;
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
    remetente: {
      xNome: string;
      xFant: string;
      CNPJ: string;
      CNAE: string;
      IM: string;
      enderReme: {
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
    versao: string;
    impostos: {
      ICMS: {
        ICMS00: { vBC: string; vICMS: string };
      };
    };
    valores_servicos: {
      vTPrest: string;
    };
    sefaz: {
      status: string;
      descricao: string;
    };
  };
}
export default function AbaCte({ data }: IProps) {
  const router = useRouter();
  return (
    <>
      <DadosGeraisCte data={data} />
      <BackgroundCinza>
        <Text h3>Dados CT-e </Text>
        <Grid.Container gap={2}>
          <GridAlinhaTextoCentro>
            <Titulo>Modelo </Titulo>
            <Text small>{data?.informacoes_cte?.mod}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Série</Titulo>
            <Text small>{data?.informacoes_cte?.serie}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Número</Titulo>
            <Text small>{data?.informacoes_cte?.cCT}</Text>
          </GridAlinhaTextoCentro>
          <Grid>
            <Titulo>Data de emissão</Titulo>
            <Text small>{data?.informacoes_cte?.dhEmi}</Text>
          </Grid>
        </Grid.Container>
      </BackgroundCinza>
      <Spacer />
      <BackgroundCinza>
        <Text h3>Valores</Text>
        <Grid.Container gap={2}>
          <GridAlinhaTextoCentro>
            <Titulo>Valor Total da Prestação de Serviços </Titulo>
            <Text small>{data?.valores_servicos?.vTPrest}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Valor do BC do IMCS</Titulo>
            <Text small>{data?.impostos?.ICMS?.ICMS00?.vBC}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Valor de IMCS</Titulo>
            <Text small>{data?.impostos?.ICMS?.ICMS00?.vICMS}</Text>
          </GridAlinhaTextoCentro>
        </Grid.Container>
      </BackgroundCinza>

      <Spacer />
      <BackgroundCinza style={{ padding: 0 }}>
        <Collapse.Group>
          <Collapse title="Dados Remetente">
            <Grid.Container gap={2} direction="row">
              <Grid>
                <Titulo>Razão social</Titulo>
                <Text small>{data?.remetente?.xNome}</Text>
              </Grid>
              <Grid>
                <Titulo>Nome fantasia</Titulo>
                <Text small>{data?.remetente?.xFant}</Text>
              </Grid>
            </Grid.Container>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <Grid>
                <Titulo>CNPJ </Titulo>
                <Text small>{data?.remetente?.CNPJ}</Text>
              </Grid>
              <Grid>
                <Titulo>Inscrição Estadual</Titulo>
                <Text small>{data?.remetente?.IE}</Text>
              </Grid>
              <Grid>
                <Titulo>Inscrição Munincipal</Titulo>
                <Text small>{data?.remetente?.IM}</Text>
              </Grid>
              <Grid>
                <Titulo>CNAE Fiscal</Titulo>
                <Text small>{data?.remetente?.CNAE}</Text>
              </Grid>
            </Grid.Container>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <Grid>
                <Titulo>Telefone</Titulo>
                <Text small>{data?.remetente?.enderReme?.fone}</Text>
              </Grid>
              <Grid>
                <Titulo>CEP</Titulo>
                <Text small>{data?.remetente?.enderReme?.CEP}</Text>
              </Grid>
              <Grid>
                <Titulo>UF</Titulo>
                <Text small>{data?.remetente?.enderReme?.UF}</Text>
              </Grid>
              <Grid>
                <Titulo>País</Titulo>
                <Text small>{data?.remetente?.enderReme?.xPais}</Text>
              </Grid>
            </Grid.Container>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <Grid>
                <Titulo>Endereço </Titulo>
                <Text small>{data?.remetente?.enderReme?.xLgr}</Text>
              </Grid>
              <Grid>
                <Titulo>Número</Titulo>
                <Text small>{data?.remetente?.enderReme?.nro}</Text>
              </Grid>
            </Grid.Container>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <Grid>
                <Titulo>Bairro</Titulo>
                <Text small>{data?.remetente?.enderReme?.xBairro}</Text>
              </Grid>
              <Grid>
                <Titulo>Município</Titulo>
                <Text small>{data?.remetente?.enderReme?.xMun}</Text>
              </Grid>
            </Grid.Container>
          </Collapse>
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
        <Text h3>Caracteristícas</Text>
        <Grid.Container gap={2}>
          <GridAlinhaTextoCentro>
            <Titulo>Modal </Titulo>
            <Text small>{data?.informacoes_cte?.mod}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Tipo de serviço</Titulo>
            <Text small>{data?.informacoes_cte?.tpServ}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Forma</Titulo>
            <Text small>{data?.informacoes_cte?.tpEmis}</Text>
          </GridAlinhaTextoCentro>
          <Grid>
            <Titulo>CFOP</Titulo>
            <Text small>{data?.informacoes_cte?.nCFOP}</Text>
          </Grid>
          <Grid>
            <Titulo>Descr CFOP</Titulo>
            <Text small>{data?.informacoes_cte?.nCFOP}</Text>
          </Grid>
          <Grid>
            <Titulo>Início da Prestação</Titulo>
            <Text small>
              {data?.informacoes_cte?.UFIni} - {data?.informacoes_cte?.xMunIni}
            </Text>
          </Grid>
          <Grid>
            <Titulo>Fim da Prestação</Titulo>
            <Text small>
              {data?.informacoes_cte?.UFFim} - {data?.informacoes_cte?.xMunFim}
            </Text>
          </Grid>
        </Grid.Container>
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
