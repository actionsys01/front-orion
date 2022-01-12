import React, { useState, useMemo, useEffect, useCallback} from 'react'; 
import { useRouter } from "next/router";
import { X  } from '@geist-ui/react-icons'
import { ModalStyle } from './style';

const CertificateConfirm = () => {
    const router = useRouter()
    

    return <ModalStyle>
        <div>
            <h5>
                Seja bem-vindo(a) à família Action Systems!
            </h5>
            <h6>
                Faltam apenas alguns passos para ter acesso total a todas as facilidades do nosso sistema. <br/>
                Para concluir seu cadastro será necessário realizar o upload do seu certificado digital, <br/> e caso possua, realizar o cadastro dos demais CNPJs de sua empresa.<br/>
                Gostaria de completar seu cadastro agora?
            </h6>
            <div>
                <button  onClick={() => router.push({
                pathname: "/dashboard",
                query: {certificate: "close"}
                    })}>Cadastrar depois</button>   
                <button 
                onClick={() => router.push({
                    pathname: "/certificado-digital",
                    query: {isCertificated: "false"}
                })}
                >Iniciar Cadastro</button>
            </div>
            
        </div>
    </ModalStyle>
}

export default CertificateConfirm
