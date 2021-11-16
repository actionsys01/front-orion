import React, { useState, useMemo, useEffect, useCallback} from 'react'; 
import { useRouter } from "next/router";
import { X  } from '@geist-ui/react-icons'
import { ModalStyle } from './style';

const CertificateConfirm = () => {
    const router = useRouter()
    

    return <ModalStyle>
        <div>
            <span><X /></span>
            <h5>Para concluir seu cadastro é necessário realizar
                upload do seu certificado digital e, caso possua,
                cadastrar os demais CNPJs de sua empresa 
            </h5>
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
