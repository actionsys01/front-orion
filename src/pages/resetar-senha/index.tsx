import { Row, useTheme, useToasts } from "@geist-ui/react";
import { Box } from "@geist-ui/react-icons";
import api from "@services/api";
import "inter-ui/inter.css";
import Head from "next/head";
import Link from "next/link";
import { Button, Input } from "@geist-ui/react";
import { Container, Form } from './style'
import { useRouter } from "next/router";
import { useState } from 'react'



export default function resetarSenha() {

    const { query } = useRouter();
    const { palette } = useTheme();
    const [, setToast] = useToasts();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    console.log(query)




    async function sendEmailToForgotPasswrod() {
        const { token } = query
        setLoading(true);
        if (password !== confirmationPassword) {
          setLoading(false);
          setToast({ text: "Senha precisa ser igual a senha de confirmação", type: "warning" });
          return;
        }

        if(!token){
            setLoading(false)
            setToast({ text: "Imposssivel efetuar a troca de senha, vefique o link enviado ao seu e-mail", type: "warning" });
            return;
        }
        try {
          await api.post("/password/reset-password/", {
           password,
           token : query.token
          })
    
          setToast({ text: "Senha alterada com sucesso", type: "success" });
          setLoading(false);
          
        } catch (error) {
          setToast({ text: "Ocorreu um problema ao efetuar a troca de senha", type: "error" });
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
                        type="password"
                        size="large"
                        placeholder="Senha"
                        width="100%"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    <Input
                        type="password"
                        size="large"
                        placeholder="Confirmar senha"
                        width="100%"
                        value={confirmationPassword}
                        onChange={(e) => setConfirmationPassword(e.target.value)}
                    />


                    <Button
                        loading={loading}
                        size="large"
                        onClick={sendEmailToForgotPasswrod}
                        type="secondary-light"
                        style={{ width: "100%" }}
                    >
                        Resetar senha
                    </Button>

                </Form>
            </Container>



        </>
    );
}

