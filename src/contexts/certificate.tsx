import React, { useEffect, useContext, useCallback, useReducer, useState, useMemo, Dispatch, SetStateAction } from "react";
import * as dashboard from "@services/empresas"

interface ContextProps {
    isCertificated: boolean;
    setIsCertificated: Dispatch<SetStateAction<boolean>>
}

const CertificateContext = React.createContext({} as ContextProps);

const CertificateProvider:  React.FC = ({ children }: any) => {
    const [isCertificated, setIsCertificated] = useState(false)

    const confirmCertificate = useCallback(async () => {
            try {
                const response = await dashboard.getDashboard("120.099.2999-7")
                const data = response.data
                console.log("dash",data)
                setIsCertificated(true)
                return data
            } catch (error) {
                console.log('não tem')
                setIsCertificated(false)
            }
        },[] )
    
        useEffect(() => {
            confirmCertificate()
            
        }, [])




    return <CertificateContext.Provider value={{isCertificated, setIsCertificated}}>
        {children}
    </CertificateContext.Provider>
}

export const useCertificateContext = () => {
    return useContext(CertificateContext)
}

export {CertificateContext, CertificateProvider}