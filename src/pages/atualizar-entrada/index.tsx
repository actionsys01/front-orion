import { useSession } from "next-auth/client";
import { useToasts } from "@geist-ui/react";
import BotaoVoltar from "@components/BotaoVoltar";
import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import Head from "next/head";
import  {format} from "date-fns";
import { Checkbox } from '@material-ui/core';
import { INfeDto } from "@services/nfe/dtos/INfeDTO";
import getNfeById from "@services/nfe/getNfeById";
import { useRouter } from "next/router";
import {TopConfirmBtn} from "@styles/buttons"
import * as entrances from "@services/controle-entrada";
import {  Section, FormContainer, Column, 
    OneLineContainer, Inline, EntranceGrid, 
    BtnStyle, ModalContainer, BtnPattern } from '../cadastrar-entrada/style';


export default function AtualizarEntrada() {
    const [, setToast] = useToasts();
    const [ session ] = useSession();
    const [visible, setVisible] = useState<boolean>(false);
    const [nota, setNota] = useState<INfeDto[]>([]);
    const router = useRouter();
    const company_id = Number(session?.usuario.empresa.id);
    const controlId = Number(router.query.id)
    console.log(controlId)
    // checkbox
    const [reboque, setReboque] = useState(false)
    // input states
    const key: any = useRef(null)
    const [ queryKey, setQueryKey ] = useState()
    const [driverId, setDriverId] = useState("");
    const [vehicleLicense, setVehicleLicense] = useState();
    const [firstHaulage, setFirstHaulage] = useState();
    const [secondHaulage, setSecondHaulage] = useState(2);
    const [thirdHaulage, setThirdHaulage] = useState();
    const [ status, setStatus] = useState()
    const [statusDescription, setStatusDescription] = useState();
    const [arrivalDate, setArrivalDate] = useState(new Date())
    const [exitDate, setExitDate] = useState(new Date())
    const [loadedWeight, setLoadedWeight] = useState();
    const [emptyWeight, setEmptyWeight] = useState();
    const [measure, setMeasure] = useState();
    const [entranceKeys, setEntranceKeys] = useState<string[]>([]);
    const [driver, setDriver] = useState("");
    const [arrivalTime, setArrivalTime] = useState(new Date())
    const [exitTime, setExitTime] = useState(new Date)
    const [ entranceId, setEntranceId] = useState(0)

    console.log("curry",router.query)

    const getData = useCallback(async () => {
        try {
            const response = await entrances.getControlById(controlId)
            const data = response.data 
            const mappedData = data.entrada_notas.map((item) => item.chave_nota)
            console.log("loginho", mappedData)
            // setNota(mappedData)
            setEntranceKeys(mappedData)
            console.log("data tese",data)
        return data
        } catch (error) {
            console.log(error)
            setToast({
                text: "Houve um problema, por favor tente novamente",
                type: "warning"
            });
        }
        
        },[])

        console.log("mapa",entranceKeys.forEach(item => item))

    const getNfe = useCallback(async () => {
        try {
            const response = await getNfeById(queryKey, company_id);
            // setNota([response.data])
            // setEntranceKeys(state =>[...state, key.current.value])
            // setToast({
            //     text: "Nota localizada com sucesso",
            //     type: "success"
            // });
        } catch (error) {
            console.log(error)
            setToast({
                text: "Houve um problema, por favor tente novamente",
                type: "warning"
            });
        }
        
    }, [] )

    useEffect(() => {
        getData()
    },[])

    // useEffect(() => {
    //     if(firstHaulage.length) {
    //         setReboque(true)
    //         setVisible(true)
    //     } if(!firstHaulage.length) {
    //         setReboque(false)
    //     }
    // }, [firstHaulage])

    // function reboqueCheckbox() {
    //     if(firstHaulage.length) {
    //         setReboque(true)
    //     }
    // }


    const gatheredData = useMemo(() => {
        const allData: any = []
        if(nota) {
            nota.forEach((item) => {
                allData.push({
                    ...item,

                    option: <span><Checkbox /></span>,
                    portaria_status: (item.portaria_status === 0 ? "Na Portaria" : 
                    item.portaria_status === 1 ? "Entrada Autorizada" :
                    item.portaria_status === 2 ? "Entrada Fechada" : 
                    item.portaria_status === 3 ? "Não se Aplica" :
                    item.portaria_status === 4 ? "Entrega Cancelada": null),
                    // emissionDate: format(new Date(item.dt_hr_emi), "dd/MM/yyyy"),
                    // arrivalDate: format(new Date(item.portaria_status_ent_dt_hr), "dd/MM/yyyy"),
                    // arrivalTime: (item.portaria_status_ent_dt_hr).toString().slice(11, 16),
                    // exitDate: (item.portaria_status_sai_dt_hr === null ? "" : format(new Date(item?.portaria_status_sai_dt_hr), "dd/MM/yyyy")),
                    // exitTime: (item?.portaria_status_sai_dt_hr)?.toString().slice(11, 16),
                })
            })
        }
        console.log("all",allData)
        return allData
    }, [nota])


    return  <>
        <Head>
            <title>Orion | Cadastrar Entrada</title>
        </Head>
        <BotaoVoltar />
        <TopConfirmBtn style={{width: "92.5%", margin: 0}}>
            <button onClick={getNfe}>
                confirmar
            </button>
        </TopConfirmBtn>
        <div style={{display: 'flex', gap: "10px", flexDirection: "column", alignItems: "center"}}>
            <Section>
                <h6>NF-e</h6>
                <OneLineContainer>
                    <form /* onSubmit={getNfe} */>
                        <span>Chave de Acesso NF-e</span>
                        <input type="text" value={queryKey}/* ref={key} *//>
                    </form>
                </OneLineContainer>
            </Section>
            <Section>
                <div className="header">
                    <h6>Motorista / Entregador</h6>
                </div>
                <Inline>
                    <div>
                        <div>
                            <span>RG</span>
                            <input type="text" /* value={driverId} onChange={(e) => setDriverId(e.target.value)} onBlur={(e) => findDriver(e.target.value)} */ />
                        </div>
                        <div>
                            <span >Nome</span>
                            <input type="text" /* value={driver} onChange={(e) => setDriver(e.target.value)} *//>
                        </div>
                    </div>
                        </Inline>
                </Section>
                <Section>
                <div className="header">
                    <h6>Veículos</h6>
                </div>
                <ModalContainer>
                    <div>
                        <div>
                            <span className="first">Placa Principal</span>
                            <input type="text"  value={vehicleLicense} onChange={(e) => setVehicleLicense(e.target.value)} /* onBlur={(e) => findVehicle(e.target.value)} */  />
                        </div>
                        <div>
                            <span>Descrição</span>
                            <input type="text" value={statusDescription} className="description" onChange={(e) => setStatusDescription(e.target.value)} />
                        </div>
                        <div>
                            <span className="icon">Reboque<Checkbox checked={reboque ? reboque || visible : visible} 
                            onChange={reboque ? () => null : () => setVisible(!visible)}
                            // onClick={reboque ? () => null : () => setVisible(!visible)}
                            /></span> 
                            </div>
                    </div>
                    {visible && 
                    <>
                    <div>
                        <div>
                            <span>Reboque 1</span>
                            <input type="text" value={firstHaulage}
                            onChange={(e) => setFirstHaulage(e.target.value)}/>
                        </div>
                        <div>
                            <span className="second">Reboque 2</span>
                            <input type="text" value={secondHaulage} onChange={(e) => setSecondHaulage(e.target.value)} 
                            className="description"/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span>Reboque 3</span>
                            <input type="text" value={thirdHaulage} 
                            onChange={(e) => setThirdHaulage(e.target.value)}/>
                        </div>
                        <div>
                            {/* <span>Descrição</span>
                            <input type="text" className="description"/> */}
                        </div>
                    </div>
                    </>
                    }
                </ModalContainer>
                </Section>
                <Section>
                    <h6>Dados de Chegada e Saída</h6>
                    <FormContainer>
                        <Column>
                            <div>
                                <span>Data Chegada</span>
                                <input defaultValue={format(new Date(arrivalDate), "dd/MM/yyyy")} onChange={(e) => setArrivalDate(new Date(e.target.value))} />
                            </div>
                            <div>
                                <span>Data Saída</span>
                                <input defaultValue={format(new Date(exitDate), "dd/MM/yyyy")} onChange={(e) => setExitDate(new Date(e.target.value))}/>
                            </div>
                        </Column>
                        <Column>
                            <div>
                                <span>Hora Chegada</span>
                                <input defaultValue={format(new Date(arrivalDate), "HH:mm")} onChange={(e) => setArrivalTime(new Date(e.target.value))}/>
                            </div>
                            <div>
                                <span>Hora Saída</span>
                                <input defaultValue={format(new Date(exitDate), "HH:mm")} onChange={(e) => setExitTime(new Date(e.target.value))}/>
                            </div>
                        </Column>
                        
                        <Column>
                            <div>
                                <span>Peso Carregado</span>
                                <input value={loadedWeight} onChange={(e) => setLoadedWeight(Number(e.target.value))}/>
                            </div>
                            <div>
                                <span>Peso Vazio</span>
                                <input value={emptyWeight} onChange={(e) => setEmptyWeight(Number(e.target.value))}/>
                            </div>
                        </Column>
                        <Column style={{justifyContent: "space-between"}}>
                            <div style={{justifyContent: "center"}}>
                                <span>UM</span>
                                <select defaultValue={measure}  onChange={(e) => setMeasure(e.target.value)} >
                                    <option selected> {measure}</option>
                                    {measure != "Kg" &&  <option value="Kg">Kg</option>}
                                    {measure != "Ton" && <option value="Ton">Ton</option>}
                                </select>
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
               {/* { visibleModal &&
               <DriverModal  setDriverId={setDriverId} 
                setDriver={setDriver} driver={driver} 
                driverId={driverId} modalHandler={modalHandler}/>}
                { secondModal &&
                    <VehicleModal setVehicleLicense={setVehicleLicense}
                 vehicleLicense={vehicleLicense}
                statusDescription={statusDescription} 
                setStatusDescription={setStatusDescription}
                secondModalHandler={secondModalHandler}/>} */}
       
            
        </>
    
}

AtualizarEntrada.auth = true
