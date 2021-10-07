import BotaoVoltar from "@components/BotaoVoltar";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import {
    useToasts,
  } from "@geist-ui/react";
import React, { useState, useEffect } from "react";
import * as usuarios from "../../services/usuarios";
import Head from "next/head";
import {Wrapper, Select, InputStyle, Button} from "./style"
import api from "@services/api"

interface UpdateProps {
    id: number;
    email: string;
    nome: string;
    perfil: Perfil;
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

const AtualiarUsuario = () => {
    const [session] = useSession()
    const router = useRouter();
    const [profileData, setProfileData] = useState<Perfil[]>([])
    const [, setToast] = useToasts();
    const [newProfileId, setNewProfileId] = useState<string>("")
    console.log(newProfileId);
    
        const getProfileData = async () => {
            const response = await api.get(`/perfil/all/${session?.usuario.empresa.id}`)
            const {data} = response;
            return data
        }

        useEffect(() => {
            getProfileData().then(response => setProfileData(response))
        }, [])

        console.log(profileData);
        
        async function updateUser () {
            try {
            if(!newProfileId) {
                setToast({
                    text: "Insira um perfil válido.",
                    type: "warning",
                  });
                  return;
            } 
                await usuarios.atualizar({nome: String(router.query.nome), perfil: String(newProfileId), id: Number(router.query.id)})
                
            } catch (error) {
                console.log(error)
            }
            setNewProfileId(""),
            router.back()
        }

        // async function criarUsuario() {
           
        //     try {
        //       if (session && router.query.nome) {
        //         if (!nome || !perfilId) {
        //           setLoading(false);
        //           setToast({
        //             text: "Informe todos os dados do usuário.",
        //             type: "warning",
        //           });
        //           return;
        //         }
        //         await usuarios.atualizar({
        //           nome,
        //           perfil: perfilId,
        //           senha,
        //           id: Number(router.query.id as string),
        //         });
        //         setEmail("");
        //         setSenha("");
        //         setNome("");
        //         router.back();
        //         return;
        //       }
        

    return <>
        <Head>
            <title>Orion | Atualizar Usuário </title>
        </Head>
        <BotaoVoltar />
            <h1 >Atualizar Usuário</h1>
        <Wrapper>
        <div style={{width: 400}}>
            <Select>
            <select   onChange={(e: any) => setNewProfileId(e.target.value)} >
            <option value='' disabled selected>Tipo Perfil </option>
            {profileData.map((item, i) => 
            <option key={i} value={item.id}  >
                {item.nome} 
            </option>
            )}
            </select>
            </Select>
            <InputStyle>
            <div>
                <input type="text" placeholder={router.query.nome as string} />
            </div>
            </InputStyle>
            <InputStyle>
            <div>
                <input type="text" placeholder={router.query.email as string} />
            </div>
            </InputStyle>
            <Button type="submit" onClick={updateUser} >
                <div>Confirmar</div>
            </Button>
        </div>
        </Wrapper>
    </>
}

export default AtualiarUsuario;

AtualiarUsuario.auth = true;