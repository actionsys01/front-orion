import React, {useState} from 'react'
import BotaoVoltar from "@components/BotaoVoltar";
import Head from "next/head";
import { useRouter } from "next/router";
import {InputContainer, BottomContainer, ButtonStyle} from "./style"
import { Checkbox } from '@material-ui/core';
import { useToasts } from "@geist-ui/react";
import * as planos from "@services/planos"

export default function PlanoCadastro() {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [duration, setDuration] = useState<string>("");
    const [quantity, setQuantity] = useState<string>("");
    const [applications, setApplications] = useState<number[]>([])
    const [, setToast] = useToasts();


    const gatherApplications = (e: any)  => {
        const findApps = applications.find(value => value === Number(e))
        
        if (!findApps) {
            setApplications(state => [...state, Number(e)])
          return
        }
        setApplications(state => state.filter(value => value !== e))
        }


    async function createAccount () {
        try {
            // await planos.criar({})
            setToast({
                text: "Plano cadastrado com sucesso.",
                type: "success"
            })
        } catch (error) {
            setToast({
                text: "Houve um problema, por favor tente novamente.",
                type: "warning"
            })
        }
    }

    return (
        <>
            <Head>
                <title>Orion | Cadastrar Plano</title>
            </Head>
            <BotaoVoltar />
            <h2>Cadastrar Planos</h2>
            <InputContainer>
            <div>
                <div className="container">
                    <div className="label"><h6>Nome do Plano</h6></div>
                    <div className="input-style">
                        <input type="text" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="label"><h6>Descrição</h6></div>
                    <div className="input-style">
                        <input type="text" onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="label"><h6>Duração (em dias)</h6></div>
                    <div className="input-style">
                        <input type="text" onChange={(e) => setDuration(e.target.value)}/>
                    </div>
                    <div className="label"><h6>Quantidade de Notas</h6></div>
                    <div className="input-style">
                        <input type="text" onChange={(e) => setQuantity(e.target.value)}/>
                    </div>
                </div>
            </div>
            </InputContainer>
            <BottomContainer>
                <div className="container">
                    <span>
                    <h5>Funcionalidades contidas no plano:</h5>
                    </span>
                    <div className="row">
                        <div>
                            <span>
                                <Checkbox onChange={() => gatherApplications(1)}/>
                            </span>
                            <h6>Nf-e</h6>
                        </div>
                        <div>
                            <span>
                                <Checkbox onChange={() => gatherApplications(3)}/>
                            </span>
                            <h6>Nfs-e</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <span>
                                <Checkbox onChange={() => gatherApplications(2)}/>
                            </span>
                            <h6>Ct-e</h6>
                        </div>
                        <div>
                            <span>
                                <Checkbox />
                            </span>
                            <h6>Controle de Portaria</h6>
                        </div>
                    </div>
                </div>
            </BottomContainer>
            <ButtonStyle>
                <button>
                    Confirmar
                </button>
            </ButtonStyle>
        </>
    )
}


PlanoCadastro.auth = true