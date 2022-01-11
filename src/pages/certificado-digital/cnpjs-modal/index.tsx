import React, {Dispatch, SetStateAction, useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { useSession } from "next-auth/client";
import router, { useRouter } from "next/router";
import{ Modal } from "@styles/modal";
import { SecondBtn } from "../style"


interface ModalProps {
    secondModalHandler: () => void
}

const CnpjsModal = ({secondModalHandler} : ModalProps) => {
    

    return <Modal> 
        <div>
            <h5 style={{fontSize: ".8rem"}}>
                Seu cadastro está quase completo, prossiga para cadastrar os CNPJs da empresa:
            </h5>
            <div>
                <button onClick={() => secondModalHandler()}>Prosseguir sem <br/>terminar cadastro</button>
                <SecondBtn onClick={() => router.push({
                    pathname: "/cadastrar-cnpj"
                    // query:{ isCompleted: "false"}   
                })}>Cadastrar  <br/>CNPJs</SecondBtn>
            </div>
        </div>

    </Modal>
}

export default CnpjsModal