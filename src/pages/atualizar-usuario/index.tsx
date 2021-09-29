import BotaoVoltar from "@components/BotaoVoltar";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import * as usuarios from "../../services/usuarios";
import Head from "next/head";
import {Wrapper, Select, InputStyle, Button} from "./style"
import {Perfil} from "../cadastrar-usuario/"
import api from "@services/api"

interface UpdateProps {
    id: number;
    email: string;
    nome: string;
     perfil: Perfil;
}



const AtualiarUsuario = () => {
    const [session] = useSession()
    const router = useRouter();
    const [profileData, setProfileData] = useState<Perfil[]>([])

        const getProfileData = async () => {
            const response = await api.get(`/perfil/${session?.usuario.empresa.id}`)
            const {data} = response;
            return data
        }

        useEffect(() => {
            getProfileData().then(response => setProfileData(response))
        }, [])

        console.log(profileData);
        
        const updateUser = () => {
            
        }

    return <>
        <Head>
            <title>Orion | Atualizar Usuário </title>
        </Head>
        <BotaoVoltar />
        <Wrapper>
        <div style={{width: 400}}>
            <h1 style={{ textAlign: "center", width: "100%" }}>Atualizar Usuário</h1>
            <Select>
            <select name="perfil" id="perfil">
            <option value='' disabled selected>Tipo Perfil </option>
            {profileData.map((item) => 
            <option value={item.id}>
                {item.nome}
            </option>
            )}
            </select>
            </Select>
            <InputStyle>
            <div>
                <input type="text" placeholder={router.query.nome} />
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