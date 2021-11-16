import React, {Dispatch, SetStateAction, useState, ChangeEvent, useCallback} from 'react';
import { useRouter } from "next/router";
import { useToasts } from "@geist-ui/react";
import { useSession } from "next-auth/client";
import  { Section, InputStyles, BottomConfirmBtn, ModalStyle } from "./style";
import * as entranceRequest from "@services/controle-entrada";
import { X  } from '@geist-ui/react-icons'

interface ModalProps {
    statusDescription: string;
    vehicleLicense: string;
    setStatusDescription: Dispatch<SetStateAction<string>>;
    setVehicleLicense: Dispatch<SetStateAction<string>>;
    secondModalHandler: () => void
}

const VehicleModal = ({statusDescription, vehicleLicense, 
    setStatusDescription, setVehicleLicense, secondModalHandler}: ModalProps) => {
        const [entranceDate, setEntranceDate] = useState<Date>()
        const [, setToast] = useToasts();
        const [session] = useSession();

        async function registerVehicle(e: any) {
            e.preventDefault()
            try {
                if( !vehicleLicense || !statusDescription || !entranceDate) {
                    setToast({
                        text: "Por favor preencha os campos do formulário",
                        type: "warning"
                    })
                    return
                }
                await entranceRequest.createVehicle({
                    placa: vehicleLicense,
                    descricao: statusDescription,
                    data_entrada: entranceDate,
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
            <h4>Cadastrar Veículo</h4>
             <Section>
                    <form onSubmit={registerVehicle}>
                        <InputStyles>
                            <div>
                                <span>Placa</span>
                                <input type="text" onChange={(e) => setVehicleLicense(e.target.value)}/>
                            </div>
                        </InputStyles>
                        <InputStyles>
                            <div>
                                <span>Descrição</span>
                                <input type="text" onChange={(e) => setStatusDescription(e.target.value)}/>
                            </div>
                        </InputStyles>
                        <InputStyles>
                            <div>
                                <span>Data de Entrada</span>
                                <input type="date" onChange={(e) => setEntranceDate(new Date(e.target.value))}/>
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