import BotaoVoltar from "@components/BotaoVoltar";
import {
  Button,
  Input,
  Row,
  Select,
  Spacer,
  Text,
  useToasts,
} from "@geist-ui/react";
import useRequest from "@hooks/useRequest";
import { useSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo } from "react";
import * as usuarios from "../../services/usuarios";
import Modal from "./modal"
interface IPerfil {
  id: number;
  nome: string;
  email: string;
  perfil: Perfil;
};

interface NewProfile {
  total: number,
  perfis: Perfil
}


export interface Perfil {
  id: number;
  nome: string;
  descricao: string;
  criadoEm: string;
  atualizadaEm: string;
  criadoPorIp: string;
  atualizadoPorIp: string;
}

export default function Usuarios() {
  const [session] = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirm, setConfirm] = useState("")
  const [nome, setNome] = useState("");
  const [perfilId, setPerfilId] = useState(""); 
  const [empresaId, setEmpresaId] = useState("")

  const { data } = useRequest<NewProfile[]>({ url: `/perfil/all/${empresaId}` });
  const [, setToast] = useToasts();
  const [ visibleModal, setVisibleModal ] = useState(false)
  

  useEffect(() => {
    if(session){
      const dataId: any = session.usuario.empresa.id;
      setEmpresaId(dataId)
    }
  }, []);


  async function criarUsuario() {
    setLoading(true);
    try {
      if (!nome || !email || !senha || !perfilId || !confirm) {
        setLoading(false);
        setToast({
          text: "Informe todos os dados do usuário",
          type: "warning",
        });
        return;
      }
      if(senha != confirm) {
        setLoading(false);
        setToast({
          text: "Por favor confirme sua senha corretamente",
          type: "warning",
        });
        return;
      }
      if(session && !router.query.nome) {
      await usuarios.cadastrar({ nome, email, senha, perfil_id: perfilId, empresa_id: empresaId })
      setLoading(false);
      setEmail("");
      setSenha("");
      setNome("");
      setPerfilId("")
      setVisibleModal(true)
      }
    } catch (error: any) {
      setLoading(false);
      const mensagem = error.response.data.mensagem;
      setToast({ text: mensagem, type: "warning" });
    }
  } 

  const gatheredData = useMemo(() => {
    const allData: any = [];
    if(data) {
      data.forEach((item) => {
        allData.push({
          ...item,
        })
      })
    }
    return allData
  }, [data])



  return (
    <>
      <Head>
        <title>Orion | Cadastrar Usuário </title>
      </Head>
      <BotaoVoltar />
      {visibleModal && <Modal />}
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <div style={{ width: 400 }}>
          <Text h1 style={{ textAlign: "center", width: "100%", lineHeight: 1 }}>
            {!router.query.nome ? "Cadastrar Usuário" : "Editar Usuário"}
          </Text>
          <Select
            placeholder={"Tipo perfil"}
            value={perfilId} 
            onChange={(value) => setPerfilId(value as string)}
            //  initialValue={data?.[0].id.toString()}
            width={"100%"}
            style={{ maxWidth: "100%" }}
          >
              {data?.map((item: any) => (
              <Select.Option key={item.id} value={item.id.toString()}>
                {item.nome}
              </Select.Option>
            ))} 
          </Select>
          <Spacer y={0.5} />
          <Input
            placeholder="Nome"
            width="100%"
            value={nome}
            onChange={(e) => setNome(e.target.value)} 
          />
          {!router.query.nome && (
            <>
              <Spacer y={0.5} />
              <Input
                placeholder="Email"
                width="100%"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}
          {!router.query.nome && (
            <>
              <Spacer y={0.5} />
              <Input.Password
                placeholder="Senha"
                width="100%"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <Spacer y={0.5} />
              <Input.Password
                placeholder="Confirme sua senha"
                width="100%"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </>
          )}
          <Spacer y={0.5} />
          <Button
            loading={loading}
            onClick={criarUsuario}
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

Usuarios.auth = true;
