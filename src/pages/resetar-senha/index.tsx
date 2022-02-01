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
import { useCompanyContext } from '@contexts/company';


export default function resetarSenha() {

    const { query } = useRouter();
    const { palette } = useTheme();
    const [, setToast] = useToasts();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const { companyFeatures } = useCompanyContext()
    const [ error, setError ] = useState(false);





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
          setError(true)
        } finally {
          setLoading(false);
          router.push("/")
        }
      
      }

    if (error) {
        return <>
            <Head>
                <title>Orion | Entrar </title>
            </Head>
            <Row
                align="middle"
                // justify="space-between"
                style={{ backgroundColor: palette.foreground, padding: 10, display: 'flex', gap: "20px" }}
            >
                
                    <Box size={50} color="#fff" /> <h3  style={{color: '#fff', margin: "0"}}>GRA Web</h3>
                
            </Row>
            <Container>
                <h4>Seja Bem-Vindo(a) {companyFeatures?.nome}!</h4>
                <h6 style={{ textAlign: 'center' }}>Aparentemente a senha já foi redefinida, caso deseje redefinir a senha novamente
                    <br /> dirija-se à sessão redefinir senha clicando no botão abaixo.</h6>
                
                <Button
                        loading={loading}
                        size="large"
                    onClick={() => router.push({
                            pathname: '/esqueci-senha'
                        })}
                        type="secondary-light"
                        // style={{ width: "100%" }}
                    >
                        Resetar senha
                    </Button>
            </Container>
        </>
    }

    return (
        <>
            <Head>
                <title>Orion | Entrar </title>
            </Head>
            <Row
                align="middle"
                // justify="space-between"
                style={{ backgroundColor: palette.foreground, padding: 10, display: 'flex', gap: "20px" }}
            >
                
                    <Box size={50} color="#fff" /> <h3  style={{color: '#fff', margin: "0"}}>GRA Web</h3>
                
            </Row>
            <Container>
                <h4>Seja Bem-Vindo(a) {companyFeatures?.nome}!</h4>
                <h6>Por favor escolha a sua nova senha, esta senha será utilizada para acessar nosso aplicativo.</h6>
                <Form>
                    <Input.Password
                        type="password"
                        size="large"
                        placeholder="Senha"
                        width="100%"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    <Input.Password
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

