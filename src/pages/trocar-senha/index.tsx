import { Button, Input, Row, Spacer, Text, useToasts } from "@geist-ui/react";
import * as usuarios from "@services/usuarios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import api from "@services/api";
import { useSession } from "next-auth/client";

export default function TrocarSenha() {
  const [loading, setLoading] = useState(false);
  const [ session ] = useSession();
  const router = useRouter();
  const [ senhaAtual, setSenhaAtual ] = useState("");
  const [ senha, setSenha ] = useState("");
  const [ confirm, setConfirm ] = useState("");
  const [, setToast] = useToasts();

  // useEffect(() => {
  //   console.log(`senha`, senha)
  //   console.log(`confirm`, confirm)
  // }, [senha, confirm])

  async function trocarSenha() {
    setLoading(true);
    if (!senha || !senhaAtual || !confirm) {
      setLoading(false);
      setToast({  text: "Favor preencher corretamente todos os campos", 
                  type: "warning" });
      return;
    } if (senha != confirm) {
      setLoading(false);
      setToast({  text: "Nova senha deve ser confirmada corretamente", 
                  type: "warning" });
      return;
    }
    try {
      await api.post("/password/change-password/", {
        user_id : session?.usuario.id,
        old_password: senhaAtual,
        password : senha
      })

      setToast({  text: "Senha alterada com sucesso", 
                  type: "success" });
      
    } catch (error) {
      setToast({  text: "Ocorreu um problema ao efetuar a troca de senha", 
                  type: "error" });
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
            placeholder="Digite sua senha atual"
            width="100%"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
          />
          <Spacer y={0.5} />
          <Input.Password
            size="large"
            placeholder="Digite sua nova senha"
            width="100%"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Spacer y={0.5} />
          <Input.Password
            size="large"
            placeholder="Confirme sua nova senha"
            width="100%"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <Spacer y={0.7} />
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
