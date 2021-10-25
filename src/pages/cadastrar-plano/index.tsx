import React, {useState} from 'react'
import BotaoVoltar from "@components/BotaoVoltar";
import Head from "next/head";
import { useRouter } from "next/router";
import {InputContainer, BottomContainer, ButtonStyle, SmallInputs, Column} from "./style"
import { Checkbox } from '@material-ui/core';
import { useToasts } from "@geist-ui/react";
import * as accounts from "@services/planos"

export default function PlanoCadastro() {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [duration, setDuration] = useState<number>(0);
    const [invoiceQuantity, setInvoiceQuantity] = useState<number>(0);
    const [usersQuantity, setUsersQuantity] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [value, setValue] = useState<number>(0);
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
            if(!name || !description || !value || !usersQuantity || !invoiceQuantity){
                setToast({
                    text: "Favor inserir dados válidos",
                    type: "warning"
                });
                return
            }
            await accounts.criar({nome: name, descricao: description, desconto: discount, usuarios: usersQuantity, notas: invoiceQuantity, valor: value, dias: duration, aplicacoes: applications })
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
        router.push("/planos")
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
                    <div>
                        <span>Nome do Plano</span>
                        <input type="tsext" onChange={(e) => setName(e.target.value)}/>
                    </div>
                <div>
                    <span>Descrição</span>
                    <input type="text" onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <SmallInputs>
                    <Column>
                        <div>
                            <div>
                                    <span>Quantidade de Notas</span>
                                    <input type="text" onChange={(e) => setInvoiceQuantity(Number(e.target.value))}/>
                            </div>
                            <div>
                                    <span>Duração (em dias)</span>
                                    <input type="text" onChange={(e) => setDuration(Number(e.target.value))}/>
                            </div>
                        </div>
                    </Column>
                    <Column>
                        <div>
                            <div>
                                <span>Quantidade de Usuários</span>
                                <input type="text" onChange={(e) => setUsersQuantity(Number(e.target.value))}/>
                            </div>
                            <div>
                                <span>Valor da Mensalidade</span>
                                <input type="text" onChange={(e) => setValue(Number(e.target.value))}/>
                            </div>
                        </div>  
                    </Column>
                </SmallInputs>
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
                                <Checkbox onChange={() => gatherApplications(4)}/>
                            </span>
                            <h6>Controle de Portaria</h6>
                        </div>
                    </div>
                </div>
            </BottomContainer>
            <ButtonStyle>
                <button onClick={createAccount}>
                    Confirmar
                </button>
            </ButtonStyle>
        </>
    )
}


PlanoCadastro.auth = true