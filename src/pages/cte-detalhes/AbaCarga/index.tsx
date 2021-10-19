import {
  Loading,
  Popover,
  Spacer,
  Table,
  Text,
  useToasts,
} from "@geist-ui/react";
import { BackgroundCinza } from "@components/BackgroundCinza/styled";
import DadosGeraisCte from "../DadosGeraisCte";
import { Grid } from "@components/Grid";
import { GridAlinhaTextoCentro } from "@components/GridAlinhaTextoCentro";
import { Titulo } from "@components/Titulo";
import { useMemo } from "react";
import { MoreHorizontal } from "@geist-ui/react-icons";
import * as cte from "@services/cte-mongo";
import { useState } from "react";
import { useRouter } from "next/router";

interface IProps {
  data: {
    informacoes_normal_substituto: {
      infCarga: {
        vCarga: string;
        proPred: string;
        xOutCat: string;
        infQ: [
              {
                tpMed: string;
                cUnid: string;
                qCarga: string;
              }
            ]
          | {
              tpMed: string;
              cUnid: string;
              qCarga: string;
            };
      };
      infDoc: {
        infNFe: [
              {
                chave: string;
                nDoc: string;
                serie: string;
                dEmi: string;
                vNF: string;
              }
            ]
          | {
              chave: string;
              nDoc: string;
              serie: string;
              dEmi: string;
              vNF: string;
            };
      };
    };
    informacoes_cte: {
      cCT: string;
    };
    versao: string;
  };
}
export default function AbaCarga({ data }: IProps) {
  const [loading, setLoading] = useState(false);
  const [, setToast] = useToasts();

  const router = useRouter();

  const cargas = useMemo(() => {
    const cargas = [];
    const infQ = data?.informacoes_normal_substituto?.infCarga.infQ;
    if (Array.isArray(infQ)) {
      infQ.map((carga) => {
        const { tpMed, cUnid, qCarga } = carga;

        cargas.push({
          cUnid,
          qCarga,
          tpMed,
        });
      });
    } else {
      const { cUnid, qCarga, tpMed } = infQ;
      cargas.push({ cUnid, qCarga, tpMed });
    }
    return cargas;
  }, [data]);

  const nfes = useMemo(() => {
    const nfes = [];
    const infNFe = data?.informacoes_normal_substituto?.infDoc.infNFe;
    const opcoes = (actions: any, item: any) => (
      <Popover
        placement="right"
        content={
          <>
            <Popover.Item>
              <Text
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  const chave_nota = item.rowValue.chave;
                  handleBuscar(chave_nota);
                }}
              >
                Visualizar
              </Text>
            </Popover.Item>
          </>
        }
      >
        <MoreHorizontal />
      </Popover>
    );

    if (Array.isArray(infNFe)) {
      infNFe.map(async (nfe) => {
        const { serie, dEmi, nDoc, vNF, chave } = nfe;

        nfes.push({
          serie,
          dEmi,
          nDoc,
          vNF,
          chave,
          opcoes,
        });
      });
    } else {
      const { serie, dEmi, nDoc, vNF, chave } = infNFe;
      nfes.push({
        serie,
        dEmi,
        nDoc,
        vNF,
        chave,
        opcoes,
      });
    }

    return nfes;
  }, [data]);

  async function handleBuscar(chave_nota: string) {
    setLoading(true);
    try {
      await cte.buscar(chave_nota);
      router.push({
        pathname: "/nfe-detalhes",
        query: {
          chave_nota,
        },
      });
    } catch (error) {
      setLoading(false);
      const mensagem = error.response.data.mensagem;
      setToast({ text: mensagem, type: "warning" });
    }
  }

  if (loading) return <Loading />;

  return (
    <>
      <DadosGeraisCte data={data} />
      <BackgroundCinza>
        <Text h3>Totais </Text>
        <Grid.Container gap={2}>
          <GridAlinhaTextoCentro>
            <Titulo>Valor total da Carga</Titulo>
            <Text small>
              {data?.informacoes_normal_substituto?.infCarga?.vCarga}
            </Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Produto Predominante</Titulo>
            <Text small>
              {data?.informacoes_normal_substituto?.infCarga?.proPred}
            </Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Outras Características</Titulo>
            <Text small>
              {data?.informacoes_normal_substituto?.infCarga?.xOutCat}
            </Text>
          </GridAlinhaTextoCentro>
        </Grid.Container>
      </BackgroundCinza>
      <Spacer />
      <Text h3>Quantidade Carga </Text>
      {cargas.length && (
        <Grid>
          <Table data={cargas}>
            <Table.Column prop="cUnid" label="Código UM" />
            <Table.Column prop="tpMed" label="Tipo Medida" />
            <Table.Column prop="qCarga" label="Quantidade" />
          </Table>
        </Grid>
      )}
      <Spacer />
      <Text h3>Notas Fiscais Eletrônicas </Text>
      {nfes.length && (
        <Grid>
          <Table data={nfes}>
            <Table.Column prop="opcoes" />
            <Table.Column prop="chave" label="Chave de Acesso NFe" />
            <Table.Column prop="nDoc" label="Número" />
            <Table.Column prop="serie" label="Série Documento Fiscal" />
            <Table.Column prop="dEmi" label="Data Emissão" />
            <Table.Column prop="vNF" label="Valor Documento Fiscal" />
          </Table>
        </Grid>
      )}
      <Spacer />
    </>
  );
}
