import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import BotaoVoltar from '@components/BotaoVoltar';
import React, {
    useState,
    useMemo,
    useEffect,
    useCallback,
    useRef,
} from 'react';
import Head from 'next/head';
import { format } from 'date-fns';
import { Checkbox } from '@material-ui/core';
import { INfeDto } from '@services/nfe/dtos/INfeDTO';
import { CteProps } from '@services/cte-mongo/cte-type/cte';
import getNfeById from '@services/nfe/getNfeById';
import { useRouter } from 'next/router';
import { TopConfirmBtn } from '@styles/buttons';
import * as entrances from '@services/controle-entrada';
import {
    Section,
    FormContainer,
    Column,
    OneLineContainer,
    Inline,
    EntranceGrid,
    BtnStyle,
    ModalContainer,
    BtnPattern,
} from '../cadastrar-entrada/style';
import FinishUpdateModal from './finish-modal';
import getCteById from '@services/cte-mongo/getCteById';
import { entranceInitials } from '@utils/initial-states';

export default function AtualizarEntrada() {
    const [, setToast] = useToasts();
    const [session] = useSession();
    const router = useRouter();
    // visibilidade de modais
    const [visible, setVisible] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [nota, setNota] = useState<INfeDto[] | CteProps[]>([]);
    const company_id = Number(session?.usuario.empresa.id);
    const controlId = Number(router.query.id);
    // checkbox
    const [reboque, setReboque] = useState(false);
    // input states
    const key: any = useRef(null);
    const [entrance, setEntrance] = useState({ ...entranceInitials });
    const [status, setStatus] = useState(0);
    const [arrivalDate, setArrivalDate] = useState<Date | null>(new Date());
    const [exitDate, setExitDate] = useState<Date | null>(new Date());
    const [entranceKeys, setEntranceKeys] = useState<string[]>([]);
    const [arrivalTime, setArrivalTime] = useState('');
    const [exitTime, setExitTime] = useState('');

    const [dataEntrada, setDataEntrada] = useState('');
    const [hasChanged, setHasChanged] = useState(false);
    const [dataSaida, setDataSaida] = useState('');
    const [hasSChanged, setHasSChanged] = useState(false);
    const [entranceFocus, setEntranceFocus] = useState(false);
    const [exitFocus, setExitFocus] = useState(false);
    const [entranceFinished, setEntranceFinished] = useState(false);

    const modalHandler = useCallback(() => {
        setModalVisible(!modalVisible);
    }, [modalVisible]);

    const getData = useCallback(async () => {
        try {
            const response = await entrances.getControlById(controlId);
            const data = response.data;
            const mappedData = data.entrada_notas.map(item => item.chave_nota);
            setEntranceKeys(mappedData);
            getEntranceKeys(mappedData);
            setEntrance({
                ...entrance,
                driverId: data.motorista.rg,
                driver: data.motorista.nome,
                vehicleLicense: data.placa_principal,
                statusDescription: data.descricao_status,
                firstHaulage: data.placa_reboque1,
                secondHaulage: data.placa_reboque2,
                thirdHaulage: data.placa_reboque3,
                loadedWeight: data.peso_cheio,
                emptyWeight: data.peso_vazio === 0 ? '' : data.peso_vazio,
                measure: data.unidade_medida,
            });
            setArrivalDate(data.data_entrada);
            setExitDate(
                data.data_saida === null ? new Date() : data.data_saida,
            );
            // console.log(data)
            if (data.status === 2) {
                setEntranceFinished(true);
            }
        } catch (error) {
            console.log(error);
            setToast({
                text: 'Houve um problema, por favor tente novamente',
                type: 'warning',
            });
        }
    }, [controlId]);

    useEffect(() => {
        getData();
    }, [controlId]);

    const getKey = useCallback(
        async e => {
            e.preventDefault();
            if (!key.current.value) {
                setToast({
                    text: 'É necessário inserir uma nota no campo de busca',
                    type: 'warning',
                });
                return;
            }

            const response = await entrances.getEntrance(
                1,
                Number(session?.usuario.empresa.id),
                [{ campo: 'chave_nota', valor: key.current.value }],
            );
            const data = response.data.notas.filter(
                item => item.controle_entrada.status === 4,
            );
            if (response.data.total >= 1 && !data.length) {
                setToast({
                    text: `Nota duplicada, caso deseje prosseguir cancele a nota anterior`,
                    type: 'warning',
                });
                e.target.reset();
                return;
            }

            const keyCheck = entranceKeys.find(
                value => value.toString() == key.current.value.toString(),
            );
            if (keyCheck) {
                setToast({
                    text: 'Chave já inserida',
                    type: 'warning',
                });
                e.target.reset();
                return;
            }

            const notaValue =
                key.current.value.length === 47
                    ? key.current.value.slice(3, 47)
                    : key.current.value.length === 44
                    ? key.current.value
                    : '';

            if (Number(notaValue.substring(20, 22)) === 57) {
                try {
                    const response = await getCteById(
                        key.current.value,
                        company_id,
                    );
                    setNota(state => [...state, response.data]);
                    setEntranceKeys(state => [...state, key.current.value]);
                    setToast({
                        text: 'Nota localizada com sucesso',
                        type: 'success',
                    });
                } catch (error) {
                    console.log(error);
                    setToast({
                        text: 'Houve um problema, CT-e não localizado',
                        type: 'warning',
                    });
                }
                e.target.reset();
                return;
            }
            if (Number(notaValue.substring(20, 22)) === 55) {
                try {
                    const response = await getNfeById(
                        key.current.value,
                        company_id,
                    );
                    setNota(state => [...state, response.data]);
                    setEntranceKeys(state => [...state, key.current.value]);
                    setToast({
                        text: 'Nota localizada com sucesso',
                        type: 'success',
                    });
                } catch (error) {
                    console.log(error);
                    setToast({
                        text: 'Houve um problema, NF-e não localizado',
                        type: 'warning',
                    });
                }
                e.target.reset();
                return;
            }
            if (Number(notaValue.length) != 44) {
                setToast({
                    text: 'Número de caracteres inválido',
                    type: 'warning',
                });
                e.target.reset();
                return;
            }
            if (
                Number(notaValue.substring(20, 22)) != 55 &&
                Number(notaValue.substring(20, 22)) != 57
            ) {
                setToast({
                    text: 'Houve um problema, nota não localizada',
                    type: 'warning',
                });
                e.target.reset();
                return;
            }
        },
        [entranceKeys],
    );

    const getEntranceKeys = useCallback(async entranceKeys => {
        if (entranceKeys.length) {
            for (let i = 0; i < entranceKeys.length; i++) {
                const mainKey = entranceKeys[i];
                if (
                    mainKey.startsWith('NFe') ||
                    (mainKey.startsWith('CTe') && mainKey.length === 47)
                ) {
                    const notaPura = mainKey.slice(3, 47);
                    if (Number(notaPura.substring(20, 22)) === 57) {
                        // console.log("veio aqui")
                        try {
                            const response = await getCteById(
                                mainKey,
                                company_id,
                            );
                            setNota(state => [...state, response.data]);
                            setEntranceKeys(state => [...state, mainKey]);
                        } catch (error) {
                            console.log(error);
                            setToast({
                                text: 'Houve um problema, por favor tente novamente CTE',
                                type: 'warning',
                            });
                        }
                    } else {
                        try {
                            const response = await getNfeById(
                                mainKey,
                                company_id,
                            );
                            setNota(state => [...state, response.data]);
                            setEntranceKeys(state => [...state, mainKey]);
                        } catch (error) {
                            console.log(error);
                            setToast({
                                text: 'Houve um problema, por favor tente novamente NFE',
                                type: 'warning',
                            });
                        }
                    }
                }
            }
        }
    }, []);

    function finishihEntrance() {
        setStatus(2);
        setHasChanged(hasSChanged);
        setHasSChanged(hasSChanged);
        setEntranceFinished(true);
        updateEntrance();
    }

    useEffect(() => {
        if (entrance.firstHaulage?.length) {
            setReboque(true);
            setVisible(true);
        }
        if (!entrance.firstHaulage?.length) {
            setReboque(false);
        }
    }, [entrance.firstHaulage]);

    const gatheredData = useMemo(() => {
        const allData: any = [];
        if (nota) {
            nota.forEach(item => {
                allData.push({
                    ...item,

                    option: (
                        <span>
                            <Checkbox />
                        </span>
                    ),
                    portaria_status:
                        item.portaria_status === 0
                            ? 'Na Portaria'
                            : item.portaria_status === 1
                            ? 'Entrada Autorizada'
                            : item.portaria_status === 2
                            ? 'Entrada Fechada'
                            : item.portaria_status === 3
                            ? 'Não se Aplica'
                            : item.portaria_status === 4
                            ? 'Entrega Cancelada'
                            : null,
                    chave_nota:
                        item.chave_nota ||
                        item.informacoes_normal_substituto.infDoc.infNFe.chave,
                    emit_cnpj: item.emit_cnpj || item.emitente.CNPJ,
                    emit_nome: item.emit_nome || item.emitente.xNome,
                    nota: item.nota || item.informacoes_cte.nCT,
                    serie: item.serie || item.informacoes_cte.serie,
                    emissionDate: !item.informacoes_cte
                        ? format(new Date(item.dt_hr_emi), 'dd/MM/yyyy')
                        : format(
                              new Date(item.informacoes_cte.dhEmi),
                              'dd/MM/yyyy',
                          ) ||
                          format(
                              new Date(item.informacoes_cte.dEmi),
                              'dd/MM/yyyy',
                          ),
                    arrivalDate: item.portaria_status_ent_dt_hr
                        ? format(
                              new Date(item.portaria_status_ent_dt_hr),
                              'dd/MM/yyyy',
                          )
                        : '',
                    arrivalTime: item.portaria_status_ent_dt_hr
                        ? item.portaria_status_ent_dt_hr
                              .toString()
                              .slice(11, 16)
                        : '',
                    exitDate: item.portaria_status_sai_dt_hr
                        ? format(
                              new Date(item?.portaria_status_sai_dt_hr),
                              'dd/MM/yyyy',
                          )
                        : '',
                    exitTime: item?.portaria_status_sai_dt_hr
                        ? item?.portaria_status_sai_dt_hr
                              ?.toString()
                              .slice(11, 16)
                        : '',
                    // arrivalDate: format(new Date(item.portaria_status_ent_dt_hr), "dd/MM/yyyy"),
                    // arrivalTime: (item.portaria_status_ent_dt_hr).toString().slice(11, 16),
                    // exitDate: (item.portaria_status_sai_dt_hr === null ? "" : format(new Date(item?.portaria_status_sai_dt_hr), "dd/MM/yyyy")),
                    // exitTime: (item?.portaria_status_sai_dt_hr)?.toString().slice(11, 16),
                });
            });
        }
        return allData;
    }, [nota]);

    async function updateEntrance() {
        const [anoE, mesE, diaE] = dataEntrada.split('-');
        const [horaE, minutoE] = arrivalTime.split(':');
        const [anoS, mesS, diaS] = dataSaida.split('-');
        const [horaS, minutoS] = exitTime.split(':');
        try {
            await entrances.updateEntrance(controlId, {
                rg_motorista: entrance.driverId,
                placa_principal: entrance.vehicleLicense,
                placa_reboque1: entrance.firstHaulage,
                placa_reboque2: entrance.secondHaulage,
                placa_reboque3: entrance.thirdHaulage,
                status: status,
                descricao_status: entrance.statusDescription,
                data_entrada: hasChanged
                    ? new Date(`${anoE}-${mesE}-${diaE} ${horaE}:${minutoE}`)
                    : arrivalDate,
                data_saida: hasSChanged
                    ? new Date(`${anoS}-${mesS}-${diaS} ${horaS}:${minutoS}`)
                    : exitDate,
                peso_cheio: entrance.loadedWeight,
                peso_vazio:
                    entrance.emptyWeight.toString() === ''
                        ? 0
                        : entrance.emptyWeight,
                empresa: company_id,
                unidade_medida: entrance.measure,
                entradas_notas: entranceKeys,
            });
            setToast({
                text: 'Atualização concluída com sucesso',
                type: 'success',
            });
        } catch (error) {
            console.log(error);
            setToast({
                text: 'Houve um problema, por favor tente novamente',
                type: 'warning',
            });
        }
        router.push('/controle-entrada');
    }

    //    useEffect(() => {
    //        console.log(`dataSaida`, dataSaida)
    //        console.log(`exitTime`, exitTime)
    //    }, [dataSaida, exitTime])

    return (
        <>
            <Head>
                <title>Orion | Cadastrar Entrada</title>
            </Head>
            <BotaoVoltar />
            <TopConfirmBtn style={{ width: '92.5%', margin: 0 }}>
                <button onClick={updateEntrance} disabled={entranceFinished}>
                    confirmar
                </button>
            </TopConfirmBtn>
            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Section>
                    <h6></h6>
                    <OneLineContainer>
                        <form onSubmit={getKey}>
                            <span>Chave de Acesso</span>
                            <input
                                type="text"
                                ref={key}
                                readOnly={entranceFinished}
                            />
                            <BtnPattern type="submit">enviar</BtnPattern>
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
                                <input
                                    type="text"
                                    readOnly={entranceFinished}
                                    value={entrance.driverId}
                                    onChange={e =>
                                        setEntrance({
                                            ...entrance,
                                            driverId: e.target.value,
                                        })
                                    } /* onBlur={(e) => findDriver(e.target.value)}  */
                                />
                            </div>
                            <div>
                                <span>Nome</span>
                                <input
                                    type="text"
                                    readOnly={entranceFinished}
                                    value={entrance.driver}
                                    onChange={e =>
                                        setEntrance({
                                            ...entrance,
                                            driver: e.target.value,
                                        })
                                    }
                                />
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
                                <input
                                    type="text"
                                    readOnly={entranceFinished}
                                    value={entrance.vehicleLicense}
                                    onChange={e =>
                                        setEntrance({
                                            ...entrance,
                                            vehicleLicense: e.target.value,
                                        })
                                    } /* onBlur={(e) => findVehicle(e.target.value)} */
                                />
                            </div>
                            <div>
                                <span>Descrição</span>
                                <input
                                    type="text"
                                    readOnly={entranceFinished}
                                    value={entrance.statusDescription}
                                    className="description"
                                    onChange={e =>
                                        setEntrance({
                                            ...entrance,
                                            statusDescription: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <span className="icon">
                                    Reboque
                                    <Checkbox
                                        checked={
                                            reboque
                                                ? reboque || visible
                                                : visible
                                        }
                                        disabled={entranceFinished}
                                        onChange={
                                            reboque
                                                ? () => null
                                                : () => setVisible(!visible)
                                        }
                                        // onClick={reboque ? () => null : () => setVisible(!visible)}
                                    />
                                </span>
                            </div>
                        </div>
                        {visible && (
                            <>
                                <div>
                                    <div>
                                        <span>Reboque 1</span>
                                        <input
                                            type="text"
                                            value={entrance.firstHaulage}
                                            onChange={e =>
                                                setEntrance({
                                                    ...entrance,
                                                    firstHaulage:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <span className="second">
                                            Reboque 2
                                        </span>
                                        <input
                                            type="text"
                                            value={entrance.secondHaulage}
                                            onChange={e =>
                                                setEntrance({
                                                    ...entrance,
                                                    secondHaulage:
                                                        e.target.value,
                                                })
                                            }
                                            className="description"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <span>Reboque 3</span>
                                        <input
                                            type="text"
                                            value={entrance.thirdHaulage}
                                            onChange={e =>
                                                setEntrance({
                                                    ...entrance,
                                                    thirdHaulage:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div></div>
                                </div>
                            </>
                        )}
                    </ModalContainer>
                </Section>
                <Section>
                    <h6>Dados de Chegada e Saída</h6>
                    <FormContainer>
                        <Column>
                            <div>
                                <span>Data Chegada</span>
                                <input
                                    type="date"
                                    readOnly={entranceFinished}
                                    value={
                                        !entranceFocus
                                            ? format(
                                                  new Date(arrivalDate),
                                                  'yyyy-MM-dd',
                                              )
                                            : dataEntrada
                                    }
                                    onChange={e => {
                                        setDataEntrada(e.target.value),
                                            setHasChanged(true);
                                    }}
                                    onFocus={
                                        entranceFinished
                                            ? () => ''
                                            : () => setEntranceFocus(true)
                                    }
                                />
                            </div>
                            <div>
                                <span>Data Saída</span>
                                <input
                                    type="date"
                                    readOnly={entranceFinished}
                                    value={
                                        !exitFocus
                                            ? format(
                                                  new Date(exitDate),
                                                  'yyyy-MM-dd',
                                              )
                                            : dataSaida
                                    }
                                    onChange={e => {
                                        setDataSaida(e.target.value),
                                            setHasSChanged(true);
                                    }}
                                    onFocus={
                                        entranceFinished
                                            ? () => ''
                                            : () => setExitFocus(true)
                                    }
                                />
                            </div>
                        </Column>
                        <Column>
                            <div>
                                <span>Hora Chegada</span>
                                <input
                                    type="time"
                                    readOnly={entranceFinished}
                                    value={
                                        !entranceFocus
                                            ? format(
                                                  new Date(arrivalDate),
                                                  'HH:mm',
                                              )
                                            : arrivalTime
                                    }
                                    onChange={e => {
                                        setArrivalTime(e.target.value),
                                            setHasChanged(true);
                                    }}
                                    onFocus={
                                        entranceFinished
                                            ? () => ''
                                            : () => setEntranceFocus(true)
                                    }
                                />
                            </div>
                            <div>
                                <span>Hora Saída</span>
                                <input
                                    type="time"
                                    readOnly={entranceFinished}
                                    value={
                                        !exitFocus
                                            ? format(
                                                  new Date(exitDate),
                                                  'HH:mm',
                                              )
                                            : exitTime
                                    }
                                    onChange={e => {
                                        setExitTime(e.target.value),
                                            setHasSChanged(true);
                                    }}
                                    onFocus={
                                        entranceFinished
                                            ? () => ''
                                            : () => setExitFocus(true)
                                    }
                                />
                            </div>
                        </Column>

                        <Column>
                            <div>
                                <span>Peso Carregado</span>
                                <input
                                    value={entrance.loadedWeight}
                                    readOnly={entranceFinished}
                                    onChange={e =>
                                        setEntrance({
                                            ...entrance,
                                            loadedWeight: Number(
                                                e.target.value,
                                            ),
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <span>Peso Vazio</span>
                                <input
                                    value={entrance.emptyWeight}
                                    readOnly={entranceFinished}
                                    onChange={e =>
                                        setEntrance({
                                            ...entrance,
                                            emptyWeight: Number(e.target.value),
                                        })
                                    }
                                />
                            </div>
                        </Column>
                        <Column style={{ justifyContent: 'space-between' }}>
                            <div style={{ justifyContent: 'center' }}>
                                <span>UM</span>
                                <select
                                    defaultValue={entrance.measure}
                                    disabled={entranceFinished}
                                    onChange={e =>
                                        setEntrance({
                                            ...entrance,
                                            measure: e.target.value,
                                        })
                                    }
                                >
                                    <option defaultValue={entrance.measure}>
                                        {' '}
                                        {entrance.measure}
                                    </option>
                                    {entrance.measure != 'Kg' && (
                                        <option value="Kg">Kg</option>
                                    )}
                                    {entrance.measure != 'Ton' && (
                                        <option value="Ton">Ton</option>
                                    )}
                                </select>
                            </div>
                            <div
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                    fontSize: '0.75rem',
                                }}
                            >
                                <BtnStyle
                                    onClick={() => {
                                        setStatus(2), setModalVisible(true);
                                    }}
                                    type="button"
                                    disabled={entranceFinished}
                                >
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
            {modalVisible && (
                <FinishUpdateModal
                    modalHandler={modalHandler}
                    setStatus={setStatus}
                    finishihEntrance={finishihEntrance}
                />
            )}
        </>
    );
}

AtualizarEntrada.auth = true;
