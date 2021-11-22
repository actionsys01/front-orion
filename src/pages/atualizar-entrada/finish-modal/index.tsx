import React, {Dispatch, SetStateAction, useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import{ Modal } from "@styles/modal";

interface ModalProps {
    modalHandler: () => void;
    finishihEntrance: () => void
}

const FinishUpdateModal = ({modalHandler, finishihEntrance} : ModalProps) => {
    

    return <Modal>
        <div>
            <h4>Deseja finalizar a entrega?</h4>
            <div>
                <button onClick={()  => modalHandler()}>CANCELAR</button>
                <button onClick={() => {finishihEntrance(), modalHandler()}}>CONFIRMAR</button>
            </div>
        </div>

    </Modal>
}

export default FinishUpdateModal