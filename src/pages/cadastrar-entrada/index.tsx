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
                <h6 className="outside-label">Nf-e</h6>
                <div className="content">
                    <div className="container">
                        <h6 className="label">Chave de Acesso Nf-e</h6>
                        <div className="input-style">
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <h6 className="outside-label">Motorista / Entregador</h6>
                <div className="content">
                    <div className="container">
                        <h6 className="label">RG</h6>
                        <div className="input-style-medium">
                            <input type="text" />
                        </div>
                        <h6 className="label">Nome</h6>
                        <div className="input-style-medium">
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <h6 className="outside-label">Veículos</h6>
                <div className="content">
                    <div className="container">
                        <h6 className="label" /* style={{whiteSpace: "nowrap"}} */>Placa Principal</h6>
                        <div className="input-style-medium">
                            <input type="text" />
                        </div>
                        <h6 className="label">Descrição</h6>
                        <div className="input-style-medium">
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <h6 className="outside-label">Dados de Chegada e Saída</h6>
                <div className="content">
                    <div className="container" style={{flexDirection: "column"}}>
                        <div className="row">
                            <h6 className="label" /* style={{whiteSpace: "nowrap"}} */>Data de Chegada</h6>
                            <div className="input-style-small">
                                <input type="text" />
                            </div>
                            <h6 className="label">Horário</h6>
                            <div className="input-style-small">
                                <input type="text" />
                            </div>
                            <h6 className="label">Peso Carregado</h6>
                            <div className="input-style-small">
                                <input type="text" />
                            </div>
                            <h6 className="label">UM</h6>
                            <div className="input-style-small" style={{width: "6%"}}>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="row" style={{justifyContent: "space-between"}}>
                            <h6 className="label" /*style={{ whiteSpace: "nowrap" , marginRight: "4.5%"}}*/>Data de Saída</h6>
                            <div className="input-style-small">
                                <input type="text" />
                            </div>
                            <h6 className="label">Horário</h6>
                            <div className="input-style-small">
                                <input type="text" />
                            </div>
                            <h6 className="label">Peso Vazio</h6>
                            <div className="input-style-small">
                                <input type="text" />
                            </div>
                            <div className="deliver-btn">
                                <button>
                                    Fechar Entrega
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        </EntranceRegisterStyle>
        </>
}

CadastrarEntrada.auth = true