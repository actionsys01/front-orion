import { Grid as GridGeist, Spacer, Text } from "@geist-ui/react";
import { useRouter } from "next/router";
import { GridAlinhaTextoCentro, Titulo } from "../styled";
import { General } from "./styles";

interface IProps {
  data: {
    informacoes_nfe: {
      nNF: string;
    };
    versao: string;
  };
}
export default function DadosGeraisNfe({ data }: IProps) {
  const router = useRouter();
  return (
    <>
      <General>
        <Text h3>Dados gerais </Text>
        <GridGeist.Container gap={2}>
          <GridGeist>
            <Titulo h6>Chave de acesso </Titulo>
            <Text small style={{ wordBreak: "break-word" }}>
              {router.query?.chave_nota}
            </Text>
          </GridGeist>
          <GridAlinhaTextoCentro>
            <Titulo>Número </Titulo>
            <Text small>{data?.informacoes_nfe?.nNF}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Versão XML</Titulo>
            <Text small>{data?.versao}</Text>
          </GridAlinhaTextoCentro>
        </GridGeist.Container>
      </General>
      <Spacer />
    </>
  );
}
