import React, {Dispatch, SetStateAction, useState, ChangeEvent, useCallback} from 'react';
import { useToasts } from "@geist-ui/react";
import { X  } from '@geist-ui/react-icons'
import { useSession } from 'next-auth/client';
import { BottomConfirmBtn, Section, InputStyles, InputDoubleStyles, ModalStyle } from "./styles";
import * as entranceRequest from "@services/controle-entrada";

interface ModalProps {
    setDriverId: Dispatch<SetStateAction<string>>;
    setDriver: Dispatch<SetStateAction<string>>;
    driverId: string;
    driver: string;
    modalHandler: () => void;

}

const DriverModal = ({setDriverId, setDriver, driverId, driver, modalHandler}: ModalProps) => {
    const [entranceDate, setEntranceDate] = useState<Date>()
    const [, setToast] = useToasts();
    const [session] = useSession();
    const company_id = Number(session?.usuario?.empresa.id)

    
    async function registerDriver (e: any)  {
        e.preventDefault()
            try {
                if(!driverId || !driverId ){
                    setToast({
                        text: "Por favor preencha os campos do formulário",
                        type: "warning"
                    })
                    return
                } 
                await entranceRequest.createDriver({
                    rg: driverId,
                    nome: driver,
                    empresa: company_id
                })
                setToast({
                    text: "Motorista cadastrado com sucesso",
                    type: "success"
                })
                
            } catch (error) {
                setToast({
                    text: "Houve um problema, por favor tente novamente",
                    type: "warning"
                })
            }
            modalHandler()
        }
    
    return <ModalStyle >
            <div>
                <span><X onClick={() => modalHandler()}/></span>
                <h4>Motorista não encontrado, complete o cadastro:</h4>
                <Section>
                    <form onSubmit={registerDriver}>
                        <InputStyles>
                                <div><span>RG</span></div>
                                <input type="text" value={driverId} 
                                    onChange={(e) => setDriverId(e.target.value)}/>
                        </InputStyles>
                        <InputStyles>
                            <div><span>Nome</span></div>
                            <input type="text" value={driver} 
                                onChange={(e) => setDriver(e.target.value)}/>
                        </InputStyles>
                        <BottomConfirmBtn >
                            <button type="submit">
                                Confirmar
                            </button>
                        </BottomConfirmBtn>
                    </form>
                </Section>
            </div>
    </ModalStyle>
}

export default DriverModal