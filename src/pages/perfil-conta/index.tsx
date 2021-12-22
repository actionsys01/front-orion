import React, { useState, useMemo, useEffect, useCallback, ChangeEvent} from 'react';
import { useSession } from "next-auth/client";
import { useToasts } from "@geist-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import BotaoVoltar from "@components/BotaoVoltar";
import { ProfileBody, LogoContainer, BodyRow, ButtonStyle } from "./style"
import { BottomConfirmBtn } from '@styles/buttons';
import * as companyRequest from "@services/empresas"

export default function PerfilConta() {
    const [, setToast] = useToasts();
    const [session] = useSession();
    const router = useRouter();
    const [ hasLogo, setHasLogo] = useState(false)
    const [ logo, setLogo ] = useState<File | null>(null);
    const company_id = Number(session?.usuario.empresa.id)

    const registerFile = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
            setLogo(event.target.files[0])
            try {
                await companyRequest.uploadLogo(company_id, logo)
                setToast({
                    text: "Logo enviado com sucesso",
                    type: "success"
                })
            } catch (error) {
                console.log(error)
                setToast({
                    text: "Houve um problema tente novamente",
                    type: "warning"
                })
            }
        }
    },[logo])


    return <>
        <Head>
            <title>Orion | Conta</title>
        </Head> 
        <BotaoVoltar/>
        <h2>Configurações de Conta</h2>
        <ProfileBody>
            <div>
                <LogoContainer>
                    {hasLogo ? <img src="images/actionsys.jpg" /> : 
                        <div className='no-logo'>
                            <label id="upload">
                                <p>Sem logo... <br/> Clique para enviar
                                    <input type="file"  id="upload"  onChange={registerFile}/>
                                </p>
                            </label>
                        </div>}
                </LogoContainer>   
                <BodyRow>
                    <h6>Razão Social:</h6>
                    <h5>Actionsys</h5>
                </BodyRow>
                <BodyRow>
                    <h6>CNPJ:</h6>
                    <h5>35.00.805/0001-13</h5>
                </BodyRow>
                <BodyRow>
                    <h6>E-mail:</h6>
                    <h5>duque.tauribeiro@gmail.com</h5>
                </BodyRow>
                <BottomConfirmBtn>
                    <ButtonStyle>
                        Editar
                    </ButtonStyle>
                </BottomConfirmBtn>
            </div>
        </ProfileBody>


    </>
}

PerfilConta.auth = true