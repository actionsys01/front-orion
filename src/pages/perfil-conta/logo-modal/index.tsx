import React, { useState, ChangeEvent, useEffect, useCallback, useRef} from 'react';
import { useSession } from "next-auth/client";
import { Spinner } from "@geist-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import BotaoVoltar from "@components/BotaoVoltar";
import { LogoModalStyle, LogoContainer } from "../style"

interface ModalProps {
    hasLogo: boolean;
    companyLogo: string;
    registerFile: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
    modalHandler: () => void;
    visibleModal: boolean;
    spinning: boolean
}

const LogoModal = ({hasLogo, companyLogo, registerFile, modalHandler, visibleModal, spinning} : ModalProps) => {
    


    return <>
     <LogoContainer>
        {hasLogo ? 
            <img src={companyLogo} onClick={() => modalHandler()}/> : 
            <div className='no-logo' onClick={() => modalHandler()}>
                <label id="logo">
                    <p>Sem logo... <br/> Clique para enviar
                    </p>
                </label>
            </div>}
        </LogoContainer>   
     <LogoModalStyle visible={visibleModal}>
        <div>
            {spinning ? <Spinner className='spinner' /> : 
            <>
            <h4>Logo Upload</h4>
            <h6>Deseja {!hasLogo ? 'enviar o' : 'substituir o atual'}  logo da empresa?</h6>
            <div>
                <button onClick={modalHandler}>CANCELAR</button>
                <label id="logo">
                    <div id="logo">
                    <input type="file"  id="logo" accept="image/png, image/gif, image/jpeg"  onChange={registerFile}/>
                        CONFIRMAR</div>
                </label>
            </div>
            </>
            }
            
        </div>
    </LogoModalStyle>
    </>
}

export default LogoModal