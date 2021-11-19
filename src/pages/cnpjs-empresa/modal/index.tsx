import { useSession } from "next-auth/client";
import { useToasts } from "@geist-ui/react";
import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import  { Modal } from "@styles/modal";

interface ModalProps {
    deleteCnpj: () => Promise<void>
    modalHandler: () => void
}


const ModalCnpjs = ({ modalHandler, deleteCnpj } : ModalProps) => {
        
    return <Modal>
        <div>
            <h4>Deseja realmente deletar o CNPJ?</h4>
            <div>
                <button onClick={() => modalHandler()}>CANCELAR</button>
                <button onClick={() => deleteCnpj()}>CONFIRMAR</button>
            </div>
        </div>

    </Modal> 
}

export default ModalCnpjs