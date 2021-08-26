import { Grid, Spacer, Text } from "@geist-ui/react";
import { Titulo } from "@components/Titulo";
import { GridAlinhaTextoCentro } from "@components/GridAlinhaTextoCentro";
import { BackgroundCinza } from "@components/BackgroundCinza/styled";
import { useRouter } from "next/router";

interface IProps {
  data: {
    informacoes_cte: {
      cCT: string;
    };
    versao: string;
  };
}
export default function DadosGeraisCte({ data }: IProps) {
  const router = useRouter();
  return (
    <>
      <BackgroundCinza>
        <Text h3>Dados Gerais </Text>
        <Grid.Container gap={2}>
          <Grid>
            <Titulo h6>Chave de acesso </Titulo>
            <Text small style={{ wordBreak: "break-word" }}>
              {router.query?.chave_nota}
            </Text>
          </Grid>
          <GridAlinhaTextoCentro>
            <Titulo>Número </Titulo>
            <Text small>{data?.informacoes_cte?.cCT}</Text>
          </GridAlinhaTextoCentro>
          <GridAlinhaTextoCentro>
            <Titulo>Versão XML</Titulo>
            <Text small>{data?.versao}</Text>
          </GridAlinhaTextoCentro>
        </Grid.Container>
      </BackgroundCinza>
      <Spacer />
    </>
  );
}
