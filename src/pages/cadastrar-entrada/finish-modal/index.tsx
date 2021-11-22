import React, {Dispatch, SetStateAction, useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { useSession } from "next-auth/client";
import { useToasts } from "@geist-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import{ Modal } from "@styles/modal"

interface ModalProps {
    thirdModalHandler: () => void;
    emptyWeight: number;
    exitDate: Date | null;
    finishihEntrance: () => void
}

const FisishModal = ({thirdModalHandler, emptyWeight, exitDate, finishihEntrance}:ModalProps ) => {


    return <Modal>
        <div>
            <h4>
                Deseja finalizar a entrega?
            </h4>
            <div>
                <button onClick={() => thirdModalHandler()}>CANCELAR</button>
                <button onClick={() => {finishihEntrance(), thirdModalHandler()}} >CONFIRMAR</button>
            </div>
        </div>

    </Modal>
    
}

export default FisishModal