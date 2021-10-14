import React from 'react'
import BotaoVoltar from "@components/BotaoVoltar";
import Head from "next/head";
import api from "@services/api";
import {InputContainer} from "./style"

export default function PlanoCadastro() {
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
                    <h6>Nome do Plano</h6>
                    <div className="input-style">
                        <input type="text" />
                    </div>
                    <h6>Descrição</h6>
                    <div className="input-style">
                        <input type="text" />
                    </div>
                    <h6>Duração (em dias)</h6>
                    <div className="input-style">
                        <input type="text" />
                    </div>
                    <h6>Quantidade de Notas</h6>
                    <div className="input-style">
                        <input type="text" />
                    </div>
                </div>
            </div>
            </InputContainer>
        </>
    )
}


PlanoCadastro.auth = true