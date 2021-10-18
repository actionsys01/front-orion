import React, { useState, useMemo, useEffect, useCallback} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import BotaoVoltar from "@components/BotaoVoltar";
import { EntranceRegisterStyle } from './style';

export default function CadastrarEntrada() {
    return <>
        <Head>
            <title>Orion | Cadastrar Entrada</title>
        </Head>
        <BotaoVoltar />
        <EntranceRegisterStyle>
            <div className="box">
                <h6 className="outside-label">Nf-e</h6>
                <div className="content">
                <div className="container">
                        <h6 className="label">Chave de Acesso Nf-e</h6>
                    <div className="input-style">
                        <input type="text" />
                    </div>
                </div>
                </div>
            </div>
        </EntranceRegisterStyle>
        </>
}

CadastrarEntrada.auth = true