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

    
    async function registerDriver (e: any)  {
        e.preventDefault()
            try {
                if(!driverId || !driverId || !entranceDate){
                    setToast({
                        text: "Por favor preencha os campos do formulário",
                        type: "warning"
                    })
                    return
                } 
                await entranceRequest.createDriver({
                    rg: driverId,
                    nome: driver,
                    data_entrada: entranceDate as Date,
                    empresa: 22
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
                <h4>Cadastrar Motorista</h4>
                <Section>
                        <form onSubmit={registerDriver}>
                            <InputStyles>
                                <div><span>Nome</span></div>
                                <input type="text" value={driver} onChange={(e) => setDriver(e.target.value)}/>
                            </InputStyles>
                            <InputDoubleStyles>
                                <div>
                                    <span>RG</span>
                                    <input type="text" value={driverId} onChange={(e) => setDriverId(e.target.value)}/>
                                </div>
                                <div>
                                    <span>Data de Entrada</span>
                                    <input type="date" onChange={(e) => setEntranceDate(new Date(e.target.value))}/>
                                </div>
                            </InputDoubleStyles>
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