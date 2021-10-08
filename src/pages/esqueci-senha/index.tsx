import {Row, useTheme, useToasts} from "@geist-ui/react";
import { Box } from "@geist-ui/react-icons";
import api from "@services/api";
import "inter-ui/inter.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Form } from './style'
import { Button, Input } from "@geist-ui/react";
import { useState } from 'react'

const esqueciSenha = () => {
    const { palette } = useTheme();
    const router = useRouter();
    const [, setToast] = useToasts();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState<string>("")

    async function sendEmailToForgotPasswrod() {
      setLoading(true);
      if (!email) {
        setLoading(false);
        setToast({ text: "Informe seu e-mail", type: "warning" });
        return;
      }
      try {
        await api.post("/password/", {
         email
        })
  
        setToast({ text: "E-mail de recuperação de senha enviada com sucesso", type: "success" });
        setLoading(false);
        
      } catch (error) {
        setToast({ text: "Ocorreu um problema ao enviar o e-mail", type: "error" });
      } finally {
        setLoading(false);
        router.push("/")
      }
    
    }
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


        <Container>
          <Form>

          <Input
            size="large"
            placeholder="Seu e-mail"
            width="100%"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />


            <Button
            loading={loading}
            size="large"
            onClick={sendEmailToForgotPasswrod}
            type="secondary-light"
            style={{ width: "100%" }}
          >
            Enviar e-mail
          </Button>

          </Form>
        </Container>

        
        
      </>
    );
  };
  

  export default esqueciSenha;
  