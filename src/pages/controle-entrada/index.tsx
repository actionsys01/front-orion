import React, { useState, useMemo, useEffect, useCallback} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import { Plus, Filter } from "@geist-ui/react-icons"
import { EntranceGrid, BtnRow } from './style';
import Popover from '@components/Popover';
import * as entrances from "@services/controle-entrada";
import { useToasts } from "@geist-ui/react";
import { useSession } from "next-auth/client";
import  {format} from "date-fns";
import { Pages } from "@styles/pages";
import Pagination from "@material-ui/lab/Pagination";


interface Entrance {
  chave_nota: string;
  controle_entrada: ControleProps
}

interface ControleProps {
    placa_principal: string;
    placa_reboque1: string;
    placa_reboque2: string;
    placa_reboque3: string;
    status: number;
    descricao_status: string;
    data_entrada: string;
    data_saida: string;
    peso_cheio: string;
    peso_vazio: string;
    unidade_medida: string
}
interface EntranceDataProps {
    id: number;
    chave_nota: string;
    controle_entrada: ControleProps
    option: any,
    status: any,
    arrivalDate: string
    exitDate: string;
    arrivalTime: string;
    exitTime: string;
}


export default function ControleEntrada() {
    const router = useRouter();
    const [entrance, setEntrance] = useState<Entrance[]>([]);
    const [page, setPage] = useState(1);
    const [quantityPage, setQuantityPage] = useState(1);
    const [, setToast] = useToasts();
    const [session] = useSession();

    
    const handleChange = (event : React.ChangeEvent<unknown>, value : number) => {setPage(value)}

    const getEntranceDataByPage = useCallback(async () => {
            const response = await entrances.getEntrance(page, Number(session?.usuario.empresa.id))
            const data = response.data
            setQuantityPage(Math.ceil(data.total / 8))
            return data.notas
        },[page])


        useEffect(() => {
            getEntranceDataByPage().then(response => setEntrance(response))
        }, [page])

    const handleEdit = useCallback(() => {
        console.log('Editado')      
    }, [])

    const handleDelete = useCallback(() => {
        console.log('Deletado')      
    }, [])



    const gatheredData = useMemo(() => {
        const allData: any = [];
        if(entrance){
            entrance.forEach((item) => {
                allData.push({
                    ...item,
                    option: <Popover content={[
                        {
                            optionName: 'Autorizar',
                            onClick: handleEdit
                        },
                        {
                            optionName: 'Editar',
                            onClick: handleEdit
                        },
                        {
                            optionName: 'Cancelar',
                            onClick: handleDelete
                        }
                    ]}/>,
                    status: (item.controle_entrada.status === 0 ? "Na Portaria" : 
                    item.controle_entrada.status === 1 ? "Entrada Autorizada" :
                    item.controle_entrada.status === 2 ? "Entrada Fechada" : 
                    item.controle_entrada.status === 3 ? "Não se Aplica" :
                    item.controle_entrada.status === 4 ? "Entrega Cancelada": null),
                    arrivalDate: format(new Date(item.controle_entrada.data_entrada), "dd/MM/yyyy"),
                    exitDate: format(new Date(item.controle_entrada.data_saida), "dd/MM/yyyy"),
                    arrivalTime: item.controle_entrada.data_entrada.slice(11,16),
                    exitTime: item.controle_entrada.data_saida.slice(11,16)
                })
            })
        }

        return allData
    }, [entrance])

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
                            {/* <th>CNPJ Emitente</th>
                            <th>Descrição Emitente</th>
                            <th>Número Nota Fiscal</th>
                            <th>Série</th>
                            <th>Data de Emissão</th> */}
                            <th>Status Portaria</th>
                            {/* <th>Status Recebimento XML</th> */}
                            <th>Número Entrega</th>
                            <th>Peso Inicial do Veículo</th>
                            <th>Data Chegada</th>
                            <th>Data Saída</th>
                            <th>Horário Chegada</th>
                            <th>Horário Saída</th>
                            {/* <th>Fornecedor</th> */}
                            {/* <th>Chave Devolução</th> */}
                            <th>Placa Veículo</th>
                            <th>Placa Reboque 1</th>
                            <th>Placa Reboque 2</th>
                            <th>Placa Reboque 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gatheredData.map((item: EntranceDataProps, i: any) => (
                            <tr key={i}>
                            <td style={{width: "35px"}}>{item.option}</td>
                            <td>{item.chave_nota}</td>
                            <td>{item.status}</td>
                            <td>{item.id}</td>
                            <td>{item.controle_entrada.peso_cheio}</td>
                            <td>{item.arrivalDate}</td>
                            <td>{item.exitDate}</td>
                            <td>{item.arrivalTime}</td>
                            <td>{item.exitTime}</td>
                            <td>{item.controle_entrada.placa_principal}</td>
                            <td>{item.controle_entrada.placa_reboque1}</td>
                            <td>{item.controle_entrada.placa_reboque2}</td>
                            <td>{item.controle_entrada.placa_reboque3}</td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>
            </EntranceGrid>
            <Pages>
            <Pagination style={{margin : "0 auto"}} onChange={handleChange} count={quantityPage}  shape='rounded' />
            </Pages>
        </>
    
}

ControleEntrada.auth = true
