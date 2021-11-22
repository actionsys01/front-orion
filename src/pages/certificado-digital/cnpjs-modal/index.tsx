import React, {Dispatch, SetStateAction, useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { useSession } from "next-auth/client";
import router, { useRouter } from "next/router";
import{ Modal } from "@styles/modal";


interface ModalProps {
    secondModalHandler: () => void
}

const CnpjsModal = ({secondModalHandler} : ModalProps) => {
    

    return <Modal> 
        <div>
            <h4 style={{fontSize: ".8rem"}}>
                Seu cadastro está quase completo, prossiga para cadastrar os CNPJs da empresa:
            </h4>
            <div>
                <button onClick={() => secondModalHandler()}>Prosseguir sem <br/>terminar cadastro</button>
                <button onClick={() => router.push({
                    pathname: "/cadastrar-cnpj"
                    // query:{ isCompleted: "false"}   
                })}>Cadastrar  <br/>CNPJs</button>
            </div>
        </div>

    </Modal>
}

export default CnpjsModal