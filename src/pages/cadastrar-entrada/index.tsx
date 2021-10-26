import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import BotaoVoltar from "@components/BotaoVoltar";
import {  Section, FormContainer, Column, OneLineContainer, Inline, EntranceGrid, BtnStyle, ModalContainer } from './style';
import { Checkbox } from '@material-ui/core';
import { useToasts } from "@geist-ui/react";
import { INfeDto } from "@services/nfe/dtos/INfeDTO";
import getNfeById from "@services/nfe/getNfeById";
import { useSession } from "next-auth/client";
import  {format} from "date-fns";
import {TopConfirmBtn} from "@styles/buttons"

interface Props  {
    company_id: number | undefined;
    token: string | undefined;
    sefaz?: {
      cor: "secondary" | "success" | "error" | "warning" | "default";
      message: string
    }
    portaria?: {
      cor: "success" | "warning" | "default";
      message: string
    }
  }


export default function CadastrarEntrada() {
    const [visible, setVisible] = useState<boolean>(false);
    const key: any = useRef(null)
    const [mainKey, setMainKey] = useState<string>("");
    const [nfe, setNfe] = useState<INfeDto[]>([])
    const [, setToast] = useToasts();
    const [session] = useSession();
    const company_id = Number(session?.usuario.empresa.id)
    
    
    // input de chave de acesso
    const getNfe = useCallback(async (e) => {
        e.preventDefault()
        console.log("dentro", mainKey)
        try {
            const response = await getNfeById(key.current.value, company_id);
            setNfe(state =>[...state, response.data])
            setToast({
                text: "Sucesso",
                type: "success"
            });
        } catch (error) {
            console.log(error)
            setToast({
                text: "Houve um problema, por favor tente novamente",
                type: "warning"
            });
        }
        
    }, [] )

    

    useEffect(() => {
        console.log("fora2", nfe)
    },[])

    const gatheredData = useMemo(() => {
        const allData: any = []
        if(nfe) {
            nfe.forEach((item) => {
                allData.push({
                    ...item,
                    option: <span><Checkbox /></span>,
                    portaria_status: (item.portaria_status === 0 ? "Na Portaria" : 
                    item.portaria_status === 1 ? "Entrada Autorizada" :
                    item.portaria_status === 2 ? "Entrada Fechada" : 
                    item.portaria_status === 3 ? "Não se Aplica" :
                    item.portaria_status === 4 ? "Entrega Cancelada": null),
                    emissionDate: format(new Date(item.dt_hr_emi), "dd/MM/yyyy"),
                    arrivalDate: format(new Date(item.portaria_status_ent_dt_hr), "dd/MM/yyyy"),
                    arrivalTime: (item.portaria_status_ent_dt_hr).toString().slice(11, 16),
                    exitDate: (item.portaria_status_sai_dt_hr === null ? "" : format(new Date(item?.portaria_status_sai_dt_hr), "dd/MM/yyyy")),
                    exitTime: (item?.portaria_status_sai_dt_hr)?.toString().slice(11, 16),
                })
            })
        }
        return allData
    }, [nfe])

 
    return <>
        <Head>
            <title>Orion | Cadastrar Entrada</title>
        </Head>
        <BotaoVoltar />
        <TopConfirmBtn style={{width: "92.5%", margin: 0}}>
            <button>
                confirmar
            </button>
        </TopConfirmBtn>
        <div style={{display: 'flex', gap: "10px", flexDirection: "column", alignItems: "center"}}>
            <Section>
                <h6>Nf-e</h6>
                <OneLineContainer>
                    <form onSubmit={getNfe}>
                        <span>Chave de Acesso Nf-e</span>
                        <input type="text" ref={key}/>
                        <button type="submit">
                            enviar
                        </button>
                    </form>
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
                            <th>CNPJ Fornecedor</th>
                            <th>Nome Fornecedor</th>
                            <th>Número Nota Fiscal</th>
                            <th>Série</th>
                            <th>Data Emissão</th>
                            <th>Status Portaria</th>
                            <th>Data Entrada</th>
                            <th>Hora Entrada</th>
                            <th>Data Saída</th>
                            <th>Horário Saída</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gatheredData?.map((item: any, i: any) => (
                             <tr key={i}>
                            <td>{item.option}</td>
                            <td>{item.chave_nota}</td>
                            <td>{item.emit_cnpj}</td>
                            <td>{item.emit_nome}</td>
                            <td>{item.nota}</td>
                            <td>{item.serie}</td>
                            <td>{item.emissionDate}</td>
                            <td>{item.portaria_status}</td>
                            <td>{item.arrivalDate}</td>
                            <td>{item.arrivalTime}</td>
                            <td>{item?.exitDate}</td>
                            <td>{item.exitTime}</td>
                        </tr>
                        ))}
                       
                    </tbody>
                </table>
                </EntranceGrid>
                </div>
        </>
}

CadastrarEntrada.auth = true