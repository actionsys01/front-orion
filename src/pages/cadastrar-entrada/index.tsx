import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import Head from 'next/head';
import router, { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
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
} from './style';
import { Checkbox } from '@material-ui/core';
import { useToasts } from '@geist-ui/react';
import { INfeDto } from '@services/nfe/dtos/INfeDTO';
import { CteProps, ICteGridData } from '@services/cte-mongo/cte-type/cte';
import getNfeById from '@services/nfe/getNfeById';
import getCteById from '@services/cte-mongo/getCteById';
import { useSession } from 'next-auth/client';
import { format } from 'date-fns';
import { TopConfirmBtn } from '@styles/buttons';
import * as entranceReq from '@services/controle-entrada';
import DriverModal from './driver-modal';
import VehicleModal from './vehicle-modal';
import FinishModal from './finish-modal';
import { entranceInitials } from '@utils/initial-states';
import Popover from '@components/Popover';

type NotaProps = INfeDto & ICteGridData;
export default function CadastrarEntrada() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const company_id = Number(session?.usuario.empresa.id);
  // visibilidade de modais
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [thirdModal, setThirdModal] = useState(false);
  // nota
  const key: any = useRef(null);
  const [nota, setNota] = useState<NotaProps[]>([]);
  const [entranceKeys, setEntranceKeys] = useState<string[]>([]);
  const [ableInput, setAbleInput] = useState(true);
  const [entrance, setEntrance] = useState({ ...entranceInitials });
  const [status, setStatus] = useState(0);

  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState('');
  const [exitDate, setExitDate] = useState<Date | null>();
  const [exitTime, setExitTime] = useState('');

  const [dataEntrada, setDataEntrada] = useState('');
  const [hasChanged, setHasChanged] = useState(false);
  const [dataSaida, setDataSaida] = useState('');
  const [hasSChanged, setHasSChanged] = useState(false);
  const [entranceFinished, setEntranceFinished] = useState(false);

  const modalHandler = useCallback(() => {
    setVisibleModal(!visibleModal);
  }, [visibleModal]);

  const secondModalHandler = useCallback(() => {
    setSecondModal(!secondModal);
  }, [secondModal]);

  const thirdModalHandler = useCallback(() => {
    setThirdModal(!thirdModal);
  }, [thirdModal]);

  // input de chave de acesso
  const getKey = useCallback(
    async e => {
      e.preventDefault();
      // console.log('key.current.value.length', key.current.value.length);
      // console.log('substring(20, 22)', key.current.value.substring(20, 22));
      if (!key.current.value) {
        setToast({
          text: '?? necess??rio inserir uma nota no campo de busca',
          type: 'warning',
        });
        return;
      }

      const response = await entranceReq.getEntrance(
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
          text: 'Chave j?? inserida',
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
          const response = await getCteById(key.current.value, company_id);
          setNota(state => [...state, response.data]);
          setEntranceKeys(state => [...state, key.current.value]);
          setToast({
            text: 'Nota localizada com sucesso',
            type: 'success',
          });
        } catch (error) {
          console.log(error);
          setToast({
            text: 'Houve um problema, CT-e n??o localizado',
            type: 'warning',
          });
        }
        e.target.reset();
        return;
      }
      if (Number(notaValue.substring(20, 22)) === 55) {
        try {
          const response = await getNfeById(key.current.value, company_id);
          setNota(state => [...state, response.data]);
          setEntranceKeys(state => [...state, key.current.value]);
          setToast({
            text: 'Nota localizada com sucesso',
            type: 'success',
          });
        } catch (error) {
          console.log(error);
          setToast({
            text: 'Houve um problema, NF-e n??o localizado',
            type: 'warning',
          });
        }
        e.target.reset();
        return;
      }
      if (Number(notaValue.length) != 44) {
        setToast({
          text: 'N??mero de caracteres inv??lido',
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
          text: 'Houve um problema, nota n??o localizada',
          type: 'warning',
        });
        e.target.reset();
        return;
      }
    },
    [entranceKeys],
  );

  const gatheredData = useMemo(() => {
    const allData: any = [];
    if (nota) {
      nota.forEach((item, i) => {
        allData.push({
          ...item,
          option: (
            <Popover
              num={i}
              quant={1}
              content={[
                {
                  optionName: 'Excluir',
                  onClick: () => deleteNotas(item.chave_nota),
                  className: 'able',
                },
              ]}
            />
          ),
          portaria_status:
            item.portaria_status === 0
              ? 'Na Portaria'
              : item.portaria_status === 1
              ? 'Entrada Autorizada'
              : item.portaria_status === 2
              ? 'Entrada Fechada'
              : item.portaria_status === 3
              ? 'N??o se Aplica'
              : item.portaria_status === 4
              ? 'Entrega Cancelada'
              : null,
          chave_nota: item.chave_nota || item.chave_nota,
          emit_cnpj: item.emit_cnpj || item.emit_cnpj,
          emit_nome: item.emit_nome || item.emit_nome,
          nota: item.nota || item.nota,
          serie: item.serie || item.serie,
          emissionDate: item.dt_hr_emi
            ? format(new Date(item.dt_hr_emi), 'dd/MM/yyyy')
            : format(new Date(item.dhEmi), 'dd/MM/yyyy') ||
              format(new Date(item.dEmi), 'dd/MM/yyyy'),
          arrivalDate: item.portaria_status_ent_dt_hr
            ? format(new Date(item.portaria_status_ent_dt_hr), 'dd/MM/yyyy')
            : '',
          arrivalTime: item.portaria_status_ent_dt_hr
            ? item.portaria_status_ent_dt_hr.toString().slice(11, 16)
            : '',
          exitDate: item.portaria_status_sai_dt_hr
            ? format(new Date(item?.portaria_status_sai_dt_hr), 'dd/MM/yyyy')
            : '',
          exitTime: item?.portaria_status_sai_dt_hr
            ? item?.portaria_status_sai_dt_hr?.toString().slice(11, 16)
            : '',
        });
      });
    }
    // console.log("ally",allData)
    return allData;
  }, [nota]);

  async function registerEntrance() {
    // console.log("req", driverId,vehicleLicense,
    // statusDescription,entranceKeys,
    // loadedWeight,emptyWeight,measure, arrivalDate, exitDate )
    const [anoE, mesE, diaE] = dataEntrada.split('-');
    const [horaE, minutoE] = arrivalTime.split(':');
    const [anoS, mesS, diaS] = dataSaida.split('-');
    const [horaS, minutoS] = exitTime.split(':');

    try {
      await entranceReq.create({
        rg_motorista: entrance.driverId,
        placa_principal: entrance.vehicleLicense,
        status: status,
        descricao_status: entrance.statusDescription,
        empresa: Number(session?.usuario.empresa.id),
        entradas_notas: entranceKeys,
        peso_cheio: entrance.loadedWeight,
        peso_vazio: entrance.emptyWeight,
        unidade_medida: entrance.measure,
        data_entrada: hasChanged
          ? new Date(`${anoE}-${mesE}-${diaE} ${horaE}:${minutoE}`)
          : arrivalDate,
        data_saida: hasSChanged
          ? new Date(`${anoS}-${mesS}-${diaS} ${horaS}:${minutoS}`)
          : exitDate,
        placa_reboque1: entrance.firstHaulage,
        placa_reboque2: entrance.secondHaulage,
        placa_reboque3: entrance.thirdHaulage,
      });
      setToast({
        text: 'Cadastro efetuado com sucesso',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema, por favor tente novamente',
        type: 'warning',
      });
    }
    router.push({
      pathname: '/controle-entrada',
    });
  }

  const validateDriverId = useCallback(
    (rg: string) => {
      const stringFormatted = rg.replaceAll(/[^0-9 | x | X]|\W*/g, '');
      if (stringFormatted.length <= 11) {
        setEntrance({ ...entrance, driverId: stringFormatted });
      }
    },
    [entrance.driverId],
  );

  async function findDriver(rg: string) {
    // console.log('rg no focus', rg);
    if (rg.length >= 6) {
      try {
        const response = await entranceReq.getDriverById(rg);
        const data = response.data.nome;
        // console.log("motorista",data)
        setEntrance({ ...entrance, driver: data });
        return data;
      } catch (error) {
        setVisibleModal(true);
      }
    }
  }

  async function findVehicle(placa: string) {
    if (placa.length > 6) {
      try {
        const response = await entranceReq.getVehicleById(placa);
        const data = response.data.descricao;
        // console.log("vehicle",data)
        setEntrance({ ...entrance, statusDescription: data });
        return data;
      } catch (error) {
        setSecondModal(true);
      }
    }
  }

  function finishihEntrance() {
    registerEntrance();
  }

  function deleteNotas(chave: string) {
    const current = nota.filter(item => item.chave_nota !== chave);
    const currentKey = entranceKeys.filter(item => item != chave);
    setNota(current);
    setEntranceKeys(currentKey);
  }

  // useEffect(() => {
  //   // console.log('nota', nota);
  //   // console.log('entranceKeys', entranceKeys)
  //   console.log('entrance.driver', entrance.driver)
  //   console.log('entrance.driverId', entrance.driverId)
  //   console.log('entrance.vehicle', entrance.vehicleLicense)
  //   console.log('entrance.statusDescription', entrance.statusDescription)
  // }, [entrance.driver, entrance.driverId]);

  return (
    <>
      <Head>
        <title>Orion | Cadastrar Entrada</title>
      </Head>
      <BotaoVoltar />
      <TopConfirmBtn style={{ width: '92.5%', margin: 0 }}>
        <button onClick={registerEntrance}>confirmar</button>
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
              <input type="text" ref={key} />
              <BtnPattern type="submit">incluir</BtnPattern>
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
                  value={entrance.driverId}
                  placeholder="Apenas n??meros ou X"
                  onChange={e => validateDriverId(e.target.value)}
                  onBlur={e => findDriver(e.target.value)}
                />
              </div>
              <div>
                <span>Nome</span>
                <input
                  type="text"
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
            <h6>Ve??culos</h6>
          </div>
          <ModalContainer>
            <div>
              <div>
                <span className="first">Placa Principal</span>
                <input
                  type="text"
                  value={entrance.vehicleLicense}
                  onChange={e =>
                    setEntrance({
                      ...entrance,
                      vehicleLicense: e.target.value,
                    })
                  }
                  onBlur={e => findVehicle(e.target.value)}
                />
              </div>
              <div>
                <span>Descri????o</span>
                <input
                  type="text"
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
                  <Checkbox onChange={() => setVisible(!visible)} />
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
                      onChange={e =>
                        setEntrance({
                          ...entrance,
                          firstHaulage: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <span className="second">Reboque 2</span>
                    <input
                      type="text"
                      className="description"
                      onChange={e =>
                        setEntrance({
                          ...entrance,
                          secondHaulage: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <span>Reboque 3</span>
                    <input
                      type="text"
                      onChange={e =>
                        setEntrance({
                          ...entrance,
                          thirdHaulage: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    {/* <span>Descri????o</span>
                            <input type="text" className="description"/> */}
                  </div>
                </div>
              </>
            )}
          </ModalContainer>
        </Section>
        <Section>
          <h6>Dados de Chegada e Sa??da</h6>
          <FormContainer>
            <Column>
              <div>
                <span>Data Chegada</span>
                <input
                  type="date"
                  defaultValue={format(new Date(), 'yyyy-MM-dd')}
                  onChange={e => {
                    setDataEntrada(e.target.value), setHasChanged(true);
                  }}
                />
              </div>
              <div>
                <span>Data Sa??da</span>
                <input
                  type="date"
                  className={!ableInput ? '' : 'disabled'}
                  defaultValue={
                    !ableInput ? format(new Date(), 'yyyy-MM-dd') : ''
                  }
                  onFocus={() => setAbleInput(false)}
                  onChange={e => {
                    setDataSaida(e.target.value), setHasSChanged(true);
                  }}
                />
              </div>
            </Column>
            <Column>
              <div>
                <span>Hora Chegada</span>
                <input
                  type="time"
                  defaultValue={format(new Date(), 'HH:mm')}
                  onChange={e => {
                    setArrivalTime(e.target.value), setHasChanged(true);
                  }}
                />
              </div>
              <div>
                <span>Hora Sa??da</span>
                <input
                  type="time"
                  className={!ableInput ? '' : 'disabled'}
                  onChange={e => {
                    setExitTime(e.target.value), setHasSChanged;
                  }}
                  onFocus={() => setAbleInput(false)}
                />
              </div>
            </Column>
            <Column>
              <div>
                <span>Peso Carregado</span>
                <input
                  onChange={e =>
                    setEntrance({
                      ...entrance,
                      loadedWeight: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <span>Peso Vazio</span>
                <input
                  onChange={e =>
                    setEntrance({
                      ...entrance,
                      emptyWeight: Number(e.target.value),
                    })
                  }
                  className={!ableInput ? '' : 'disabled'}
                  onFocus={() => setAbleInput(false)}
                />
              </div>
            </Column>
            <Column style={{ justifyContent: 'space-between' }}>
              <div style={{ justifyContent: 'center' }}>
                <span>UM</span>
                <select
                  onChange={e =>
                    setEntrance({
                      ...entrance,
                      measure: e.target.value,
                    })
                  }
                >
                  <option value="Kg">Kg</option>
                  <option value="Ton">Ton</option>
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
                  disabled={
                    exitDate === undefined && entrance.emptyWeight === 0
                      ? true
                      : false
                  }
                  onClick={() => {
                    setStatus(2),
                      setEntranceFinished(true),
                      setThirdModal(true);
                  }}
                  type="button"
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
                <th>N??mero Nota Fiscal</th>
                <th>S??rie</th>
                <th>Data Emiss??o</th>
                <th>Status Portaria</th>
                <th>Data Entrada</th>
                <th>Hora Entrada</th>
                <th>Data Sa??da</th>
                <th>Hor??rio Sa??da</th>
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
      {visibleModal && (
        <DriverModal
          entrance={entrance}
          setEntrance={setEntrance}
          modalHandler={modalHandler}
        />
      )}
      {secondModal && (
        <VehicleModal
          entrance={entrance}
          setEntrance={setEntrance}
          secondModalHandler={secondModalHandler}
        />
      )}
      {thirdModal && (
        <FinishModal
          thirdModalHandler={thirdModalHandler}
          setStatus={setStatus}
          finishihEntrance={finishihEntrance}
          setEntranceFinished={setEntranceFinished}
        />
      )}
    </>
  );
}

CadastrarEntrada.auth = true;
