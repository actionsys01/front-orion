import React, {Dispatch, SetStateAction, useState, ChangeEvent, useCallback} from 'react';
import { X, Search  } from '@geist-ui/react-icons'
import ProgressBar from '@components/ProgressBar';
import {UploadModal, FirstLine, InsideModal, ProgressBarStyle} from "../style"
import {sendCertificate} from "@services/empresas"
import { useToasts } from "@geist-ui/react";
import { useSession } from 'next-auth/client';
import api from "@services/api"

interface ModalProps {
    modalHandler: () => void;
    setUpload: Dispatch<SetStateAction<boolean>>;
    setResponsible: Dispatch<SetStateAction<string>>;
    setCnpj: Dispatch<SetStateAction<string>>;
    setInitialDate: Dispatch<SetStateAction<Date>>;
    setExpiringDate: Dispatch<SetStateAction<Date>>
    responsible: string;
    cnpj: string;
    initialDate: Date;
    expiringDate: Date;
}

const Modal = ({modalHandler, responsible, setResponsible, cnpj, setCnpj, setUpload, 
    initialDate, setInitialDate, expiringDate, setExpiringDate}: ModalProps) => {

    const [ fileName, setFileName ] = useState("");
    const [ progress, setProgress ] = useState(0);
    const [ certificate, setCertificate] = useState<File | null>(null);
    const [, setToast] = useToasts();
    const [session] = useSession();
    const [ password, setPassword] = useState("")
    // const id = Number(session?.usuario.empresa.id)
    const time = new Date

    const registerFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
        setFileName(event.target.value)
        setCertificate(event.target.files[0])
        }
    },[certificate])

    async function sendData() {
        try {
            setProgress(60)
            await sendCertificate(certificate, {
                certificado: '',
                cnpj: cnpj,
                data_inicio: initialDate,
                data_vencimento: expiringDate,
                senha: password,
            });
            setProgress(100)
            setToast({
                text: "Documento enviado com sucesso",
                type: "success"
            })
            setUpload(true)
        } catch (error) {
            console.log(error)
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
                                <span>Responsável</span>
                                <input type="text" onChange={(e) => setResponsible(e.target.value)}/>
                                <span>Senha</span>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <span>CNPJ</span>
                                <input type="text" onChange={(e) => setCnpj(e.target.value)} />
                                <span>Descrição</span>
                                <input type="text" />
                            </div>
                            <div>
                                <span>Válido de:</span>
                                <input type="date" onChange={(e) => setInitialDate(new Date(e.target.value))}/>
                                <span>Válido até:</span>
                                <input type="date" onChange={(e) => setExpiringDate(new Date(e.target.value))} />
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