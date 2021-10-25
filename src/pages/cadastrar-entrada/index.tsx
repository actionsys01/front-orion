import React, { useState, useMemo, useEffect, useCallback} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import BotaoVoltar from "@components/BotaoVoltar";
import {  Section, FormContainer, Column, OneLineContainer, Inline, EntranceGrid, BtnStyle, ModalContainer } from './style';
import { Checkbox } from '@material-ui/core';
import * as nfeKey from "@services/nfe-mongo"
import { useToasts } from "@geist-ui/react";
import { INfeDto } from "@services/nfe/dtos/INfeDTO"


export default function CadastrarEntrada() {
    const [visible, setVisible] = useState<boolean>(false);
    const [mainKey, setMainKey] = useState<string>("");
    // const [nfe, setNfe] = useState<INfeDto[]>([])
    const [, setToast] = useToasts();
    
    const getNfe = useCallback(async () => {
        try {
            if(!mainKey) {
                setToast({
                    text: "Insira uma chave válida",
                    type: "warning"
                });
                return
            }
            const response = await nfeKey.buscar(mainKey)
            console.log("dentro", mainKey)
            const nfeData = response.data
            console.log(nfeData)
            setToast({
                text: "Sucesso",
                type: "success"
            });
        } catch (error) {
            setToast({
                text: "Houve um problema, por favor tente novamente",
                type: "warning"
            });
        }
        setMainKey("")
    }, [] )

    console.log("fora", mainKey)
 
    return <>
        <Head>
            <title>Orion | Cadastrar Entrada</title>
        </Head>
        <BotaoVoltar />
        <div style={{display: 'flex', gap: "10px", flexDirection: "column", alignItems: "center"}}>
            <Section>
                <h6>Nf-e</h6>
                <OneLineContainer>
                    <div>
                        <span>Chave de Acesso Nf-e</span>
                        <input type="text" onChange={(e) => setMainKey(e.target.value)}/>
                    </div>
                        <button onClick={getNfe}>
                            enviar
                        </button>
                </OneLineContainer>
            </Section>
            <Section>
                <h6>Motorista / Entregador</h6>
                <Inline>
                    <div>
                        <div>
                            <span>RG</span>
                            <input type="text" />
                        </div>
                        <div>
                            <span >Nome</span>
                            <input type="text" />
                        </div>
                    </div>
                        </Inline>
                </Section>
                <Section>
                <h6>Veículos</h6>
                <ModalContainer>
                    <div>
                        <div>
                            <span className="first">Placa Principal</span>
                            <input type="text" />
                        </div>
                        <div>
                            <span>Descrição</span>
                            <input type="text" />
                        </div>
                        <span><Checkbox onChange={() => setVisible(!visible)}/></span>
                    </div>
                   {visible && 
                   <>
                   <div>
                        <div>
                            <span>Reboque 1</span>
                            <input type="text" />
                        </div>
                        <div>
                            <span>Descrição</span>
                            <input type="text" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <span>Reboque 2</span>
                            <input type="text" />
                        </div>
                        <div>
                            <span>Descrição</span>
                            <input type="text" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <span>Reboque 3</span>
                            <input type="text" />
                        </div>
                        <div>
                            <span>Descrição</span>
                            <input type="text" />
                        </div>
                    </div>
                    </>}
                </ModalContainer>
                </Section>
                <Section>
                    <h6>Dados de Chegada e Saída</h6>
                    <FormContainer>
                        <Column>
                            <div>
                                <span>Data Chegada</span>
                                <input />
                            </div>
                            <div>
                                <span>Data Saída</span>
                                <input />
                            </div>
                        </Column>
                        <Column>
                            <div>
                                <span>Data Chegada</span>
                                <input />
                            </div>
                            <div>
                                <span>Data Saída</span>
                                <input />
                            </div>
                        </Column>
                        
                        <Column>
                            <div>
                                <span>Data Chegada</span>
                                <input />
                            </div>
                            <div>
                                <span>Data Saída</span>
                                <input />
                            </div>
                        </Column>
                        <Column style={{justifyContent: "space-between"}}>
                            <div style={{justifyContent: "center"}}>
                                <span>UM</span>
                                <input style={{width: "35%"}}/>
                            </div>
                            <div style={{justifyContent: "center", alignItems: "flex-end", fontSize: "0.75rem"}}>
                                <BtnStyle>
                                    Encerrar Entrega
                                </BtnStyle>
                            </div>
                        </Column>
                    </FormContainer>
                </Section>

                <EntranceGrid>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Chave de Acesso Nf-e</th>
                            <th>CNPJ Emitente</th>
                            <th>Descrição Emitente</th>
                            <th>Número Nota Fiscal</th>
                            <th>Série</th>
                            <th>Data Emissão</th>
                            <th>Status Portaria</th>
                            <th>Status Recebimento XML</th>
                            <th>Número Entrega</th>
                            <th>Data Portaria</th>
                            <th>Hora Portaria</th>
                            <th>Peso Inicial Veículo</th>
                            <th>Horário Saída</th>
                            <th>Data Saída</th>
                            <th>Horário Chegada</th>
                            <th>Data Chegada</th>
                            <th>Fornecedor</th>
                            <th>Chave Devolução</th>
                            <th>Placa Reboque 1</th>
                            <th>Placa Reboque 2</th>
                            <th>Placa Reboque 3</th>
                        </tr>
                    </thead>
                </table>
                </EntranceGrid>
                </div>
        </>
}

CadastrarEntrada.auth = true