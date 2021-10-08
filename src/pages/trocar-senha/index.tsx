import { Button, Input, Row, Spacer, Text, useToasts } from "@geist-ui/react";
import * as usuarios from "@services/usuarios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import api from "@services/api";
import { useSession } from "next-auth/client";

export default function TrocarSenha() {
  const [loading, setLoading] = useState(false);
  const [ session ] = useSession();
  const router = useRouter();
  const [senha, setSenha] = useState("");
  const [, setToast] = useToasts();

  async function trocarSenha() {
    setLoading(true);
    if (!senha) {
      setLoading(false);
      setToast({ text: "Informe senha", type: "warning" });
      return;
    }
    try {
      await api.post("/password/change-password/", {
        user_id : session?.usuario.id,
        password : senha
      })

      setToast({ text: "Senha trocada com sucesso", type: "success" });
      
    } catch (error) {
      setToast({ text: "Ocorreu um problema ao efetuar a troca de senha", type: "error" });
    } finally {
      setLoading(false);
      router.push("/");
    }
  
  }
  return (
    <>
      <Head>
        <title>Orion | Trocar senha </title>
      </Head>
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <div>
          <Text h1 style={{ textAlign: "center" }}>
            Alterar senha
          </Text>
          <Input.Password
            size="large"
            placeholder="Digite sua senha"
            width="100%"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Spacer y={0.5} />
          <Button
            loading={loading}
            size="large"
            onClick={trocarSenha}
            type="secondary-light"
            style={{ width: "100%" }}
          >
            Confirmar
          </Button>
        </div>
      </Row>
    </>
  );
}

TrocarSenha.auth = true;
