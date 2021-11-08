import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import BotaoVoltar from "@components/BotaoVoltar";
import { useToasts } from "@geist-ui/react";
import { useSession } from "next-auth/client";
import  { Section, InputStyles, BottomConfirmBtn } from "./style";
import * as entranceRequest from "@services/controle-entrada";


export default function CadastrarVeiculo() {
    const [license, setLicense] = useState("");
    const [ description, setDescription] = useState("");
    const [entranceDate, setEntranceDate] = useState<Date>()
    const [, setToast] = useToasts();
    const [session] = useSession();
    const router = useRouter()

    async function registerVehicle(e: any) {
        e.preventDefault()
        try {
            if( !license || !description || !entranceDate) {
                setToast({
                    text: "Por favor preencha os campos do formulário",
                    type: "warning"
                })
                return
            }
            await entranceRequest.createVehicle({
                placa: license,
                descricao: description,
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
        setLicense("");
        setDescription("")
        router.push({
            pathname: "/cadastrar-entrada",
            query: {
                license,
                description
            }
        })
    }
 

    return <>
            <Head>
                <title>Orion | Cadastrar Veículo</title>
            </Head>
            <BotaoVoltar />
            <h2>Cadastrar Veículo</h2>
                <Section>
                    <form onSubmit={registerVehicle}>
                        <InputStyles>
                            <div>
                                <span>Placa</span>
                                <input type="text" onChange={(e) => setLicense(e.target.value)}/>
                            </div>
                        </InputStyles>
                        <InputStyles>
                            <div>
                                <span>Descrição</span>
                                <input type="text" onChange={(e) => setDescription(e.target.value)}/>
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
        </>
    
}

CadastrarVeiculo.auth = true