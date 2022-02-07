import React from 'react';
import { Modal } from '@styles/modal';

interface EntranceModalProps {
    modalStatus: string;
    modalHandler: () => void;
    updateEntrance: () => Promise<void>;
}

const EntranceModal = ({
    modalStatus,
    modalHandler,
    updateEntrance,
}: EntranceModalProps) => {
    if (modalStatus === 'fechado') {
        return (
            <Modal>
                <div>
                    <h5>Não é possível autorizar uma entrada concluída </h5>
                    <div>
                        <button onClick={() => modalHandler()}>RETORNAR</button>
                        {/* <button onClick={() =>{ updateEntrance(), modalHandler()}} >CONFIRMAR</button> */}
                    </div>
                </div>
            </Modal>
        );
    }
    return (
        <Modal>
            <div>
                <h5>Deseja realmente {modalStatus} a entrada?</h5>
                <div>
                    <button onClick={() => modalHandler()}>CANCELAR</button>
                    <button
                        onClick={() => {
                            updateEntrance(), modalHandler();
                        }}
                    >
                        CONFIRMAR
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default EntranceModal;
