import React, { useState, useMemo, useEffect, useCallback} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import { Plus, Filter } from "@geist-ui/react-icons"
import { EntranceGrid, BtnRow } from './style';
import Popover from '@components/Popover';

export default function ControleEntrada() {
    const router = useRouter()

    const handleEdit = useCallback(() => {
        console.log('Editado')      
    }, [])

    return <>
            <Head>
                <title>Orion | Controle de Entrada</title>
            </Head>
                <h2>Controle de Entrada</h2>
                <BtnRow>
                    <button type="button" className="filter"> 
                    <span><Filter/></span>
                            Filtrar
                    </button>
                    <button type="button" className="add" onClick={() => router.push({pathname: "/cadastrar-entrada"})}>
                        <span><Plus /></span>
                            Adicionar
                    </button>
                </BtnRow>
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
                            <th>Data de Emissão</th>
                            <th>Status Portaria</th>
                            <th>Status Recebimento XML</th>
                            <th>Número Entrega</th>
                            <th>Data Portaria</th>
                            <th>Hora Portaria</th>
                            <th>Peso Inicial do Veículo</th>
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
                    <tbody>
                        <tr>
                            <td style={{width: "35px"}}><Popover content={[
                                {
                                    optionName: 'Editar',
                                    onClick: handleEdit
                                }
                            ]} /></td>
                            <td >878729 08776875 55653330001</td>
                            <td>DJU-45586</td>
                            <td>DFTY-3636352</td>
                            <td>67676745545433</td>
                            <td>989866GYG</td>
                            <td>24/07/21</td>
                            <td>Cancelado</td>
                            <td>Recebido</td>
                            <td>190663566</td>
                            <td>24/07/21</td>
                            <td>21:00</td>
                            <td>790kg</td>
                            <td>23:00</td>
                            <td></td>
                            <td>22:00</td>
                            <td>24/07/21</td>
                            <td>ELEANOR CIMENTOS LTDA</td>
                            <td>DFR-9864552333</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </EntranceGrid>
        </>
    
}

ControleEntrada.auth = true
