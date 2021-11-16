import React, {useEffect, useState, useMemo, useCallback} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import { Plus,Trash2 } from "@geist-ui/react-icons";
import { Section, InputStyle, InlineInputs, RightInput, BtnRow} from "./style"
import Modal from "./modal"
import  {format} from "date-fns";



export default function CertificadoDigital() {
    const [ visibleModal, setVisibleModal ] = useState(false);
    const [ upload, setUpload ] = useState(false)
    const [ responsible, setResponsible ] = useState("")
    const [ cnpj, setCnpj ] = useState("")
    const [ initialDate, setInitialDate ] = useState(new Date)
    const [ expiringDate, setExpiringDate ] = useState(new Date)
    
    const modalHandler = useCallback(() => {
        setVisibleModal(!visibleModal)
    }, [visibleModal])


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
                            <input type="text" value={upload ? responsible : ""}/>
                        </InputStyle>
                        <InputStyle>
                            <span>CNPJ:</span>
                            <input type="text" value={upload ? cnpj: ""} />
                        </InputStyle>
                            <InlineInputs>
                                <span>Validade</span>
                                <div>
                                    <span>De:</span>
                                    <input type="text" value={upload ? format(new Date(initialDate), "dd/MM/yyyy"): ""} />
                                    <span>Até:</span>
                                    <input type="text" value={upload ? format(new Date(expiringDate), "dd/MM/yyyy"): ""} />
                                </div>
                            </InlineInputs>
                    </div>
                    <RightInput>
                            <span>Status:</span>
                            <div>
                                <div className={upload ? "confirm" : ""}></div>
                            </div>
                            {upload && <span>Confirmado</span>}
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
           {visibleModal && <Modal modalHandler={modalHandler} setUpload={setUpload}
           responsible={responsible} setResponsible={setResponsible} 
           cnpj={cnpj} setCnpj={setCnpj}
           initialDate={initialDate} setInitialDate={setInitialDate}
           expiringDate={expiringDate} setExpiringDate={setExpiringDate} />}
                
        </>
    
}

CertificadoDigital.auth = true