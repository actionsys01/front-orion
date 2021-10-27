import React, {useEffect, useState, useMemo, useCallback} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import { Plus } from "@geist-ui/react-icons";
import { Section, InputStyle, InlineInputs, RightInput} from "./style"
import {AddBtn} from "@styles/buttons";
import Modal from "./modal"



export default function CertificadoDigital() {
    const [ visibleModal, setVisibleModal] = useState(false)

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
                        <>
                            <span>Validade</span>
                            <InlineInputs style={{flexDirection: "row", width: "76%"}}>
                                <span>De:</span>
                                <input type="date" />
                                <span>Até:</span>
                                <input type="date" />
                            </InlineInputs>
                        </>
                    </div>
                    <RightInput style={{width: "75%"}}>
                            <span>Status:</span>
                            <input type="text" />
                    </RightInput>
                </div>
            </Section>
            <AddBtn style={{width: "92%", marginTop: ".3rem"}}>
                <button onClick={() => setVisibleModal(true)}>
                <span><Plus /></span>
                    adicionar
                </button>
            </AddBtn>
            </div>
           {visibleModal && <Modal modalHandler={modalHandler}/>}
                
        </>
    
}

CertificadoDigital.auth = true