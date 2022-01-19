import React, {Dispatch, SetStateAction, useState, ChangeEvent, useCallback} from 'react';
import { X, Search, Upload, FilePlus  } from '@geist-ui/react-icons'
import ProgressBar from '@components/ProgressBar';
import {UploadModal,
    IconContainer, 
    InputsContainer,
    ModalContent, 
    ProgressBarStyle} from "../style"
import {sendCertificate} from "@services/empresas"
import { useToasts } from "@geist-ui/react";
import { useSession } from 'next-auth/client';
import { useCompanyContext } from "@contexts/company"

interface CertificadoProps {
    initialDate: Date;
    expiringDate: Date;
}

interface ModalProps {
    modalHandler: () => void;
    setUpload: Dispatch<SetStateAction<boolean>>;
    pageData: CertificadoProps;
    setPageData: Dispatch<SetStateAction<CertificadoProps>>
}

const Modal = ({modalHandler, setUpload, pageData, setPageData }: ModalProps) => {
    const [ fileName, setFileName ] = useState("");
    const [ progress, setProgress ] = useState(0);
    const [ certificate, setCertificate] = useState<File | null>(null);
    const [, setToast] = useToasts();
    const [session] = useSession();
    const [ password, setPassword] = useState("")
    const company_id = Number(session?.usuario.empresa.id)

    const { setIsCertificated } = useCompanyContext()

    const registerFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
        setFileName(event.target.value)
        setCertificate(event.target.files[0])
        }
    },[certificate])


    async function sendData() {
        if(pageData.initialDate.getFullYear() > pageData.expiringDate.getFullYear()) {
            setToast({
                text: "A data de validade deve ser posterior a data de início.",
                type: "warning"
            })
            return
        }
        if (!pageData.expiringDate || !pageData.initialDate || !password || !certificate) {
            setToast({
                text: "Favor preencher os campos corretamente.",
                type: "warning"
            })
            return
        } 
        if(pageData.initialDate.getFullYear() === pageData.expiringDate.getFullYear() &&
            pageData.initialDate.getMonth() > pageData.expiringDate.getMonth()) {
            setToast({
                text: "A data de validade deve ser posterior a data de início.",
                type: "warning"
            })
            return
        }
        if(pageData.initialDate.getFullYear() === pageData.expiringDate.getFullYear() &&
            pageData.initialDate.getMonth() === pageData.expiringDate.getMonth() && 
            pageData.initialDate.getDate() > pageData.expiringDate.getDate()){
                setToast({
                    text: "A data de validade deve ser posterior a data de início.",
                    type: "warning"
                })
                return
            }
        try {
                setProgress(60)
                await sendCertificate(certificate, {
                    company_id,
                    certificado: '',
                    data_inicio: pageData.initialDate,
                    data_vencimento: pageData.expiringDate,
                    senha: password,
                }).then(() => {
                    setProgress(100),
                    setTimeout(() => {
                        setToast({
                            text: "Documento enviado com sucesso",
                            type: "success"
                        })
                        setUpload(true)
                        setIsCertificated(true)
                        modalHandler()
                }, 1350);
                })
        } catch (error) {
            console.log(error)
            setToast({
                text: "Houve um problema tente novamente",
                type: "warning"
            })
        }
    }
    

    return <>
        <UploadModal>
            <div>
                <span><X  onClick={() => modalHandler()}/></span>
                <h4>Localize seu certificado</h4>
                <div>
                    <form action="">
                        <ModalContent>
                            <IconContainer>
                                <label id="upload" >
                                    <FilePlus />
                                    <span>{fileName ? fileName.replace(/^.*\\/, "") : "Clique para selecionar"}</span>
                                    <input type="file" id="upload" onChange={registerFile}/>
                                </label>
                            </IconContainer>
                            <InputsContainer>
                                <span>Válido de:</span>
                                <input type="date" onChange={(e) => setPageData({...pageData, initialDate: new Date(e.target.value)})}/>
                                <span>Válido até:</span>
                                <input type="date" onChange={(e) => setPageData({...pageData, expiringDate: new Date(e.target.value)})} />
                                <span>Senha:</span>
                                <input type="password" onChange={(e) => setPassword(e.target.value)}/> 
                            </InputsContainer>
                        </ModalContent>
                        <ProgressBarStyle>
                            <ProgressBar done={progress}/>
                                <button type="button" onClick={sendData} style={{borderRadius: "5px", border: "1px solid grey"}}>
                                    enviar
                                </button>
                        </ProgressBarStyle>
                    </form>
                </div>
            </div>
        </UploadModal>
        </>
}

export default Modal