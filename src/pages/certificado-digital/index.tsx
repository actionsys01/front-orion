import React, {useEffect, useState, useMemo, useCallback} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import { Plus,Trash2 } from "@geist-ui/react-icons";
import { Section, InputStyle, InlineInputs, RightInput, BtnRow} from "./style"
import Modal from "./modal"
import  {format} from "date-fns";
import * as companyRequest from "@services/empresas";
import { useSession } from "next-auth/client";
import  { useCompanyContext } from "@contexts/company"
import { useSecurityContext } from "@contexts/security"
import CnpjsModal from "./cnpjs-modal"
import { useToasts } from "@geist-ui/react";
import DeletarModal from "./delete-modal"
import { certificateState } from "@utils/initial-states"

export default function CertificadoDigital() {
    // modais
    const [ visibleModal, setVisibleModal ] = useState(false);
    const [ secondModal, setSecondModal ] = useState(false)
    const [ deleteModal, setDeleteModal ] = useState(false)
    //
    const [ pageData, setPageData ] = useState({...certificateState})
    const [ upload, setUpload ] = useState(false)       
    const router = useRouter()
    const [session] = useSession();
    const company_id = Number(session?.usuario.empresa.id)
    const { isCertificated, setIsCertificated } = useCompanyContext()
    const { certificatePermissions } = useSecurityContext()
    const [, setToast] = useToasts();

    console.log(`router.query`, router.query)
    console.log(`isCertificated`, isCertificated)

    function uploadModalHandler() {
        if (router.query.isCertificated === "false" &&  !isCertificated) {
            setVisibleModal(true)
        } else setVisibleModal(false)
    }
    useEffect(() => {
        uploadModalHandler()
    }, [isCertificated])

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

    const deleteModalHandler = useCallback(() => {
        setDeleteModal(!deleteModal)
    }, [deleteModal])


    async function getCerficateData() {
        try {
            const response = await companyRequest.getCertificate(company_id)
            const data = response.data
            console.log("certi",data)
            setPageData({...pageData, initialDate: data.data_inicio, expiringDate: data.data_vencimento})
            return data
        } catch (error) {
            // console.log(error)
            // setToast({
            //         text: "Houve um problema, por favor tente novamente",
            //         type: "warning"
            //     })
        }
    }

    async function deleteCertificate() {
        try {
            await companyRequest.deleteCertificate(Number(session.usuario.empresa.id))
            setToast({
                text: "Certificado excluído com sucesso",
                type: "success"
            })
            setIsCertificated(false)
            getCerficateData()
        } catch (error) {
            console.log(error)
            setToast({
                    text: "Houve um problema, por favor tente novamente",
                    type: "warning"
                })
        }
        deleteModalHandler()
    }

    useEffect(() => {
        getCerficateData()
    }, [])

    useEffect(() => {
        console.log(`pageData`, pageData)
    }, [pageData])


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
                        <InlineInputs>
                            <span>Validade</span>
                            <div>
                                <span>De:</span>
                                <input type="text" readOnly value={isCertificated ? format(new Date(pageData.initialDate), "dd/MM/yyyy"): ""} />
                                <span>Até:</span>
                                <input type="text" readOnly value={isCertificated ? format(new Date(pageData.expiringDate), "dd/MM/yyyy"): ""} />
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
                <button disabled={!certificatePermissions.EXCLUIR}
                    onClick={() => setDeleteModal(true)}>
                    <span><Trash2 /></span>
                        deletar
                </button>
                <button disabled={!certificatePermissions.ADICIONAR}
                    onClick={() => setVisibleModal(true)}>
                    <span><Plus /></span>
                        adicionar
                </button>
            </BtnRow>
            </div>
        {visibleModal && 
                <Modal modalHandler={modalHandler} setUpload={setUpload}
                    pageData={pageData} setPageData={setPageData}/>}
        {secondModal &&
                <CnpjsModal secondModalHandler={secondModalHandler} />
                }   
        {deleteModal && 
        <DeletarModal deleteModalHandler={deleteModalHandler} deleteCertificate={deleteCertificate} />}
        </>
    
}

CertificadoDigital.auth = true