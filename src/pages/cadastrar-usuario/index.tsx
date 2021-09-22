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
import api from "@services/api";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { setAppElement } from "react-modal";
import * as usuarios from "../../services/usuarios";

interface IPerfil {
  id: number;
  nome: string;
  email: string;
  perfil: Perfil;
};


interface Perfil {
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
  const [email, setEmail] = useState<string>("");
   const [senha, setSenha] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [perfilId, setPerfilId] = useState<string>(""); 
  const [empresaId, setEmpresaId] = useState<string>("")
  const { data } = useRequest<IPerfil[]>({ url: `/perfil/${session?.usuario.empresa.id}` });
  const [, setToast] = useToasts();
 /*  console.log(session); */
  //  console.log(data); 
    console.log(perfilId);  

  useEffect(() => {
    if(session){
        //  const { email, nome } = session?.usuario;
      // const {id} = session.usuario.perfil;
      const dataId = Number(session.usuario.empresa.id);
      setEmail(email as string);
      setNome(nome as string);
      setPerfilId(perfilId as string) 
      setEmpresaId(dataId)
    }
  }, []);

 
 

   async function criarUsuario() {
    //  const empresa_id =  session?.usuario.empresa.id
    setLoading(true);
    try {
      if (session && router.query.nome) {
        if (!nome || !perfilId) {
          setLoading(false);
          setToast({
            text: "Informe todos os dados do usuário.",
            type: "warning",
          });
          return;
        }
        await usuarios.atualizar({
          nome,
          perfil_id: perfilId,
          senha,
          id: Number(router.query.id as string),
        });
        setEmail("");
        setSenha("");
        setNome("");
        setPerfilId("")
        router.back();
        return;
      }

      if (!nome || !email || !senha || !perfilId) {
        setLoading(false);
        setToast({
          text: "Informe todos os dados do usuário.",
          type: "warning",
        });
        return;
      }
      if(session && !router.query.nome) {
      const response = await usuarios.cadastrar({ nome, email, senha, perfil_id: perfilId, empresa_id: empresaId })
      const id = response?.data.usuario.id;
      await usuarios.atualizar({
        nome,
        perfil_id: perfilId,
        senha,
        id,
      });
      setLoading(false);
      setEmail("");
      setSenha("");
      setNome("");
      setPerfilId("")
      router.back();
      }
    } catch (error) {
      setLoading(false);
      const mensagem = error.response.data.mensagem;
      setToast({ text: mensagem, type: "warning" });
    }
  } 



  return (
    <>
      <Head>
        <title>Orion | Cadastrar Usuário </title>
      </Head>
      <BotaoVoltar />
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <div style={{ width: 400 }}>
          <Text h1 style={{ textAlign: "center", width: "100%" }}>
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
            {data?.map((item) => (
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
