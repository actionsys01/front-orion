import React, {
    Dispatch,
    SetStateAction,
    useState,
    useMemo,
    useEffect,
    useCallback,
    useRef,
} from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Modal } from '@styles/modal';

interface ModalProps {
    thirdModalHandler: () => void;
    finishihEntrance: () => void;
    setStatus: Dispatch<SetStateAction<number>>;
    setEntranceFinished: Dispatch<SetStateAction<boolean>>;
}

const FisishModal = ({
    thirdModalHandler,
    setStatus,
    finishihEntrance,
    setEntranceFinished,
}: ModalProps) => {
    return (
        <Modal>
            <div>
                <h4>Deseja finalizar a entrega?</h4>
                <div>
                    <button
                        onClick={() => {
                            setStatus(0),
                                setEntranceFinished(false),
                                thirdModalHandler();
                        }}
                    >
                        CANCELAR
                    </button>
                    <button
                        onClick={() => {
                            finishihEntrance(), thirdModalHandler();
                        }}
                    >
                        CONFIRMAR
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default FisishModal;
