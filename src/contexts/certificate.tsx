import React, { useEffect, useContext, useCallback, useReducer, useState, useMemo, Dispatch, SetStateAction } from "react";
import * as companyRequest from "@services/empresas"
import { useSession } from "next-auth/client";

interface ContextProps {
    isCertificated: boolean;
    setIsCertificated: Dispatch<SetStateAction<boolean>>
}

const CertificateContext = React.createContext({} as ContextProps);

const CertificateProvider:  React.FC = ({ children }: any) => {
    const [isCertificated, setIsCertificated] = useState(false)
    const [session] = useSession();
    const company_id = Number(session?.usuario.empresa.id)
    // console.log(company_id)
   
    const confirmCertificate = useCallback(async () => {
        const page = ""
        if(session) {
            try {
                const response = await companyRequest.getCertificate(Number(session?.usuario.empresa.id))
                const cnpjResponse = await companyRequest.getCnpj(Number(session?.usuario.empresa.id), Number(page))
                // console.log("cnpj",cnpjResponse)
                const data = response.data.certificate.certificado
                const cnpjData = cnpjResponse.data.total
                // console.log(`cnpjData`, cnpjData)
                setIsCertificated(data && cnpjData > 0 ? true : false)
                return data
            } catch (error) {
                
                setIsCertificated(false)
            }}
        },[session] )   
    
        useEffect(() => {
            confirmCertificate()
            
        }, [session])




    return <CertificateContext.Provider value={{isCertificated, setIsCertificated}}>
        {children}
    </CertificateContext.Provider>
}

export const useCertificateContext = () => {
    return useContext(CertificateContext)
}

export {CertificateContext, CertificateProvider}