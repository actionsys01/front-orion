import React, {useEffect, useState, ChangeEvent, useCallback} from 'react';
import { X, Search  } from '@geist-ui/react-icons'
import ProgressBar from '@components/ProgressBar';
import {UploadModal, FirstLine, InsideModal, ProgressBarStyle} from "../style"
import {sendCertificate} from "@services/empresas"
import { useToasts } from "@geist-ui/react";

interface ModalProps {
    modalHandler: () => void
}

const Modal = ({modalHandler}: ModalProps) => {
    const [ fileName, setFileName ] = useState("");
    const [ progress, setProgress ] = useState(0);
    const [ certificate, setCertificate] = useState<File | null>(null);
    const [, setToast] = useToasts();

    const registerFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
        setFileName(event.target.value)
        setCertificate(event.target.files[0])
        }
    },[certificate])

    async function sendData() {
        try {
            setProgress(50)
            await sendCertificate(certificate, 162);
            setProgress(100)
            setToast({
                text: "Documento enviado com sucesso",
                type: "success"
            })
        } catch (error) {
            setProgress(0)
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
                <h4>Localize seu Certificado</h4>
                <div>
                    <form action="">
                        <FirstLine>
                        <label id="upload" ><span>{fileName.replace(/^.*\\/, "")}</span>
                        <input type="file" id="upload" onChange={registerFile}/>
                        </label>
                        <Search />
                        </FirstLine>
                        <InsideModal>
                            <div>
                                <span>Senha</span>
                                <input type="password" />
                                <span>Responsável</span>
                                <input type="text" />
                            </div>
                            <div>
                                <span>Nome</span>
                                <input type="text" />
                                <span>CNPJ</span>
                                <input type="text" />
                            </div>
                        </InsideModal>
                        <ProgressBarStyle>
                            <ProgressBar done={progress}/>
                                <button type="button" onClick={sendData}>
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