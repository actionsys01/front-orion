import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import Head from "next/head";
import router, { useRouter } from "next/router";
import BotaoVoltar from "@components/BotaoVoltar";
import {  Section, FormContainer, Column, 
    OneLineContainer, Inline, EntranceGrid, 
    BtnStyle, ModalContainer, BtnPattern } from './style';
import { Checkbox } from '@material-ui/core';
import { useToasts } from "@geist-ui/react";
import { INfeDto } from "@services/nfe/dtos/INfeDTO";
import {CteProps} from "@services/cte-mongo/cte-type/cte"
import getNfeById from "@services/nfe/getNfeById";
import buscar from "@services/cte-mongo/buscar"
import { useSession } from "next-auth/client";
import  {format} from "date-fns";
import {AddBtn, TopConfirmBtn} from "@styles/buttons"
import * as entranceReq from "@services/controle-entrada"
import DriverModal from "./driver-modal"
import VehicleModal from "./vehicle-modal"
import FinishModal from "./finish-modal"

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
    // visibilidade de modais
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [secondModal, setSecondModal] = useState(false);
    const [thirdModal, setThirdModal] = useState(false);
    // nota 
    const key: any = useRef(null)
    const [mainKey, setMainKey] = useState<string>("");
    const [nota, setNota] = useState<INfeDto[] | CteProps[]>([])
    const [, setToast] = useToasts();
    const [session] = useSession();
    const company_id = Number(session?.usuario.empresa.id);
    const [ableInput, setAbleInput] = useState(true)
    const timeLocal = new Date()
    // states dos inputs
    const [entranceKeys, setEntranceKeys] = useState<string[]>([]);
    const [driverId, setDriverId] = useState("");
    const [driver, setDriver] = useState("");
    const [statusDescription, setStatusDescription] = useState("");
    const [vehicleLicense, setVehicleLicense] = useState("");
    const [loadedWeight, setLoadedWeight] = useState(0);
    const [emptyWeight, setEmptyWeight] = useState(0);
    const [measure, setMeasure] = useState("Kg");
    const [firstHaulage, setFirstHaulage] = useState("");
    const [secondHaulage, setSecondHaulage] = useState("");
    const [thirdHaulage, setThirdHaulage] = useState("");
    const [arrivalDate, setArrivalDate] = useState(new Date)
    const [arrivalTime, setArrivalTime] = useState("")
    const [exitDate, setExitDate] = useState<Date | null>()
    const [exitTime, setExitTime] = useState("")
    const [ status, setStatus] = useState(0)

    const [dataEntrada, setDataEntrada] = useState("")
    const [ hasChanged, setHasChanged] = useState(false)
    const [dataSaida, setDataSaida] = useState("")
    const [ hasSChanged, setHasSChanged] = useState(false)




    const modalHandler = useCallback(() => {
        setVisibleModal(!visibleModal)
    }, [visibleModal])

    const secondModalHandler = useCallback(() => {
        setSecondModal(!secondModal)
    }, [secondModal])

    const thirdModalHandler = useCallback(() => {
        setThirdModal(!thirdModal)
    }, [thirdModal])

    


    // input de chave de acesso
    const getNfe = useCallback(async (e) => {
        e.preventDefault()
        // console.log("e", key.current.value )
        const initial = key.current.value.toString().substring(0,2)
        const ct = "CT"
        if (initial.valueOf() == ct.valueOf()){
            try {
                const response = await buscar(key.current.value)
                setNota(state =>[...state, response.data])
                setEntranceKeys(state =>[...state, key.current.value])
                setToast({
                    text: "Nota localizada com sucesso",
                    type: "success"
                });
            } catch (error) {
                console.log(error)
                setToast({
                    text: "Houve um problema, por favor tente novamente",
                    type: "warning"
                });
            }
        } else {
            try {
            const response = await getNfeById(key.current.value, company_id);
            // console.log(response.data)
            setNota(state =>[...state, response.data])
            setEntranceKeys(state =>[...state, key.current.value])
            setToast({
                text: "Nota localizada com sucesso",
                type: "success"
            });
        } catch (error) {
            console.log(error)
            setToast({
                text: "Houve um problema, por favor tente novamente",
                type: "warning"
            });
        }
        }
        e.target.reset()
    }, [] )


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
                    chave_nota: (item.chave_nota || item.informacoes_normal_substituto.infDoc.infNFe.chave),
                    emit_cnpj: (item.emit_cnpj ||item.emitente.CNPJ ),
                    emit_nome: (item.emit_nome || item.emitente.xNome),
                    nota: (item.nota || item.informacoes_cte.nCT),
                    serie: (item.serie || item.informacoes_cte.serie),
                    emissionDate: (!item.informacoes_cte ? format(new Date(item.dt_hr_emi), "dd/MM/yyyy") : (format(new Date(item.informacoes_cte.dhEmi), "dd/MM/yyyy") || format(new Date(item.informacoes_cte.dEmi), "dd/MM/yyyy"))),
                    // arrivalDate: format(new Date(item.portaria_status_ent_dt_hr), "dd/MM/yyyy"),
                    // arrivalTime: (item.portaria_status_ent_dt_hr).toString().slice(11, 16),
                    // exitDate: (item.portaria_status_sai_dt_hr === null ? "" : format(new Date(item?.portaria_status_sai_dt_hr), "dd/MM/yyyy")),
                    // exitTime: (item?.portaria_status_sai_dt_hr)?.toString().slice(11, 16),
                })
            })
        }
        // console.log("ally",allData)
        return allData
    }, [nota])

    async function registerEntrance ()  {
        // console.log("req", driverId,vehicleLicense, 
        // statusDescription,entranceKeys, 
        // loadedWeight,emptyWeight,measure, arrivalDate )
        const [  anoE, mesE,diaE  ] = dataEntrada.split("-")
        const [ horaE, minutoE ] = arrivalTime.split(":")
        const [ diaS, mesS, anoS ] = dataSaida.split("-")
        const [ horaS, minutoS ] = exitTime.split(":")
        const finalDate =  new Date(`${anoE}-${mesE}-${diaE} ${horaE}:${minutoE}`)
        // console.log("final",finalDate)
            try {
                await entranceReq.create({
                    rg_motorista: driverId,
                    placa_principal: vehicleLicense,
                    status: status,
                    descricao_status: statusDescription,
                    empresa: Number(session?.usuario.empresa.id),
                    entradas_notas: entranceKeys,
                    peso_cheio: loadedWeight,
                    peso_vazio: emptyWeight,
                    unidade_medida: measure,
                    data_entrada: hasChanged ? new Date(`${anoE}-${mesE}-${diaE} ${horaE}:${minutoE}`) : arrivalDate,
                    data_saida:  hasSChanged ? new Date(`${anoS}-${mesS}-${diaS} ${horaS}:${minutoS}`) : exitDate,
                    placa_reboque1: firstHaulage,
                    placa_reboque2: secondHaulage,
                    placa_reboque3: thirdHaulage
                })
                setToast({
                    text: "Cadastro efetuado com sucesso",
                    type: "success"
                });
            } catch (error) {
                console.log(error)
                setToast({
                    text: "Houve um problema, por favor tente novamente",
                    type: "warning"
                });
            }
            router.push({
                pathname: "/controle-entrada"
            })
        }

        async function findDriver(rg : string) {
            if(rg.length > 6) {
                 try {
                const response = await entranceReq.getDriverById(rg)
                const data = response.data.nome
                console.log("foi foi",data)
                setDriver(data)
                return data
            } catch (error) {
                setVisibleModal(true)
            }
            }
           
        }

        async function findVehicle(placa : string) {
            if(placa.length > 6) {
                try {
                const response = await entranceReq.getVehicleById(placa)
                const data = response.data.descricao
                // console.log("vehicle",data)
                setStatusDescription(data)
                return data
            } catch (error) {
                setSecondModal(true)
            }
            }
            
        }

        function finishihEntrance() {
            setStatus(2)
        }

        // function testeHour() {
        //     const [ano , mes, dia] = dataEntrada.split("-")
        //     console.log("ano mes e dia", [ano, mes, dia])
        //     const [ hora, minuto] = arrivalTime.split(":")
        //     console.log("hora e minuto", [hora, minuto])
        //     console.log("tempo final", new Date(`${ano}-${mes}-${dia} ${hora}:${minuto}`))
        // }

        // useEffect(() => {
        //     console.log("entrada data",dataEntrada)
        //     console.log("entrada hora",arrivalTime)
        // }, [ dataEntrada, arrivalTime])

       
 
    return <>
        <Head>
            <title>Orion | Cadastrar Entrada</title>
        </Head>
        <BotaoVoltar />
        <TopConfirmBtn style={{width: "92.5%", margin: 0}}>
            <button onClick={registerEntrance}>
                confirmar
            </button>
        </TopConfirmBtn>
        <div style={{display: 'flex', gap: "10px", flexDirection: "column", alignItems: "center"}}>
            <Section>
                <h6></h6>
                <OneLineContainer>
                    <form onSubmit={getNfe}>
                        <span>Chave de Acesso</span>
                        <input type="text" ref={key}/>
                        <BtnPattern type="submit">
                            enviar
                        </BtnPattern>
                    </form>
                </OneLineContainer>
            </Section>
            <Section>
                <div className="header">
                    <h6>Motorista / Entregador</h6>
                            <BtnPattern 
                            type="button"
                            onClick={() => {setVisibleModal(true)}}>
                                Cadastrar
                            </BtnPattern>
                </div>
                <Inline>
                    <div>
                        <div>
                            <span>RG</span>
                            <input type="text" value={driverId} onChange={(e) => setDriverId(e.target.value)} onBlur={(e) => findDriver(e.target.value)} />
                        </div>
                        <div>
                            <span >Nome</span>
                            <input type="text" value={driver} onChange={(e) => setDriver(e.target.value)}/>
                        </div>
                    </div>
                        </Inline>
                </Section>
                <Section>
                <div className="header">
                    <h6>Veículos</h6>
                    <BtnPattern
                    type="button"
                    onClick={() => setSecondModal(true)}>
                        Cadastrar
                    </BtnPattern>
                </div>
                <ModalContainer>
                    <div>
                        <div>
                            <span className="first">Placa Principal</span>
                            <input type="text" value={vehicleLicense} onChange={(e) => setVehicleLicense(e.target.value)} onBlur={(e) => findVehicle(e.target.value)} />
                        </div>
                        <div>
                            <span>Descrição</span>
                            <input type="text" value={statusDescription} className="description" onChange={(e) => setStatusDescription(e.target.value)}/>
                        </div>
                        <div>
                            <span className="icon">Reboque<Checkbox onChange={() => setVisible(!visible)}/></span> 
                            </div>
                    </div>
                    {visible && 
                    <>
                    <div>
                        <div>
                            <span>Reboque 1</span>
                            <input type="text" onChange={(e) => setFirstHaulage(e.target.value)}/>
                        </div>
                        <div>
                            <span className="second">Reboque 2</span>
                            <input type="text" className="description"/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span>Reboque 3</span>
                            <input type="text" onChange={(e) => setSecondHaulage(e.target.value)}/>
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
                                <input type="date" defaultValue={format(new Date(), "yyyy-MM-dd")} 
                                    onChange={(e) => {setDataEntrada(e.target.value), setHasChanged(true)}} />
                            </div>
                            <div>
                                <span>Data Saída</span>
                                <input type="date" className={!ableInput ? "" : "disabled"} defaultValue={!ableInput ? format(new Date(), "yyyy-MM-dd") : ""}
                                    onFocus={() => setAbleInput(false)} onChange={(e) => {setDataSaida(e.target.value), setHasSChanged(true)}}/>
                            </div>
                        </Column>
                        <Column>
                            <div>
                                <span>Hora Chegada</span>
                                <input type="time"  defaultValue={format(new Date(), "HH:mm")} 
                                    onChange={(e) => {setArrivalTime(e.target.value), setHasChanged(true)}}/>
                            </div>
                            <div>
                                <span>Hora Saída</span>
                                <input type="time"  className={!ableInput ? "" : "disabled"} 
                                    onChange={(e) => {setExitTime(e.target.value), setHasSChanged}} onFocus={() => setAbleInput(false)} />
                            </div>
                        </Column>
                        
                        <Column>
                            <div>
                                <span>Peso Carregado</span>
                                <input onChange={(e) => setLoadedWeight(Number(e.target.value))}/>
                            </div>
                            <div>
                                <span>Peso Vazio</span>
                                <input onChange={(e) => setEmptyWeight(Number(e.target.value))}
                                className={!ableInput ? "" : "disabled"} onFocus={() => setAbleInput(false)} />
                            </div>
                        </Column>
                        <Column style={{justifyContent: "space-between"}}>
                            <div style={{justifyContent: "center"}}>
                                <span>UM</span>
                                <select onChange={(e) => setMeasure(e.target.value)} >
                                    <option value="Kg">Kg</option>
                                    <option value="Ton">Ton</option>
                                </select>
                            </div>
                            <div style={{justifyContent: "center", alignItems: "flex-end", fontSize: "0.75rem"}}>
                                <BtnStyle disabled={exitDate === undefined && emptyWeight === 0 ? true : false} 
                                    onClick={() => setThirdModal(true)} type="button">
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
                { visibleModal &&
                    <DriverModal  setDriverId={setDriverId} 
                        setDriver={setDriver} driver={driver} 
                        driverId={driverId} modalHandler={modalHandler}/>}
                { secondModal &&
                    <VehicleModal setVehicleLicense={setVehicleLicense}
                        vehicleLicense={vehicleLicense}
                        statusDescription={statusDescription} 
                        setStatusDescription={setStatusDescription}
                        secondModalHandler={secondModalHandler}/>}
                {thirdModal && 
                    <FinishModal thirdModalHandler={thirdModalHandler} 
                        emptyWeight={emptyWeight} exitDate={exitDate} 
                        finishihEntrance={finishihEntrance} />}
        </>
}

CadastrarEntrada.auth = true