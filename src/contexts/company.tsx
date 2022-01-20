import React, { useEffect, useContext, useCallback, useReducer, useState, useMemo, Dispatch, SetStateAction } from "react";
import * as companyRequest from "@services/empresas"
import { useSession } from "next-auth/client";
import { companyProfile } from "@utils/initial-states"

interface ContextProps {
    isCertificated: boolean;
    setIsCertificated: Dispatch<SetStateAction<boolean>>
    companyFeatures: CompanyProps
    getCompanyFeatures: () => Promise<void>
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
        if(session) {
            try {
                const response = await companyRequest.getCertificate(Number(session?.usuario.empresa.id))
                const data = response.data.certificado
                // console.log(`data CONTEXT`, data)
                // const cnpjResponse = await companyRequest.getCnpj(Number(session?.usuario.empresa.id))
                // const cnpjData = cnpjResponse.data.total
                // console.log(`cnpjData`, cnpjData)
                setIsCertificated(true)
            } catch (error) {
                
                setIsCertificated(false)
            }}
        },[session] )   
    
        useEffect(() => {
            confirmCertificate()
            
        }, [session])

    async function getCompanyFeatures() {
        if(session){
            try {
                const companyResponse = await companyRequest.getCompanyById(Number(session?.usuario.empresa.id))
    
                const companyData = companyResponse.data
                setCompanyFeatures({logo: companyData.logo, nome: companyData.nome_fantasia})
                // console.log(`companyData`, companyData)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        getCompanyFeatures()
    }, [session])





    return <CompanyContext.Provider value={{isCertificated, setIsCertificated, companyFeatures, getCompanyFeatures}}>
        {children}
    </CompanyContext.Provider>
}

export const useCompanyContext = () => {
    return useContext(CompanyContext)
}

export {CompanyContext, CompanyProvider}