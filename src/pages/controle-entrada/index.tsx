import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
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
import FilterModal from "@components/FilterModal"
import { useControlFilter } from "@contexts/ControlFilter"
import RadioFilter from "@components/FilterRadio"
import EntranceModal from "./modal"


interface Entrance {
    id: number
    chave_nota: string;
    controle_entrada: ControleProps
    data_entrada: string
}

interface EntranceUpdateProps {
    id: number
    chave_nota: string;
    controle_entrada: ControleProps
}

interface ControleProps {
    id: number;
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
    const company_id = Number(session?.usuario.empresa.id)
    const [ reload, setReload] = useState(true)
    //
    const [driverId, setDriverId] = useState("");
    const [vehicleLicense, setVehicleLicense] = useState("");
    const [firstHaulage, setFirstHaulage] = useState("");
    const [secondHaulage, setSecondHaulage] = useState("");
    const [thirdHaulage, setThirdHaulage] = useState("");
    const [ status, setStatus] = useState(0)
    const [statusDescription, setStatusDescription] = useState("");
    const [arrivalDate, setArrivalDate] = useState(new Date)
    const [exitDate, setExitDate] = useState(new Date)
    const [loadedWeight, setLoadedWeight] = useState(0);
    const [emptyWeight, setEmptyWeight] = useState(0);
    const [measure, setMeasure] = useState("");
    const [entranceKeys, setEntranceKeys] = useState<string[]>([]);
    const [driver, setDriver] = useState("");
    const [arrivalTime, setArrivalTime] = useState(new Date)
    const [exitTime, setExitTime] = useState()
    const [ entranceId, setEntranceId] = useState(0)
    // Modal
    const [visibleModal, setVisibleModal] = useState(false)
    const [ modalStatus, setModalStatus ] = useState("")
    const [ filterModal, setFilterModal ] = useState(false)
    const [ uFilterModal, setUFilterModal] = useState(false)
    // filtros
    const [ filtersObject, setFiltersObject] = useState({})

    const {filters} = useControlFilter()
    
    const handleChange = (event : React.ChangeEvent<unknown>, value : number) => {setPage(value)}
        
    
        const modalHandler = useCallback(() => {
            setVisibleModal(!visibleModal)
        }, [visibleModal])

    
        const handleApproval = useCallback(async (id) => {
            const response = await entrances.getControlById(id)
            const data = response.data 
            const mappedData = data.entrada_notas.map((item) => item.chave_nota)
            setEntranceId(id)
            setDriverId(data.motorista.rg)
            setVehicleLicense(data.placa_principal)
            setFirstHaulage(data.placa_reboque1)
            setSecondHaulage(data.placa_reboque2)
            setThirdHaulage(data.placa_reboque3)
            setStatus(1)
            setStatusDescription(data.descricao_status)
            setArrivalDate(new Date(data.data_entrada))
            setExitDate(data.data_saida === null ? new Date() : new Date(data.data_saida))              
            setLoadedWeight(Number(data.peso_cheio))
            setEmptyWeight(Number(data.peso_vazio))
            setMeasure(data.unidade_medida)
            setEntranceKeys(mappedData)
            setModalStatus("autorizar")
            setVisibleModal(true)
            // console.log(entranceKeys)
            return data
        }, [])
    
        const handleEdit = useCallback(( id) => {
            // console.log('Editado', id)     
            router.push({
                pathname: "/atualizar-entrada",
                query: {id}
            })
        }, [])
    
        const handleCancel = useCallback(async (id) => {
            const response = await entrances.getControlById(id)
            const data = response.data 
            const mappedData = data.entrada_notas.map((item) => item.chave_nota)
            setEntranceId(id)
            setDriverId(data.motorista.rg)
            setVehicleLicense(data.placa_principal)
            setFirstHaulage(data.placa_reboque1)
            setSecondHaulage(data.placa_reboque2)
            setThirdHaulage(data.placa_reboque3)
            setStatus(4)
            setStatusDescription(data.descricao_status)
            setArrivalDate(new Date(data.data_entrada))
            setExitDate(data.data_saida === null ? new Date() : new Date(data.data_saida))
            setLoadedWeight(Number(data.peso_cheio))
            setEmptyWeight(Number(data.peso_vazio))
            setMeasure(data.unidade_medida)
            setEntranceKeys(mappedData)
            setModalStatus("cancelar")
            setVisibleModal(true)
        }, [])
    
        async function updateEntrance() {
            try {
                await entrances.updateEntrance(entranceId, {
                    rg_motorista: driverId,
                    placa_principal: vehicleLicense,
                    placa_reboque1: firstHaulage,
                    placa_reboque2: secondHaulage,
                    placa_reboque3: thirdHaulage,
                    status: status,
                    descricao_status: statusDescription,
                    data_entrada: arrivalDate,
                    data_saida: exitDate,
                    peso_cheio: loadedWeight,
                    peso_vazio: emptyWeight,
                    empresa: company_id,
                    unidade_medida: measure,
                    entradas_notas: entranceKeys
                })
                setToast({
                    text: "Motorista cadastrado com sucesso",
                    type: "success"
                })
            } catch (error) {
                console.log(error)
                setToast({
                    text: "Houve um problema, por favor tente novamente",
                    type: "warning"
                })
            }
            setReload(!reload)
        }

  

    const getControlData = useCallback(async () => {
            try {
                const response = await entrances.getEntrance(page,  Number(session?.usuario.empresa.id), filters)
                const { data } = response;
                setEntrance(data.notas)
                setQuantityPage(Math.ceil(data.total / 8));
            } catch (error) {
                setToast({
                    text: "Houve um problema, por favor tente novamente",
                    type: "warning"
                })
            }

        },[page, filters, reload])

        useEffect(() => {

            getControlData();
        
        
        }, [page, filters, reload])
        
    
        useEffect(() => {
        if(page > quantityPage){
            setPage(1)
        }
        }, [filters, quantityPage, page])



    const gatheredData = useMemo(() => {
        const allData: any = [];
        if(entrance){
            const sliceNullControl = entrance.filter((item) => item.controle_entrada != null)
            // console.log(`sliceNullControl`, sliceNullControl)
            sliceNullControl.forEach((item) => {
                allData.push({
                    ...item,
                    option: <Popover content={[
                        {
                            optionName: 'Autorizar',
                            onClick: () => handleApproval(item.controle_entrada.id)
                        },
                        {
                            optionName: 'Editar',
                            onClick: () => handleEdit(item.controle_entrada.id)
                        },
                        {
                            optionName: 'Cancelar',
                            onClick: () => handleCancel(item.controle_entrada.id)
                        }
                    ]}/>,
                    status: (item.controle_entrada?.status === 0 ? "Na Portaria" : 
                    item.controle_entrada?.status === 1 ? "Entrada Autorizada" :
                    item.controle_entrada?.status === 2 ? "Entrada Fechada" : 
                    item.controle_entrada?.status === 3 ? "Não se Aplica" :
                    item.controle_entrada?.status === 4 ? "Entrega Cancelada": null),
                    arrivalDate: (item.controle_entrada === null ?  format(new Date(item.data_entrada), "dd/MM/yyyy") : format(new Date(item.controle_entrada?.data_entrada), "dd/MM/yyyy")),
                    exitDate: (item.controle_entrada?.data_saida != null ? format(new Date(item.controle_entrada?.data_saida), "dd/MM/yyyy") : ""),
                    arrivalTime:(item.controle_entrada === null ? format(new Date(item.data_entrada), "HH:mm"):  format(new Date(item.controle_entrada?.data_entrada),"HH:mm")),
                    exitTime:  (item.controle_entrada?.data_saida != null ? format(new Date(item.controle_entrada?.data_saida), "HH:mm") : ""),
                    emptyWeight: (Number(item.controle_entrada?.peso_vazio) === 0 ? "" : item.controle_entrada?.peso_vazio),
                })
            })
        }
        // console.log(`allData`, allData)
        return allData
    }, [entrance ])




    return <>
            <Head>
                <title>Orion | Controle de Entrada</title>
            </Head>
                <h2>Controle de Entrada</h2>
                <BtnRow>
                    <div>
                <RadioFilter />
                    </div>
                <div>
                <FilterModal data={filters} /> 
                    <button type="button" className="add" onClick={() => router.push({pathname: "/cadastrar-entrada"})}>
                        <span><Plus /></span>
                            Adicionar
                    </button>
                </div>
                </BtnRow>
            <EntranceGrid>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Chave de Acesso Nf-e</th>
                            <th>Status Portaria</th>
                            <th>Número Entrega</th>
                            <th>Peso Inicial do Veículo</th>
                            <th>Data Chegada</th>
                            <th>Data Saída</th>
                            <th>Horário Chegada</th>
                            <th>Horário Saída</th>
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
                            <td>{item.controle_entrada?.id}</td>
                            <td>{item.controle_entrada?.peso_cheio}</td>
                            <td>{item.arrivalDate}</td>
                            <td>{item.exitDate}</td>
                            <td>{item.arrivalTime}</td>
                            <td>{item.exitTime}</td>
                            <td>{item.controle_entrada?.placa_principal}</td>
                            <td>{item.controle_entrada?.placa_reboque1}</td>
                            <td>{item.controle_entrada?.placa_reboque2}</td>
                            <td>{item.controle_entrada?.placa_reboque3}</td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>
            </EntranceGrid>
            <Pages>
                <Pagination style={{margin : "0 auto"}} onChange={handleChange} count={quantityPage}  shape='rounded' />
            </Pages>
            {visibleModal && 
                <EntranceModal modalStatus={modalStatus} modalHandler={modalHandler} updateEntrance={updateEntrance} />}
            
                
        </>
    
}

ControleEntrada.auth = true
