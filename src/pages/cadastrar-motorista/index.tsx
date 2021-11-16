import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import Head from "next/head";
import BotaoVoltar from "@components/BotaoVoltar";
import { useToasts } from "@geist-ui/react";
import { useSession } from "next-auth/client";
import { BottomConfirmBtn, Section, InputStyles, InputDoubleStyles } from "./style";
import * as entranceRequest from "@services/controle-entrada";
import router, { useRouter } from "next/router";

export default function CadastrarMotorista() {
    const [driverName, setDriverName] = useState("")
    const [driverLicense, setDriverLicense] = useState("")
    const [entranceDate, setEntranceDate] = useState<Date>()
    const [, setToast] = useToasts();
    const [session] = useSession();
    const time = new Date()
    



    // console.log("meu",entranceDate, driverName, driverId)
    // console.log(session?.usuario.empresa.id)
    // console.log("outro",time)


    async function registerDriver (e: any)  {
        e.preventDefault()
            try {
                if(!driverLicense || !driverName || !entranceDate){
                    setToast({
                        text: "Por favor preencha os campos do formulário",
                        type: "warning"
                    })
                    return
                } 
                await entranceRequest.createDriver({
                    rg: driverLicense,
                    nome: driverName,
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
            setDriverName("")
            setDriverLicense("")
            router.push({
                pathname: "cadastrar-entrada",
                query: {
                    driverName,
                    driverLicense
                }
            })
        }

    return <>
            <Head>
                <title>Orion | Cadastrar Motorista</title>
            </Head>
            <BotaoVoltar />
            <h2>Cadastrar Motorista</h2>
                <Section>
                    <form onSubmit={registerDriver}>
                        <InputStyles>
                            <div><span>Nome</span></div>
                            <input type="text" value={driverName} onChange={(e) => setDriverName(e.target.value)}/>
                        </InputStyles>
                        <InputDoubleStyles>
                            <div>
                                <span>RG</span>
                                <input type="text" value={driverLicense} onChange={(e) => setDriverLicense(e.target.value)}/>
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
        </>
    
}

CadastrarMotorista.auth = true
