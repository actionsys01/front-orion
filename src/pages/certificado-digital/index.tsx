import React, {useEffect, useState, useMemo, useCallback} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import { Plus,Trash2 } from "@geist-ui/react-icons";
import { Section, InputStyle, InlineInputs, RightInput, BtnRow} from "./style"
import Modal from "./modal"
import  {format} from "date-fns";
import * as companyRequest from "@services/empresas";
import { useSession } from "next-auth/client";
import  {useCertificateContext} from "@contexts/certificate"
import CnpjsModal from "./cnpjs-modal"


interface CertificadoProps {
    id: number;
    cnpj: string;
    certificado: string;
    data_inicio: Date;
    data_vencimento: Date;
}




export default function CertificadoDigital() {
    // modais
    const [ visibleModal, setVisibleModal ] = useState(false);
    const [ secondModal, setSecondModal] = useState(false)
    //
    const [ upload, setUpload ] = useState(false)
    const [ responsible, setResponsible ] = useState("")
    const [ cnpj, setCnpj ] = useState("")
    const [ initialDate, setInitialDate ] = useState(new Date)
    const [ expiringDate, setExpiringDate ] = useState(new Date)
    const router = useRouter()
    const [session] = useSession();
    const company_id = Number(session?.usuario.empresa.id)
    const { isCertificated } = useCertificateContext()

    useEffect(() => {
        if (router.query.isCertificated === "false" ) {
            setVisibleModal(true)
        }
    }, [])

    useEffect(() => {
        if(!isCertificated && upload ) {
            setSecondModal(true)
        }
    }, [upload])

    
    const modalHandler = useCallback(() => {
        setVisibleModal(!visibleModal)
    }, [visibleModal])

    const secondModalHandler = useCallback(() => {
        setSecondModal(!secondModal)
    }, [secondModal])


    async function getCerficateData() {
        try {
            const response = await companyRequest.getCertificate(company_id)
            const data = response.data.certificate
            console.log("certi",data)
            setCnpj(data.cnpj)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCerficateData()
    }, [])


    return <>
            <Head>
                <title>Orion | Certificado Digital</title>
            </Head>
            <h2>
                Certificado Digital
            </h2>
           <div style={{display: "flex", flexDirection: "column", justifyContent: "center", height: "85%"}}>
            <Section>
                <div>
                    <div>
                        <InputStyle>
                            <span>Responsável:</span>
                            <input type="text" readOnly value={isCertificated ? "Jorge Lubrinni": ""}/>
                        </InputStyle>
                        <InputStyle>
                            <span>CNPJ:</span>
                            <input type="text" readOnly value={isCertificated ? cnpj: ""} />
                        </InputStyle>
                            <InlineInputs>
                                <span>Validade</span>
                                <div>
                                    <span>De:</span>
                                    <input type="text" readOnly value={isCertificated ? format(new Date(initialDate), "dd/MM/yyyy"): ""} />
                                    <span>Até:</span>
                                    <input type="text" readOnly value={isCertificated ? format(new Date(expiringDate), "dd/MM/yyyy"): ""} />
                                </div>
                            </InlineInputs>
                    </div>
                    <RightInput>
                            <span>Status:</span>
                            <div>
                                <div className={isCertificated ? "confirm" : ""}></div>
                            </div>
                            {isCertificated && <span>Confirmado</span>}
                    </RightInput>
                </div>
            </Section>
            <BtnRow>
                <button >
                    <span><Trash2 /></span>
                        deletar
                </button>
                <button onClick={() => setVisibleModal(true)}>
                    <span><Plus /></span>
                        adicionar
                </button>
            </BtnRow>
            </div>
           {visibleModal && 
                <Modal modalHandler={modalHandler} setUpload={setUpload}
                    responsible={responsible} setResponsible={setResponsible} 
                    cnpj={cnpj} setCnpj={setCnpj}
                    initialDate={initialDate} setInitialDate={setInitialDate}
                    expiringDate={expiringDate} setExpiringDate={setExpiringDate} />}
           {secondModal &&
                <CnpjsModal secondModalHandler={secondModalHandler} />
                }     
        </>
    
}

CertificadoDigital.auth = true