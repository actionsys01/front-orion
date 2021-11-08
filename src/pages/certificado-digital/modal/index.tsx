import React, {Dispatch, SetStateAction, useState, ChangeEvent, useCallback} from 'react';
import { X, Search  } from '@geist-ui/react-icons'
import ProgressBar from '@components/ProgressBar';
import {UploadModal, FirstLine, InsideModal, ProgressBarStyle} from "../style"
import {sendCertificate} from "@services/empresas"
import { useToasts } from "@geist-ui/react";
import { useSession } from 'next-auth/client';

interface ModalProps {
    modalHandler: () => void;
    setUpload: Dispatch<SetStateAction<boolean>>
}

const Modal = ({modalHandler, setUpload}: ModalProps) => {
    const [ fileName, setFileName ] = useState("");
    const [ progress, setProgress ] = useState(0);
    const [ certificate, setCertificate] = useState<File | null>(null);
    const [, setToast] = useToasts();
    const [session] = useSession();
    const id = Number(session?.usuario.empresa.id)

    const registerFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
        setFileName(event.target.value)
        setCertificate(event.target.files[0])
        }
    },[certificate])

    async function sendData() {
        try {
            setProgress(60)
            await sendCertificate(certificate, id);
            setProgress(100)
            setToast({
                text: "Documento enviado com sucesso",
                type: "success"
            })
        } catch (error) {
            setToast({
                text: "Houve um problema tente novamente",
                type: "warning"
            })
        }
        modalHandler()
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