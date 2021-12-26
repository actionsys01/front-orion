import React, { useState, useMemo, useEffect, useCallback, ChangeEvent} from 'react';
import { useSession } from "next-auth/client";
import { useToasts } from "@geist-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import BotaoVoltar from "@components/BotaoVoltar";
import { ProfileBody, LogoContainer, BodyRow, ButtonStyle } from "./style"
import { BottomConfirmBtn } from '@styles/buttons';
import * as companyRequest from "@services/empresas";
import { ModalInputContainer } from "@styles/modal-inputs"

export default function PerfilConta() {
    const [, setToast] = useToasts();
    const [session] = useSession();
    const router = useRouter();
    const [ hasLogo, setHasLogo] = useState(true)
    const company_id = Number(session?.usuario.empresa.id)
    const [ companyLogo, setCompanyLogo ] = useState("")
    const [ visibleModal, setVisibleModal ] = useState(false)



    const getLogo = useCallback(async() => {
        const response = await companyRequest.getCompanyById(company_id)
        const data = response.data
        const logoUrl = data.logo 
        if(logoUrl.includes('.jpeg')) {
           const jpegIndex =  logoUrl.indexOf('.jpeg', 0)
           const jpeg = logoUrl.substring(0, jpegIndex + 5)
           setCompanyLogo((jpeg))
        } if(logoUrl.includes('.jpg')) {
            const jpgIndex = logoUrl.indexOf('.jpg', 0)
            const jpg = logoUrl.substring(0, jpgIndex + 4 )
            setCompanyLogo(jpg)
        } if (logoUrl.includes('.png')) {
            const pngIndex = logoUrl.indexOf('.png', 0)
            const png = logoUrl.substring(0, pngIndex + 4)
            console.log(`png`, png)
            setCompanyLogo(png)
        }
        },[],)

        useEffect(() => {
            getLogo()
        }, [])

    const registerFile = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
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
                    {hasLogo ? <img src={companyLogo}/> : 
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
        <ModalInputContainer>
            <div>
                <h4>Editar</h4>
                <h6>Perfil da Empresa</h6>
                <div className="input-container">
                    <div>
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id='nome'/>
                    </div>
                    <div>
                    <label htmlFor="social">Razão Social</label>
                        <input type="text" id='social' />
                    </div>
                </div>
                <div className="btn-container">
                    <button>CANCELAR</button>
                    <button>CONFIRMAR</button>
                </div>
            </div>
        </ModalInputContainer>

    </>
}

PerfilConta.auth = true