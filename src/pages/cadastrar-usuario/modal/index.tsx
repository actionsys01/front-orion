import React from 'react';
import { useRouter } from "next/router";
import { Modal } from "@styles/modal"
import { TextStyle } from "./style"



const ModalUser = () => {
    const router = useRouter();


    return <Modal>
        <div>
            <TextStyle>
                Cadastro concluído com sucesso! Dentro de instantes maiores instruções serão enviadas através do e-mail cadastrado.
            </TextStyle>
            <div>
                <button
                onClick={() => router.push({pathname: "/usuarios"})}>
                    OK
                </button>
            </div>
        </div>
    
    </Modal>
}

export default ModalUser