import {Row, useTheme } from "@geist-ui/react";
import { Box } from "@geist-ui/react-icons";
import api from "@services/api";
import "inter-ui/inter.css";
import Head from "next/head";
import Link from "next/link";


const esqueciSenha = () => {
    const { palette } = useTheme();
    return (
      <>
        <Head>
          <title>Orion | Entrar </title>
        </Head>
        <Row
          align="middle"
          justify="space-between"
          style={{ backgroundColor: palette.foreground, padding: 10 }}
        >
          <Link href="/">
            <Box size={50} color="#fff" />
          </Link>
        </Row>
        
      </>
    );
  };
  

  export default esqueciSenha;
  