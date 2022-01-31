import React, {Dispatch, SetStateAction, useState, ChangeEvent, useCallback} from 'react';
import { useRouter } from "next/router";
import { useToasts } from "@geist-ui/react";
import { useSession } from "next-auth/client";
import  { Section, InputStyles, BottomConfirmBtn, ModalStyle } from "./style";
import * as entranceRequest from "@services/controle-entrada";
import { X  } from '@geist-ui/react-icons'
import { EntranceProps } from "@utils/initial-states"

interface ModalProps {
    entrance: EntranceProps;
    setEntrance: Dispatch<SetStateAction<EntranceProps>>;
    secondModalHandler: () => void
}

const VehicleModal = ({entrance, setEntrance, secondModalHandler}: ModalProps) => {
        const [, setToast] = useToasts();
        const [session] = useSession();

        async function registerVehicle(e: any) {
            e.preventDefault()
            try {
                if( !entrance.vehicleLicense || !entrance.statusDescription) {
                    setToast({
                        text: "Por favor preencha os campos do formulário",
                        type: "warning"
                    })
                    return
                }
                await entranceRequest.createVehicle({
                    placa: entrance.vehicleLicense,
                    descricao: entrance.statusDescription,
                    empresa: Number(session?.usuario.empresa.id)
                })
                setToast({
                    text: "Veículo cadastrado com sucesso",
                    type: "success"
                })
            } catch (error) {
                setToast({
                    text: "Motorista cadastrado com sucesso",
                    type: "success"
                })
            }
            secondModalHandler()
        }

    return <ModalStyle>
        <div>
            <span><X  onClick={() => secondModalHandler()}/></span>
            <h4>Veículo não encontrado, complete o cadastro:</h4>
                <Section>
                    <form onSubmit={registerVehicle}>
                        <InputStyles>
                            <div>
                                <span>Placa</span>
                                <input type="text" 
                                    value={entrance?.vehicleLicense} 
                                    onChange={(e) => setEntrance({...entrance, vehicleLicense : e.target.value})}/>
                            </div>
                        </InputStyles>
                        <InputStyles>
                            <div>
                                <span>Descrição</span>
                                <textarea className="description"  
                                    onChange={(e) => setEntrance({...entrance, statusDescription : e.target.value})}></textarea>
                            </div>
                        </InputStyles>
                        <BottomConfirmBtn>
                            <button type="submit">
                                adicionar
                            </button>
                        </BottomConfirmBtn>
                    </form>
                </Section>
        </div>
    </ModalStyle>
}

export default VehicleModal