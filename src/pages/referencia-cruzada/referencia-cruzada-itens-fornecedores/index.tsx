import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { PlusSquare} from '@geist-ui/react-icons';
import { Pages } from '@styles/pages';
import Pagination from '@material-ui/lab/Pagination';
import { useRouter } from 'next/router';
import { TableGrid } from '@styles/tableStyle';
import Popover from '@components/Popover';
import BotaoVoltar from '@components/BotaoVoltar';
import * as request from '@services/referencia-cruzada';
import { ICreateReferenciaCruzada, IDados, IGatheredDados } from '@services/referencia-cruzada/types';
import { CollumHide, IconBtn, InfoFornecedor } from './style';
import DeleteModal from './modal';
import { useFiltro } from '@contexts/filtro-referencia-cruzada';
import Filtro from '@components/Filtro-Referencia-Cruzada/Filter-Modal';
import LoadAndGetData from '@components/LoadAndGetData';
import { AddBtn } from '@styles/buttons';
import { ImportTableData } from '@pages/itens/style';
import { InitialDadosRef } from '@utils/filtros/colunas/colunas_referencia_cruzada';


export interface IData {
  option: JSX.Element;
  codigo_fornecedor?: string;
  item_fornecedor?: string;
  um_fornecedor?: string;
  item_cliente?: string;
  um_cliente?: string;
  fator_conversao?: number;
  data_hora_insert?: Date;
  data_hora_update?: Date;
  user_insert?: number;
  user_update?: number;
}

export default function CadastroReferenciaCruzada() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const [dataId, setDataId] = useState(0);
  const { dadosRefCruzada  } = useFiltro();
  const [dataActive, setDataActive] = useState(false);
  const [columnData, setColumnData] = useState({} as ICreateReferenciaCruzada);
  const [appData, setAppData] = useState<IDados[]>([]);
  const [mainData, setMainData] = useState({
    id_empresa: Number(session?.usuario.empresa.id),
    codigo_pessoa: Number(router?.query?.codigo_pessoa),
    cnpj: router?.query?.cnpj,
    nome: router?.query?.nome,
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const getRefcAndTotalPages = useCallback(async () => {
    try {
      const response = await request.GetReferenciaCruzada(
        dadosRefCruzada,
        Number(router.query.codigo_pessoa),
        page
      );
      const { ReferenciasCruzadas } = response.data;

      setAppData(ReferenciasCruzadas);
      console.log('appData', ReferenciasCruzadas)
      setQuantityPage(Math.ceil(ReferenciasCruzadas.length / 8));
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }, [page, dadosRefCruzada]);
  useEffect(() => {
    getRefcAndTotalPages();
  }, [page, dadosRefCruzada]);
  
  useEffect(() => {
    if (page > quantityPage) {
      setPage(1);
    }
  }, [quantityPage, page, dadosRefCruzada]);
  
  async function saveChanges() {
    const newData = appData.filter(item => item.active);
    try {
      newData.forEach(async data => {
        try {

          if (data.item_fornecedor.length === 0 || data.item_fornecedor === '---') {
            setToast({
              text: 'O Campo Item Fornecedor precisa estar preenchido, por favor verifique !',
              type: 'warning',
            });
            return
          }
          if (data.item_fornecedor.length > 60) {
            setToast({
              text: 'O limite do campo Item Fornecedor foi ultrapassado, por favor verifique !',
              type: 'warning',
            });
            return
          }
          if (data.um_fornecedor.length === 0 || data.um_fornecedor === '---' ) {
            setToast({
              text: 'O Campo UM Fornecedor precisa estar preenchido, por favor verifique !',
              type: 'warning',
            });
            return
          }
          if (data.um_fornecedor.length > 2) {
            console.log('data.um_fornecedor.length', data.um_fornecedor.length)
            setToast({
              text: 'O Campo UM Fornecedor só aceita dois digitos',
              type: 'warning',
            });
            return
          }
          if (data.item_cliente.length === 0 || data.item_cliente === '---') {
            setToast({
              text: 'O Campo Item Cliente precisa estar preenchido, por favor verifique !',
              type: 'warning',
            });
            return
          }
          if (data.item_cliente.length > 60) {
            setToast({
              text: 'O limite do campo Item Cliente foi ultrapassado, por favor verifique !',
              type: 'warning',
            });
            return
          }
          if (data.um_cliente.length === 0 || data.um_cliente === '---') {
            setToast({
              text: 'O Campo UM Fornecedor precisa estar preenchido, por favor verifique !',
              type: 'warning',
            });
            return
          }
          if (data.um_cliente.length > 5) {
            setToast({
              text: 'O Campo UM cliente só aceita cinco digitos',
              type: 'warning',
            });
            return
          }
          // post no banco de dados

          await request.CreateReferenciaCruzada({
            codigo_fornecedor: Number(mainData.codigo_pessoa),
            ...data,
          });
          setToast({
            text: 'Cadastro concluído',
            type: 'success',
          });
          LoadAndGetData(setLoading, getRefcAndTotalPages);
        } catch (error) {
          setToast({
            text: 'Houve duplicidade de registros, por favor verifique !',
            type: 'warning',
          });
        }
      });
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }
  
  const gatheredData = useMemo(() => {
    const allData: any[] = [];
    if (appData) {
      appData.forEach((item, i) => {
        allData.push({
          ...item,
          // active: item.id && dataActive,
          option: (
            <Popover
              num={i}
              quant={2}
              content={[
                {
                  optionName: 'Editar',
                  onClick: () => {
                    router.push({
                      pathname: '/atualizar-referencia-cruzada',
                      query: {
                        codigo_pessoa: Number(item.codigo_pessoa),
                        nome: item.nome,
                        id: item.id
                        // app: item.aplicacao,
                      },
                    });
                    item.active = true;
                  },
                  className: 'able',
                },
                {
                  optionName: 'Excluir',
                  onClick: () => {
                    setVisibleModal(true), setDataId(item.id);
                  },
                  className: 'able',
                },
              ]}
            />
          ),
        });
      });
    }
    return allData;
  }, [appData]);
  async function getValidColumns() {
    const newAppData = [...appData];
    console.log('newAppData', newAppData)
    newAppData.push({ ...InitialDadosRef });
    setAppData(newAppData);
  }
  return (
    <>
      <Head>
        <title>Orion |Refer. Cruzada de Itens - Fornecedor </title>
      </Head>
      <BotaoVoltar />
      <h2>Refer. Cruzada de Itens - Fornecedor</h2>
      {visibleModal && (
        <DeleteModal
          setVisibleModal={setVisibleModal}
          data={appData}
          setData={setAppData}
          id={dataId}
        />
      )}
      <ImportTableData>
        <h5 onClick={() => router.push('/upload-arquivos-referencia-cruzada')}>Importar dados</h5>
      </ImportTableData>
      <InfoFornecedor>
        <h5>Fornecedor: {`${router?.query?.codigo_pessoa} ${router?.query?.nome}`}</h5>
      </InfoFornecedor>
      <AddBtn style={{ gap: '10px' }}>
        <Filtro data={dadosRefCruzada}/>
        <button onClick={() => saveChanges()}>Salvar</button>
      </AddBtn>
      <TableGrid>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Item Fornecedor</th>
              <th>UM Fornecedor</th>
              <th>Item Cliente</th>
              <th>UM Cliente</th>
              <th>Fator Conversão</th>
            </tr>
          </thead>
          <tbody>
            {gatheredData.map((item: IGatheredDados, i: number) => (
              <CollumHide key={i}>
                <td>{item.option}</td>
                <td>
                  <input
                    type="text"
                    value={item.item_fornecedor}
                    name="item_fornecedor"
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].item_fornecedor = e.target.value;
                      
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td >
                  <input
                    type="text"
                    width={2}
                    value={item.um_fornecedor}
                    name="um_fornecedor"
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].um_fornecedor = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td >
                  <input
                    type="text"
                    value={item.item_cliente}
                    name="item_cliente"
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].item_cliente = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.um_cliente}
                    name="um_cliente"
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].um_cliente = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td >
                  <input
                    type="number"
                    value={item.fator_conversao}
                    name="fator_conversao"
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].fator_conversao = Number(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td></td>
              </CollumHide>
            ))}
          </tbody>
        </table>
        <IconBtn>
          <PlusSquare onClick={() => getValidColumns()} />
        </IconBtn>
      </TableGrid>
      
      <Pages>
        <Pagination
          onChange={handleChange}
          count={quantityPage}
          shape="rounded"
        />
      </Pages>
    </>
  );
}

CadastroReferenciaCruzada.auth = true;
