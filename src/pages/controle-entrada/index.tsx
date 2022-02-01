import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import { Plus, Filter } from "@geist-ui/react-icons"
import { EntranceGrid, BtnRow } from './style';
import Popover from "@components/Popover";
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
import { useSecurityContext } from "@contexts/security"
import ModalHandler from "./modalHandler"
import { entranceInitials } from "@utils/initial-states"

interface Entrance {
    id: number
    chave_nota: string;
    controle_entrada: ControleProps
    data_entrada: string
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
    const { entrancePermissions } = useSecurityContext()
    //
    const [entranceData, setEntranceData] = useState({ ...entranceInitials })
    const [ status, setStatus] = useState(0)
    const [arrivalDate, setArrivalDate] = useState(new Date)
    const [exitDate, setExitDate] = useState(new Date)
    const [entranceKeys, setEntranceKeys] = useState<string[]>([]);
    const [ entranceId, setEntranceId] = useState(0)
    // const [arrivalTime, setArrivalTime] = useState(new Date)
    // const [exitTime, setExitTime] = useState()
    // Modal
    const [visibleModal, setVisibleModal] = useState(false)
    const [ modalStatus, setModalStatus ] = useState("")
    const [ hModal, setHModal ] = useState(false)

    const {filters} = useControlFilter()
    
    const handleChange = (event : React.ChangeEvent<unknown>, value : number) => {setPage(value)}
        
    
        const modalHandler = useCallback(() => {
            setVisibleModal(!visibleModal)
        }, [visibleModal])

        const modalVisibleHandler = useCallback(() => {
            setHModal(!hModal)
        }, [hModal])

    
        const handleApproval = useCallback(async (id) => {
            const response = await entrances.getControlById(id)
            const data = response.data 
            const mappedData = data.entrada_notas.map((item) => item.chave_nota)
            setEntranceId(id)
            setEntranceData({
                ...entranceData,
                driverId: data.motorista.rg,
                vehicleLicense: data.placa_principa,
                firstHaulage: data.placa_reboque1,
                secondHaulage: data.placa_reboque2,
                thirdHaulage: data.placa_reboque3,
                statusDescription: data.descricao_status,
                loadedWeight: Number(data.peso_cheio),
                emptyWeight: Number(data.peso_vazio),
                measure: data.unidade_medida
            })
            setStatus(1)
            setArrivalDate(new Date(data.data_entrada))
            setExitDate(data.data_saida === null ? new Date() : new Date(data.data_saida))              
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
            setEntranceData({
                ...entranceData,
                driverId: data.motorista.rg,
                vehicleLicense: data.placa_principal,
                firstHaulage: data.placa_reboque1,
                secondHaulage: data.placa_reboque2,
                thirdHaulage: data.placa_reboque3,
                statusDescription: data.descricao_status,
                loadedWeight: Number(data.peso_cheio),
                emptyWeight: Number(data.peso_vazio),
                measure: data.unidade_medida
            })
            setStatus(4)
            setArrivalDate(new Date(data.data_entrada))
            setExitDate(data.data_saida === null ? new Date() : new Date(data.data_saida))
            setEntranceKeys(mappedData)
            setModalStatus("cancelar")
            setVisibleModal(true)
        }, [])

        function handleFinished() {
            setModalStatus("fechado")
            setVisibleModal(true)
        }
    
        async function updateEntrance() {
            try {
                await entrances.updateEntrance(entranceId, {
                    rg_motorista: entranceData.driverId,
                    placa_principal: entranceData.vehicleLicense,
                    placa_reboque1: entranceData.firstHaulage,
                    placa_reboque2: entranceData.secondHaulage,
                    placa_reboque3: entranceData.thirdHaulage,
                    status: status,
                    descricao_status: entranceData.statusDescription,
                    data_entrada: arrivalDate,
                    data_saida: exitDate,
                    peso_cheio: entranceData.loadedWeight,
                    peso_vazio: entranceData.emptyWeight,
                    empresa: company_id,
                    unidade_medida: entranceData.measure,
                    entradas_notas: entranceKeys
                })
                setToast({
                    text: "Atualização concluída com sucesso",
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
            sliceNullControl.forEach((item, i) => {
                allData.push({
                    ...item,
                    option: <Popover num={i} content={[
                        {
                            optionName: 'Autorizar',
                            onClick:  !entrancePermissions.AUTORIZAR ? () => ''  
                                : item.controle_entrada?.status === 2 ? () => handleFinished() 
                                : item.controle_entrada?.status === 1 ? () => {setModalStatus("autorizar"), modalVisibleHandler() }
                                : item.controle_entrada?.status === 0 ? () => handleApproval(item.controle_entrada.id) 
                                : item.controle_entrada?.status === 4 ? () =>  {setModalStatus("exception"), modalVisibleHandler() } 
                                : () => '',
                            className: entrancePermissions.AUTORIZAR ? 'able' : 'disabled'
                        },
                        {
                            optionName: 'Editar',
                            onClick: !entrancePermissions.EDITAR ? () => '' 
                                : () => handleEdit(item.controle_entrada.id),
                            className: entrancePermissions.EDITAR ? 'able' : 'disabled'
                        },
                        {
                            optionName: 'Cancelar',
                            onClick: !entrancePermissions.CANCELAR ? () => '' 
                                : item.controle_entrada?.status === 4 ? () => {setModalStatus("cancelar"), modalVisibleHandler() }
                                : () => handleCancel(item.controle_entrada.id),
                            className: entrancePermissions.CANCELAR ? 'able' : 'disabled'
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
                            <button type="button" disabled={!entrancePermissions.ADICIONAR}
                                className={entrancePermissions.ADICIONAR ? "add" : "disabled"}
                                onClick={() => router.push({pathname: "/cadastrar-entrada"})}>
                                <span><Plus /></span>
                                    Adicionar
                            </button>
                    </div>
                </BtnRow>
                {hModal && <ModalHandler 
                    modalVisibleHandler={modalVisibleHandler} 
                    modalStatus={modalStatus}/>}
            <EntranceGrid>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Chave de Acesso</th>
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
                {entrancePermissions.VISUALIZAR &&
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
                    </tbody>}
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
