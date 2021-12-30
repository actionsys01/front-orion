import React, { useEffect, useContext, useCallback, useReducer, useState, useMemo, Dispatch, SetStateAction } from "react";
import * as companyRequest from "@services/empresas"
import { useSession } from "next-auth/client";
import { companyProfile } from "@utils/initial-states"

interface ContextProps {
    isCertificated: boolean;
    setIsCertificated: Dispatch<SetStateAction<boolean>>
    companyFeatures: CompanyProps
}

interface CompanyProps {
    logo: string;
    nome: string
}

const CompanyContext = React.createContext({} as ContextProps);

const CompanyProvider:  React.FC = ({ children }: any) => {
    const [isCertificated, setIsCertificated] = useState(false)
    const [session] = useSession();
    // const company_id = Number(session?.usuario.empresa.id)
    const [ companyFeatures, setCompanyFeatures ] = useState({...companyProfile})
    // console.log(company_id)
   
    const confirmCertificate = useCallback(async () => {
        const page = ""
        if(session) {
            try {
                const response = await companyRequest.getCertificate(Number(session?.usuario.empresa.id))
                const cnpjResponse = await companyRequest.getCnpj(Number(session?.usuario.empresa.id), Number(page))
                
                const data = response.data.certificate.certificado
                const cnpjData = cnpjResponse.data.total
                
                setIsCertificated(data && cnpjData > 0 ? true : false)
                return data
            } catch (error) {
                
                setIsCertificated(false)
            }}
        },[session] )   
    
        useEffect(() => {
            confirmCertificate()
            
        }, [session])

    async function getCompanyFeatures() {
        try {
            const companyResponse = await companyRequest.getCompanyById(Number(session?.usuario.empresa.id))

            const companyData = companyResponse.data
            setCompanyFeatures({logo: companyData.logo, nome: companyData.nome_fantasia})
            console.log(`companyData`, companyData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCompanyFeatures()
    }, [])





    return <CompanyContext.Provider value={{isCertificated, setIsCertificated, companyFeatures}}>
        {children}
    </CompanyContext.Provider>
}

export const useCompanyContext = () => {
    return useContext(CompanyContext)
}

export {CompanyContext, CompanyProvider}