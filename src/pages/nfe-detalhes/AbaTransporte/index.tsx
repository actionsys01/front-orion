import { BackgroundCinza } from "@components/BackgroundCinza/styled";
import { Grid } from "@components/Grid";
import { Grid as GridGeist, Spacer, Table, Text } from "@geist-ui/react";
import useTransformArray from "@hooks/useTransformArray";
import { useEffect, useState } from "react";
import DadosGeraisNfe from "../DadosGeraisNfe";
import { GridAlinhaTextoCentro, Titulo } from "../styled";
import {VolumTable} from "./style"

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
      };
    };
    versao: string;
    transporte: {
      modFrete: string;
      transporta: {
        xNome: string;
        xMun: string;
        CNPJ: string;
        IE: string;
        UF: string;
        xEnder: string;
      };
      vol:
        | [{ qVol: string; esp: string; marca: string; nVol: string }]
        | { qVol: string; esp: string; marca: string; nVol: string };
    };
  };
}
export default function AbaTransporte({ data }) {
  const volumes = useTransformArray(data?.transporte.vol);
  
  return (
    <>
      <DadosGeraisNfe data={data} />
      <BackgroundCinza>
        <Text h3>Dados do Transporte </Text>
        <GridGeist.Container gap={2}>
          <GridGeist>
            <Titulo h6>Modalidade do Frete </Titulo>
            <Text small>{data?.transporte?.modFrete}</Text>
          </GridGeist>
        </GridGeist.Container>
        <Spacer y={0.2} />
        <Text h3>Transportador </Text>
        <GridGeist.Container gap={2}>
          <GridGeist>
            <Titulo h6>CNPJ </Titulo>
            <Text small>{data?.transporte?.transporta?.CNPJ}</Text>
          </GridGeist>
          <GridAlinhaTextoCentro>
            <Titulo>Razão Social </Titulo>
            <Text small>{data?.transporte?.transporta?.xNome}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Município</Titulo>
            <Text small>{data?.transporte?.transporta?.xMun}</Text>
          </GridAlinhaTextoCentro>
        </GridGeist.Container>
        <Spacer y={0.2} />
        <GridGeist.Container gap={2}>
          <GridGeist>
            <Titulo h6>Inscrição Estadual </Titulo>
            <Text small>{data?.transporte?.transporta?.IE}</Text>
          </GridGeist>
          <GridAlinhaTextoCentro>
            <Titulo>Endereço Complemento </Titulo>
            <Text small>{data?.transporte?.transporta?.xEnder}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>UF</Titulo>
            <Text small>{data?.transporte?.transporta?.UF}</Text>
          </GridAlinhaTextoCentro>
        </GridGeist.Container>
      </BackgroundCinza>
      <Spacer y={0.2} />
      <Text h3>Volumes </Text>
      {volumes.length !== 0 && (
        <>
          <Grid>
            <Table data={volumes}>
              <Table.Column prop="nVol" label="Sequência" />
              <Table.Column prop="qVol" label="Quantidade" />
              <Table.Column prop="esp" label="Espécie" />
              <Table.Column prop="marca" label="Marca do Volumes" />
            </Table>
          </Grid>
        </>
      )}
    </>
  );
}
