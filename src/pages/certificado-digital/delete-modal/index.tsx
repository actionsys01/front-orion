import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { useSession } from "next-auth/client";
import { useToasts } from "@geist-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Modal } from "@styles/modal"

interface ModalProps {
    deleteModalHandler: () => void
    deleteCertificate: () => Promise<void>
}

const DeletarModal = ({deleteModalHandler, deleteCertificate} : ModalProps) => {
    

    return <Modal> 
        <div>
            <h4 style={{textAlign: 'center'}}>
                Deseja realmente excluir o certificado?
            </h4>
            <div>
                <button onClick={() => deleteModalHandler()}>CANCELAR</button>
                <button onClick ={() => deleteCertificate()}>CONFIRMAR</button>
            </div>
        </div>

    </Modal>
}

export default DeletarModal



