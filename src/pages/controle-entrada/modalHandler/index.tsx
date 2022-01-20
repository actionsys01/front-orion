import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { useSession } from "next-auth/client";
import { useToasts } from "@geist-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import  { Modal } from "@styles/modal";

interface ModalProps {
    modalStatus: string;
    modalVisibleHandler: () => void;
}

const ModalHandler = ({modalStatus, modalVisibleHandler} : ModalProps) => {

    const [ finishText, setFinishText ] = useState<"autorizada" | "cancelada">("autorizada")

    function checkFinishText() {
        if(modalStatus === "autorizar"){
            setFinishText("autorizada")
        }
        if(modalStatus === "cancelar"){
            setFinishText("cancelada")
        }
    }

    useEffect(() => {
        checkFinishText()
    }, [])

    return <Modal>
        <div>
            <h5>
                Não é possível {modalStatus} uma nota já {finishText}.
            </h5>
            <div>
                <button
                onClick={() => modalVisibleHandler()}>
                    OK
                </button>
            </div>
        </div>
    </Modal>
}

export default ModalHandler