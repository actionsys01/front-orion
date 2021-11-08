import React, {useEffect, useState, useMemo, useCallback} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import { Plus,Trash2 } from "@geist-ui/react-icons";
import { Section, InputStyle, InlineInputs, RightInput, BtnRow} from "./style"
import Modal from "./modal"



export default function CertificadoDigital() {
    const [ visibleModal, setVisibleModal] = useState(false);
    const [ upload, setUpload] = useState(false)

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
                            <input type="text" />
                        </InputStyle>
                        <InputStyle>
                            <span>CNPJ:</span>
                            <input type="text" />
                        </InputStyle>
                            <InlineInputs>
                                <span>Validade</span>
                                <div>
                                <span>De:</span>
                                <input type="date" />
                                <span>Até:</span>
                                <input type="date" />
                                </div>
                            </InlineInputs>
                    </div>
                    <RightInput>
                            <span>Status:</span>
                            <input type="text" />
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
           {visibleModal && <Modal modalHandler={modalHandler} setUpload={setUpload}/>}
                
        </>
    
}

CertificadoDigital.auth = true