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
    const [ hasLogo, setHasLogo] = useState(true)
    const [ logo, setLogo ] = useState<File | null>(null);
    const company_id = Number(session?.usuario.empresa.id)
    const [ companyLogo, setCompanyLogo ] = useState("")

    const getLogo = useCallback(async() => {
        const response = await companyRequest.getCompanyById(company_id)
        const data = response.data
        console.log(`data no getlogo`, data.logo)
        // const test = URL.createObjectURL(data.logo)
        setCompanyLogo(data.logo)
        },[],)

        useEffect(() => {
            getLogo()
            console.log(`companyLogo`, companyLogo)
        }, [])

    const registerFile = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        // console.log(`event.target.files`, event.target.files[0])
        if(event.target.files) {
            setLogo(event.target.files[0])
            try {
                await companyRequest.uploadLogo(company_id, event.target.files[0])
                // console.log(`logo`, logo)
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
    },[])


    return <>
        <Head>
            <title>Orion | Conta</title>
        </Head> 
        <BotaoVoltar/>
        <h2>Configurações de Conta</h2>
        <ProfileBody>
            <div>
                <LogoContainer>
                    {hasLogo ? <img src='https://grawebstorage.blob.core.windows.net/teste/1640207357926-875a1bf1-5567-42bb-8a90-e9ef4931880b.jpg'/> : 
                        <div className='no-logo'>
                            <label id="logo">
                                <p>Sem logo... <br/> Clique para enviar
                                    <input type="file"  id="logo"  onChange={registerFile}/>
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