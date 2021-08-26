import { Table, Text, Collapse, Spacer } from "@geist-ui/react";
import { useMemo } from "react";
import { Grid } from "@components/Grid";
import DadosGeraisNfe from "../DadosGeraisNfe";
import { Titulo, GridAlinhaTextoCentro } from "../styled";
import { BackgroundCinza } from "@components/BackgroundCinza/styled";
import { Tag } from "@geist-ui/react-icons";

interface Produto {
  cProd: string;
  NCM: string;
  xPed: string;
  uCom: string;
  uTrib: string;
  vUnTrib: string;
  vTotTrib: string;
  vOutro: string;
  EXTIPI: string;
  vDesc: string;
  nFCI: string;
}
interface Impostos {
  vTotTrib: string;
}

interface IProps {
  data: {
    informacoes_nfe: {
      mod: string;
      serie: string;
      nNF: string;
      verProc: string;
      dhEmi: string;
      dhSaiEnt: string;
      vUnTrib: string;
    };
    total: {
      ICMSTot: { vNF: string };
    };
    produtos_servicos:
      | [
          {
            prod: Produto;
            impostos: Impostos;
          }
        ]
      | {
          prod: Produto;
          impostos: Impostos;
        };
  };
}

export default function AbaProdutosServicos({ data }: IProps) {
  const produtos = useMemo(() => {
    let produtos: any[] = [];
    if (Array.isArray(data?.produtos_servicos)) {
      data.produtos_servicos.map((item) => produtos.push(item));
    } else {
      produtos.push(data?.produtos_servicos);
    }
    return produtos;
  }, [data]);

  return (
    <>
      <DadosGeraisNfe data={data} />
      <Text h3>Dados dos Produtos e Serviços </Text>
      {produtos.map((produto) => (
        <Collapse.Group>
          <Collapse
            style={{ padding: 5 }}
            title={
              <Grid.Container gap={2} direction="row">
                <Grid
                  style={{
                    alignSelf: "center",
                  }}
                >
                  <Tag />
                </Grid>
                <Grid>
                  <Titulo>Número</Titulo>
                  <Text size={12}>{produto?.prod?.cProd}</Text>
                </Grid>
                <Grid>
                  <Titulo>Descrição</Titulo>
                  <Text size={12}>{produto?.prod?.xProd}</Text>
                </Grid>
                <Grid>
                  <Titulo>Quantidade</Titulo>
                  <Text size={12}>{produto?.prod?.vUnCom}</Text>
                </Grid>
                <Grid>
                  <Titulo>Unidade Comercial</Titulo>
                  <Text size={12}>{produto?.prod?.uCom}</Text>
                </Grid>
                <Grid>
                  <Titulo>Valor</Titulo>
                  <Text size={12}>{produto?.prod?.vProd}</Text>
                </Grid>
                <Grid>
                  <Titulo>xPed (Pedido)</Titulo>
                  <Text size={12}>{produto?.prod?.xPed}</Text>
                </Grid>
                <Grid>
                  <Titulo>nItemPed (Linha pedido)</Titulo>
                  <Text size={12}>{produto?.prod?.nItemPed}</Text>
                </Grid>
              </Grid.Container>
            }
          >
            <Grid.Container gap={2} direction="row">
              <GridAlinhaTextoCentro>
                <Titulo>Código do Produto</Titulo>
                <Text small>{produto?.prod?.cProd}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Código NCM</Titulo>
                <Text small>{produto?.prod?.NCM}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Código EX da TIPI</Titulo>
                <Text small>{produto?.prod?.EXTIPI}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>CFOP</Titulo>
                <Text small>{produto?.prod?.CFOP}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Outras Despesas Acessoria</Titulo>
                <Text small>{produto?.prod?.vOutro}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Valor do Desconto</Titulo>
                <Text small>{produto?.prod?.vDesc}</Text>
              </GridAlinhaTextoCentro>
            </Grid.Container>
            <Spacer />
            <BackgroundCinza>
              <Text h3 style={{ textAlign: "left", margin: 0 }}>
                Indicador de Composição do Valor Total da NF-e
              </Text>
            </BackgroundCinza>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <GridAlinhaTextoCentro>
                <Titulo>Número do Pedido de Compra</Titulo>

                <Text small>{produto?.prod?.xPed}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Unidade Comercial</Titulo>
                <Text small>{produto?.prod?.uCom}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Quantidade Comercial</Titulo>
                <Text small>{produto?.prod?.qCom}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Valor Unitário de Comercialização</Titulo>
                <Text small>{produto?.prod?.vUnCom}</Text>
              </GridAlinhaTextoCentro>
            </Grid.Container>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <GridAlinhaTextoCentro>
                <Titulo>Código EAN Comercial</Titulo>
                <Text small>{produto?.prod?.cEAN}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Unidade Tributável</Titulo>
                <Text small>{produto?.prod?.uTrib}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Quantidade Tributável</Titulo>
                <Text small>{produto?.prod?.qTrib}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Valor Unitário de Tributável</Titulo>
                <Text small>{produto?.prod?.vUnTrib}</Text>
              </GridAlinhaTextoCentro>
            </Grid.Container>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <GridAlinhaTextoCentro>
                <Titulo>Código EAN Tributável</Titulo>
                <Text small>{produto?.prod?.cEANTrib}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Item do Pedido de Compra</Titulo>
                <Text small>{produto?.prod?.nItemPed}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Valor Aprox. Total de Tributos</Titulo>
                <Text small>{produto?.prod?.nItemPed}</Text>
              </GridAlinhaTextoCentro>
            </Grid.Container>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <GridAlinhaTextoCentro>
                <Titulo>Número do Controle da FCI</Titulo>
                <Text small>{produto?.prod?.nFCI}</Text>
              </GridAlinhaTextoCentro>
            </Grid.Container>
            <Spacer />
            <BackgroundCinza>
              <Text h3 style={{ textAlign: "left", margin: 0 }}>
                ICMS/IPI
              </Text>
            </BackgroundCinza>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <GridAlinhaTextoCentro>
                <Titulo>Tributação do ICMS</Titulo>
                <Text small>{produto?.imposto?.ICMS?.ICMS10?.CST}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Mod. BC do ICMS</Titulo>
                <Text small>{produto?.imposto?.ICMS?.ICMS10?.modBC}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>CTS do IPI</Titulo>
                <Text small>{produto?.IPI?.IPITrib?.CST}</Text>
              </GridAlinhaTextoCentro>
            </Grid.Container>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <GridAlinhaTextoCentro>
                <Titulo>BC do ICMS</Titulo>
                <Text small>{produto?.imposto?.ICMS?.ICMS00?.vBC}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Alíquota</Titulo>
                <Text small>{produto?.imposto?.ICMS?.ICMS00?.pICMS}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Valor ICMS</Titulo>
                <Text small>{produto?.imposto?.ICMS?.ICMS10?.vICMS}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>BC do IPI</Titulo>
                <Text small>{produto?.imposto?.ICMS?.ICMS10?.vBC}</Text>
              </GridAlinhaTextoCentro>
            </Grid.Container>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <GridAlinhaTextoCentro>
                <Titulo>BC do ICMS-ST</Titulo>
                <Text small>{produto?.imposto?.ICMS?.ICMS60?.pST}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Valor ICMS-ST</Titulo>
                <Text small>{produto?.imposto?.ICMS?.ICMS60?.vICMSSTRet}</Text>
              </GridAlinhaTextoCentro>
            </Grid.Container>
            <Spacer />
            <BackgroundCinza>
              <Text h3 style={{ textAlign: "left", margin: 0 }}>
                PIS/COFINS
              </Text>
            </BackgroundCinza>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <GridAlinhaTextoCentro>
                <Titulo>CTS do CONFINS</Titulo>
                <Text small>{produto?.COFINS?.COFINSAliq?.CST}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>BC do CONFINS</Titulo>
                <Text small>{produto?.COFINS?.COFINSAliq?.vBC}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Alíquota do CONFINS</Titulo>
                <Text small>{produto?.COFINS?.COFINSAliq?.pCOFINS}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Valor do CONFINS</Titulo>
                <Text small>{produto?.COFINS?.COFINSAliq?.vCOFINS}</Text>
              </GridAlinhaTextoCentro>
            </Grid.Container>
            <Spacer />
            <Grid.Container gap={2} direction="row">
              <GridAlinhaTextoCentro>
                <Titulo>CTS do PIS</Titulo>
                <Text small>{produto?.PIS?.PISAliq?.CTS}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>BC dO PIS</Titulo>
                <Text small>{produto?.PIS?.PISAliq?.vBC}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Alíquota do PIS</Titulo>
                <Text small>{produto?.PIS?.PISAliq?.pPIS}</Text>
              </GridAlinhaTextoCentro>
              <GridAlinhaTextoCentro>
                <Titulo>Valor do PIS</Titulo>
                <Text small>{produto?.PIS?.PISAliq?.vPIS}</Text>
              </GridAlinhaTextoCentro>
            </Grid.Container>
          </Collapse>
        </Collapse.Group>
      ))}
      <style>{`
        .view {
          background: #ebebeb !important;
          padding:5px !important;
        }
        .collapse {
          border-top: 1px solid white !important;
          border-bottom: 1px solid  white !important;
        }
        .collapse-group{
          padding:0px !important
        }
      `}</style>
    </>
  );
}
