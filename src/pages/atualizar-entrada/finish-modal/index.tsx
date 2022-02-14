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
    modalHandler: () => void;
    finishihEntrance: () => void;
    setStatus: Dispatch<SetStateAction<number>>;
}

const FinishUpdateModal = ({
    modalHandler,
    setStatus,
    finishihEntrance,
}: ModalProps) => {
    return (
        <Modal>
            <div>
                <h5>Deseja finalizar a entrega?</h5>
                <div>
                    <button
                        onClick={() => {
                            setStatus(0), modalHandler();
                        }}
                    >
                        CANCELAR
                    </button>
                    <button
                        onClick={() => {
                            finishihEntrance(), modalHandler();
                        }}
                    >
                        CONFIRMAR
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default FinishUpdateModal;
