import { Table, Text } from "@geist-ui/react";
import { Grid } from "@components/Grid";
import DadosGeraisNfe from "../DadosGeraisNfe";
import { useEffect, useState } from "react";

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
      };
    };
    produtos_servicos:
      | [
          {
            nItem: string;
            prod: {
              cProd: string;
              rastro:
                | [
                    {
                      nLote: string;
                      dVal: string;
                      qLote: string;
                      dFab: string;
                    }
                  ]
                | { nLote: string; dVal: string; qLote: string; dFab: string };
            };
          }
        ]
      | {
          nItem: string;
          prod: {
            cProd: string;
            rastro:
              | [
                  {
                    nLote: string;
                    dVal: string;
                    qLote: string;
                    dFab: string;
                  }
                ]
              | { nLote: string; dVal: string; qLote: string; dFab: string };
          };
        };
  };
}
export default function AbaRastro({ data }: IProps) {
  const [rastros, setRastros] = useState([]);

  useEffect(() => {
    const rastros = [];

    if (Array.isArray(data?.produtos_servicos)) {
      data?.produtos_servicos?.map((produto) => {
        const { nItem, prod } = produto;
        const cProd = prod.cProd;
        if (Array.isArray(prod?.rastro)) {
          prod.rastro.map((rastro) => {
            rastros.push({ ...rastro, nItem, cProd });
          });
        } else {
          rastros.push({ ...prod.rastro, nItem, cProd });
        }
      });
    } else {
      const { nItem, prod } = data?.produtos_servicos;
      const cProd = prod.cProd;
      rastros.push({ ...prod.rastro, nItem, cProd });
    }

    setRastros(rastros);
  }, [data]);

  return (
    <>
      <DadosGeraisNfe data={data} />
      <Text h3>Rastros </Text>
      {rastros && (
        <Grid>
          <Table data={rastros}>
            <Table.Column prop="nItem " label="Seq. Item XML" />
            <Table.Column prop="cProd" label=" Cód. Produto" />
            <Table.Column prop="qLote" label="Quantidade Produto no Lote" />
            <Table.Column prop="dVal" label="Data de Validade" />
            <Table.Column prop="nLote" label="Número do Produto " />
            <Table.Column prop="dFab" label="Data Fabricação/Produção " />
          </Table>
        </Grid>
      )}
    </>
  );
}
