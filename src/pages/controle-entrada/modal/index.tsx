import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { useToasts } from "@geist-ui/react";
import  { Modal } from "@styles/modal";

interface EntranceModalProps {
    modalStatus: string;
    modalHandler: () => void;
    updateEntrance: () => Promise<void>;
}

const EntranceModal = ({modalStatus, modalHandler, updateEntrance}: EntranceModalProps) => {
    
    return <Modal> 
            <div>
                <h4>Deseja realmente {modalStatus} a entrada?</h4>
                <div>
                    <button onClick={() => modalHandler()}>CANCELAR</button>
                    <button onClick={() =>{ updateEntrance(), modalHandler()}} >CONFIRMAR</button>
                </div>
            </div>
    </Modal>
}

export default EntranceModal