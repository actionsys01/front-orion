import React, {Dispatch, SetStateAction, useState, ChangeEvent, useCallback} from 'react';
import { X, Search  } from '@geist-ui/react-icons'
import ProgressBar from '@components/ProgressBar';
import {UploadModal, FirstLine, InsideModal, ProgressBarStyle} from "../style"
import {sendCertificate} from "@services/empresas"
import { useToasts } from "@geist-ui/react";
import { useSession } from 'next-auth/client';
import { useCompanyContext } from "@contexts/company"

interface CertificadoProps {
    cnpj: string;
    responsible: string;
    initialDate: Date;
    expiringDate: Date;
}

interface ModalProps {
    modalHandler: () => void;
    setUpload: Dispatch<SetStateAction<boolean>>;
    pageData: CertificadoProps;
    setPageData: Dispatch<SetStateAction<CertificadoProps>>
    // setResponsible: Dispatch<SetStateAction<string>>;
    // setCnpj: Dispatch<SetStateAction<string>>;
    // setInitialDate: Dispatch<SetStateAction<Date>>;
    // setExpiringDate: Dispatch<SetStateAction<Date>>
    // responsible: string;
    // cnpj: string;
    // initialDate: Date;
    // expiringDate: Date;
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
        try {
            setProgress(60)
            await sendCertificate(certificate, {
                company_id,
                certificado: '',
                cnpj: pageData.cnpj,
                data_inicio: pageData.initialDate,
                data_vencimento: pageData.expiringDate,
                senha: password,
            });
            setProgress(100)
            setToast({
                text: "Documento enviado com sucesso",
                type: "success"
            })
            setUpload(true)
            setIsCertificated(true)
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
                                <input type="text" onChange={(e) => setPageData({...pageData, responsible: e.target.value})}/>
                                <span>Senha</span>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <span>CNPJ</span>
                                <input type="text" onChange={(e) => setPageData({...pageData, cnpj: e.target.value})} />
                                <span>Descrição</span>
                                <input type="text" />
                            </div>
                            <div>
                                <span>Válido de:</span>
                                <input type="date" onChange={(e) => setPageData({...pageData, initialDate: new Date(e.target.value)})}/>
                                <span>Válido até:</span>
                                <input type="date" onChange={(e) => setPageData({...pageData, expiringDate: new Date(e.target.value)})} />
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