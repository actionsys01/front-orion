import React, { useState, useEffect } from 'react';
import { Modal } from '@styles/modal';

interface ModalProps {
    modalStatus: string;
    modalVisibleHandler: () => void;
}

const ModalHandler = ({ modalStatus, modalVisibleHandler }: ModalProps) => {
    // console.log('modalStatus', modalStatus);
    const [finishText, setFinishText] = useState<'autorizada' | 'cancelada'>(
        'autorizada',
    );

    function checkFinishText() {
        if (modalStatus === 'autorizar') {
            setFinishText('autorizada');
        }
        if (modalStatus === 'cancelar') {
            setFinishText('cancelada');
        }
        if (modalStatus === 'exception') {
            setFinishText('cancelada');
        }
    }

    useEffect(() => {
        checkFinishText();
    }, []);

    return (
        <Modal>
            <div>
                <h5>
                    Não é possível{' '}
                    {modalStatus === 'exception' ? 'autorizar' : modalStatus}{' '}
                    uma nota já {finishText}.
                </h5>
                <div>
                    <button onClick={() => modalVisibleHandler()}>OK</button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalHandler;
