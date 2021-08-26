import { Grid, Text } from "@geist-ui/react";
import { AlertTriangle } from "@geist-ui/react-icons";
import Head from "next/head";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>Orion | 404</title>
      </Head>
      <Grid.Container style={{ height: "100vh", textAlign: "center" }}>
        <Grid xs={24} justify="center" direction="column" alignItems="center">
          <AlertTriangle color="red" size={100} />
          <Text h1>Página não encontrada</Text>
          <Text p>Volter para tela anterior</Text>
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Custom404;
