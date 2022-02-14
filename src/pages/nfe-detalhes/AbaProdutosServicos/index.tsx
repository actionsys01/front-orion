import { Table, Text, Collapse, Spacer } from '@geist-ui/react';
import { useMemo, useCallback, useEffect } from 'react';
import { Grid } from '@components/Grid';
import DadosGeraisNfe from '../DadosGeraisNfe';
import { Titulo, GridAlinhaTextoCentro } from '../styled';
import { BackgroundCinza } from '@components/BackgroundCinza/styled';
import { Tag } from '@geist-ui/react-icons';
import { NfeProps } from '@services/nfe/dtos/nfeXml';

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
    ICMS: {
        ICMS00: {
            CST: string;
            vBC: string;
            modBC: string;
            pICMS: string;
            vICMS: string;
        };
        ICMS10: {
            CST: string;
            modBC: string;
            vBC: string;
            pICMS: string;
            vICMS: string;
            modBCST: string;
            vBCST: string;
            pICMSST: string;
            vICMSST: string;
        };
        ICMS20: {
            CST: string;
            modBC: string;
            vBC: string;
            vICMS: string;
            pICMS: string;
        };
        ICMS30: {
            CST: string;
            modBCST: string;
            vBCST: string;
            pICMSST: string;
            vICMSST: string;
        };
        ICMS40: { CST: string };
        ICMS51: {
            CST: string;
            modBC: string;
            vBC: string;
            pICMS: string;
            vICMS: string;
        };
        ICMS60: { CST: string };
        ICMS70: {
            CST: string;
            modBC: string;
            vBC: string;
            pICMS: string;
            vICMS: string;
            modBCST: string;
            vBCST: string;
            pICMSST: string;
            vICMSST: string;
        };
        ICMS90: {
            CST: string;
            modBC: string;
            vBC: string;
            pICMS: string;
            vICMS: string;
            modBCST: string;
            vBCST: string;
            pICMSST: string;
            vICMSST: string;
        };
        ICMSPart: {
            CST: string;
            modBC: string;
            vBC: string;
            vICMS: string;
            pICMS: string;
            modBCST: string;
            vBCST: string;
            pICMSST: string;
            vICMSST: string;
        };
        ICMSST: { CST: string };
    };
    IPI: {
        IPIINT: { CST: string };
        IPITrib: { CST: string; vBC: string; vIPI: string; pIPI: string };
    };
    // COFINS: {};
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
                      imposto: Impostos;
                  },
              ]
            | {
                  prod: Produto;
                  imposto: Impostos;
              };
        versao: string;
    };
}

export default function AbaProdutosServicos({ data }) {
    const produtos = useMemo(() => {
        const products: any[] = [];
        const produtos_servicos = data?.produtos_servicos;
        if (produtos_servicos) {
            if (Array.isArray(data?.produtos_servicos)) {
                data.produtos_servicos.map(item =>
                    products.push({
                        ...item,
                        ICMS:
                            item.imposto.ICMS.ICMS00 ||
                            item.imposto.ICMS.ICMS10 ||
                            item.imposto.ICMS.ICMS20 ||
                            item.imposto.ICMS.ICMS30 ||
                            item.imposto.ICMS.ICMS40 ||
                            item.imposto.ICMS.ICMS51 ||
                            item.imposto.ICMS.ICMS60 ||
                            item.imposto.ICMS.ICMS70 ||
                            item.imposto.ICMS.ICMS90 ||
                            item.imposto.ICMS.ICMSST,
                        IPI:
                            item.imposto.IPI?.IPIINT ||
                            item.imposto.IPI?.IPITrib,
                    }),
                );
            } else {
                products.push({
                    ...data?.produtos_servicos,
                    ICMS:
                        data.produtos_servicos.imposto.ICMS.ICMS00 ||
                        data.produtos_servicos.imposto.ICMS.ICMS10 ||
                        data.produtos_servicos.imposto.ICMS.ICMS20 ||
                        data.produtos_servicos.imposto.ICMS.ICMS30 ||
                        data.produtos_servicos.imposto.ICMS.ICMS40 ||
                        data.produtos_servicos.imposto.ICMS.ICMS51 ||
                        data.produtos_servicos.imposto.ICMS.ICMS60 ||
                        data.produtos_servicos.imposto.ICMS.ICMS70 ||
                        data.produtos_servicos.imposto.ICMS.ICMS90 ||
                        data.produtos_servicos.imposto.ICMS.ICMSST,
                    IPI:
                        data.produtos_servicos.imposto.IPI?.IPIINT ||
                        data.produtos_servicos.imposto.IPI?.IPITrib,
                });
            }
        }
        //  console.log("func:", products)
        return products;
    }, []);

    return (
        <>
            <Text h3>Dados dos Produtos e Serviços </Text>
            {produtos.map((produto, i) => (
                <Collapse.Group key={i}>
                    <Collapse
                        style={{ padding: 3 }}
                        title={
                            (
                                <Grid.Container gap={1} direction="row">
                                    <Grid
                                        style={{
                                            alignSelf: 'center',
                                        }}
                                    >
                                        <Tag />
                                    </Grid>
                                    <Grid>
                                        <Titulo>Número</Titulo>
                                        <Text key={i} size={10}>
                                            {produto?.prod?.cProd}
                                        </Text>
                                    </Grid>
                                    <Grid>
                                        <Titulo>Descrição</Titulo>
                                        <Text key={i} size={10}>
                                            {produto?.prod?.xProd}
                                        </Text>
                                    </Grid>
                                    <Grid>
                                        <Titulo>Quantidade</Titulo>
                                        <Text size={10}>
                                            {produto?.prod?.vUnCom}
                                        </Text>
                                    </Grid>
                                    <Grid>
                                        <Titulo>Unidade Comercial</Titulo>
                                        <Text size={10}>
                                            {produto?.prod?.uCom}
                                        </Text>
                                    </Grid>
                                    <Grid>
                                        <Titulo>Valor</Titulo>
                                        <Text size={10}>
                                            {produto?.prod?.vProd}
                                        </Text>
                                    </Grid>
                                    <Grid>
                                        <Titulo>xPed (Pedido)</Titulo>
                                        <Text size={10}>
                                            {produto?.prod?.xPed}
                                        </Text>
                                    </Grid>
                                    <Grid>
                                        <Titulo>nItemPed (Linha pedido)</Titulo>
                                        <Text size={10}>
                                            {produto?.prod?.nItemPed}
                                        </Text>
                                    </Grid>
                                </Grid.Container>
                            ) as any
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
                            <Text h3 style={{ textAlign: 'left', margin: 0 }}>
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
                                <Titulo>
                                    Valor Unitário de Comercialização
                                </Titulo>
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
                            <Text h3 style={{ textAlign: 'left', margin: 0 }}>
                                ICMS/IPI
                            </Text>
                        </BackgroundCinza>
                        <Spacer />
                        <Grid.Container gap={2} direction="row">
                            <GridAlinhaTextoCentro>
                                <Titulo>CST do ICMS</Titulo>
                                <Text small>{produto?.ICMS?.CST}</Text>
                            </GridAlinhaTextoCentro>
                            <GridAlinhaTextoCentro>
                                <Titulo>Mod. BC do ICMS</Titulo>
                                <Text small>{produto?.ICMS?.modBC}</Text>
                            </GridAlinhaTextoCentro>
                            <GridAlinhaTextoCentro>
                                <Titulo>CST IPI</Titulo>
                                <Text small>{produto?.IPI?.CST}</Text>
                            </GridAlinhaTextoCentro>
                        </Grid.Container>
                        <Spacer />
                        <Grid.Container gap={2} direction="row">
                            <GridAlinhaTextoCentro>
                                <Titulo>BC do ICMS</Titulo>
                                <Text small>{produto?.ICMS?.vBC}</Text>
                            </GridAlinhaTextoCentro>
                            <GridAlinhaTextoCentro>
                                <Titulo>Alíquota do ICMS</Titulo>
                                <Text small>{produto?.ICMS?.pICMS}</Text>
                            </GridAlinhaTextoCentro>
                            <GridAlinhaTextoCentro>
                                <Titulo>Valor do ICMS</Titulo>
                                <Text small>{produto?.ICMS?.vICMS}</Text>
                            </GridAlinhaTextoCentro>
                        </Grid.Container>
                        <Spacer />
                        <Grid.Container gap={2} direction="row">
                            <GridAlinhaTextoCentro>
                                <Titulo>BC do ICMS-ST</Titulo>
                                <Text small>{produto?.ICMS?.vBCST}</Text>
                            </GridAlinhaTextoCentro>
                            <GridAlinhaTextoCentro>
                                <Titulo>Alíquota do ICMS-ST</Titulo>
                                <Text small>{produto?.ICMS?.pICMSST}</Text>
                            </GridAlinhaTextoCentro>
                            <GridAlinhaTextoCentro>
                                <Titulo>Valor do ICMS-ST</Titulo>
                                <Text small>{produto?.ICMS?.vICMSST}</Text>
                            </GridAlinhaTextoCentro>
                        </Grid.Container>
                        <Spacer />
                        <Grid.Container gap={2} direction="row">
                            <GridAlinhaTextoCentro>
                                <Titulo>BC do IPI</Titulo>
                                <Text small>{produto?.IPI?.vBC}</Text>
                            </GridAlinhaTextoCentro>
                            <GridAlinhaTextoCentro>
                                <Titulo>Alíquota do IPI</Titulo>
                                <Text small>{produto?.IPI?.pIPI}</Text>
                            </GridAlinhaTextoCentro>
                            <GridAlinhaTextoCentro>
                                <Titulo>Valor do IPI</Titulo>
                                <Text small>{produto?.IPI?.vIPI}</Text>
                            </GridAlinhaTextoCentro>
                        </Grid.Container>
                        <Spacer />
                        <BackgroundCinza>
                            <Text h3 style={{ textAlign: 'left', margin: 0 }}>
                                PIS/COFINS
                            </Text>
                        </BackgroundCinza>
                        <Spacer />
                        <Grid.Container gap={2} direction="row">
                            <GridAlinhaTextoCentro>
                                <Titulo>CST do CONFINS</Titulo>
                                <Text small>
                                    {produto?.imposto.COFINS?.COFINSAliq?.CST}
                                </Text>
                            </GridAlinhaTextoCentro>
                            <GridAlinhaTextoCentro>
                                <Titulo>BC do CONFINS</Titulo>
                                <Text small>
                                    {produto?.imposto.COFINS?.COFINSAliq?.vBC}
                                </Text>
                            </GridAlinhaTextoCentro>
                            <GridAlinhaTextoCentro>
                                <Titulo>Alíquota do CONFINS</Titulo>
                                <Text small>
                                    {
                                        produto?.imposto.COFINS?.COFINSAliq
                                            ?.pCOFINS
                                    }
                                </Text>
                            </GridAlinhaTextoCentro>
                            <GridAlinhaTextoCentro>
                                <Titulo>Valor do CONFINS</Titulo>
                                <Text small>
                                    {
                                        produto?.imposto.COFINS?.COFINSAliq
                                            ?.vCOFINS
                                    }
                                </Text>
                            </GridAlinhaTextoCentro>
                        </Grid.Container>
                        <Spacer />
                        <Grid.Container gap={2} direction="row">
                            <GridAlinhaTextoCentro>
                                <Titulo>CST do PIS</Titulo>
                                <Text small>
                                    {produto?.imposto.PIS?.PISAliq?.CTS}
                                </Text>
                            </GridAlinhaTextoCentro>
                            <GridAlinhaTextoCentro>
                                <Titulo>BC do PIS</Titulo>
                                <Text small>
                                    {produto?.imposto.PIS?.PISAliq?.vBC}
                                </Text>
                            </GridAlinhaTextoCentro>
                            <GridAlinhaTextoCentro>
                                <Titulo>Alíquota do PIS</Titulo>
                                <Text small>
                                    {produto?.imposto.PIS?.PISAliq?.pPIS}
                                </Text>
                            </GridAlinhaTextoCentro>
                            <GridAlinhaTextoCentro>
                                <Titulo>Valor do PIS</Titulo>
                                <Text small>
                                    {produto?.imposto.PIS?.PISAliq?.vPIS}
                                </Text>
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
