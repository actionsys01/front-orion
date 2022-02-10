import BotaoVoltar from '@components/BotaoVoltar';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useToasts } from '@geist-ui/react';
import React, { useState, useEffect } from 'react';
import * as usuarios from '../../services/usuarios';
import Head from 'next/head';
import { Wrapper, Select, InputStyle, Button } from './style';
import api from '@services/api';

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
    const [session] = useSession();
    const router = useRouter();
    const [profileData, setProfileData] = useState<Perfil[]>([]);
    const [, setToast] = useToasts();
    const [newProfileId, setNewProfileId] = useState<string>('');

    useEffect(() => {
        if (newProfileId.length) {
            console.log('foi');
        } else {
            console.log('num foi');
        }
    }, []);

    console.log(`router.query`, router.query);

    const getProfileData = async () => {
        const response = await api.get(
            `/perfil/all/${session?.usuario.empresa.id}`,
        );
        const { data } = response;
        setProfileData(data);
        return data;
    };

    useEffect(() => {
        getProfileData();
    }, []);

    // console.log(profileData);

    async function updateUser() {
        try {
            // if(!newProfileId) {
            //     setToast({
            //         text: "Insira um perfil válido.",
            //         type: "warning",
            //       });
            //       return;
            // }
            await usuarios.atualizar({
                nome: String(router.query.nome),
                perfil: !newProfileId.length
                    ? String(session?.usuario.perfil.id)
                    : String(newProfileId),
                id: Number(router.query.id),
            });
            setToast({
                text: 'Usuário atualizado com sucesso',
                type: 'success',
            });
        } catch (error) {
            setToast({
                text: 'Houve um problema, por favor tente novamente.',
                type: 'warning',
            });
        }
        setNewProfileId(''), router.back();
    }

    return (
        <>
            <Head>
                <title>Orion | Atualizar Usuário </title>
            </Head>
            <BotaoVoltar />
            <Wrapper>
                <h1>
                    Atualizar <br /> Usuário
                </h1>
                <div style={{ width: 400 }}>
                    <Select>
                        <select
                            defaultValue={session?.usuario.perfil.id}
                            onChange={(e: any) =>
                                setNewProfileId(e.target.value)
                            }
                        >
                            <option
                                defaultValue={session?.usuario.perfil.id}
                                selected
                                disabled
                            >
                                {session?.usuario.perfil.nome}
                            </option>
                            {profileData.map((item, i) => (
                                <option key={i} value={item.id}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                    </Select>
                    <InputStyle>
                        <div>
                            <input
                                type="text"
                                placeholder={router.query.nome as string}
                            />
                        </div>
                    </InputStyle>
                    <InputStyle>
                        <div>
                            <input
                                type="text"
                                placeholder={router.query.email as string}
                            />
                        </div>
                    </InputStyle>
                    <Button type="submit" onClick={updateUser}>
                        <div>Confirmar</div>
                    </Button>
                </div>
            </Wrapper>
        </>
    );
};

export default AtualiarUsuario;

AtualiarUsuario.auth = true;
