import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { PlusSquare, Filter } from '@geist-ui/react-icons';
import { Pages } from '@styles/pages';
import Pagination from '@material-ui/lab/Pagination';
import { useRouter } from 'next/router';
import { TableGrid } from '@styles/tableStyle';
import Popover from '@components/Popover';
import Loader from '@components/Loader';
import paginate from '@utils/paginate';
import { BtnRow } from '@styles/buttons';
import BotaoVoltar from '@components/BotaoVoltar';
import * as request from '@services/cadastros/';
import { IConfigData, IDados, IGatheredDados } from '@services/cadastros/types';
import { CollumHide, IconBtn } from './style';
import { appInitialValue } from '@utils/initial-values';
import { format } from 'date-fns';
import DeleteModal from './modal';

const initialValues = {
  chave_8: false,
  valor_date_1: false,
  valor_date_2: false,
  valor_date_3: false,
};

export default function CadastrosDados() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [quantityPage, setQuantityPage] = useState(1);
  const [visibleModal, setVisibleModal] = useState(false);
  const [columnData, setColumnData] = useState({} as IConfigData);
  const [appData, setAppData] = useState<IDados[]>([]);
  const [dates, setDates] = useState({ ...initialValues });
  const [dataActive, setDataActive] = useState(false);
  const [dataId, setDataId] = useState(0);
  const [mainData, setMainData] = useState({
    id_empresa: Number(session?.usuario.empresa.id),
    cod_categoria: router?.query?.cod,
    aplicacao: router?.query?.id,
    desc_aplicacao: router?.query?.desc,
  });

  // console.log('router.query', router.query)

  const getDadosCadastrosPages = useCallback(async () => {
    try {
      const response = await request.GetConfigById(Number(router.query.id));
      const data = response.data;
      const pageData = paginate(response.data.cadastro_dados_id);
      setColumnData(data);
      setAppData(pageData[page]);
      setQuantityPage(Math.ceil(pageData.length));
      if (!response.data.cadastro_dados_id.length) {
        getValidColumns();
      }
      data.chave_8 && setDates({ ...dates, chave_8: true });
      data.valor_date_1 && setDates({ ...dates, valor_date_1: true });
      data.valor_date_2 && setDates({ ...dates, valor_date_2: true });
      data.valor_date_3 && setDates({ ...dates, valor_date_3: true });
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamenteee',
        type: 'warning',
      });
    }
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  useEffect(() => {
    getDadosCadastrosPages();
  }, [page]);

  async function saveChanges() {
    const newData = appData.filter(item => item.active);
    console.log('newData', newData);
    try {
      await newData.forEach(async data => {
        await request.CreateDado({
          id_empresa: mainData.id_empresa,
          // cod_categoria: String(mainData.cod_categoria),
          aplicacao: Number(mainData.aplicacao),
          // desc_aplicacao: String(mainData.desc_aplicacao),
          ...data,
        });
      });
      setToast({
        text: 'Cadastro concluído',
        type: 'success',
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
          active: item.id && dataActive,
          option: (
            <Popover
              num={i}
              quant={2}
              content={[
                {
                  optionName: 'Editar',
                  onClick: () => {
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
    // console.log('allData', allData);
    return allData;
  }, [appData, dataId]);

  async function getValidColumns() {
    const newAppData = [...appData];
    newAppData.push({ ...appInitialValue });
    setAppData(newAppData);
  }

  useEffect(() => {
    if (page > quantityPage) {
      setPage(0);
    }
  }, [page, quantityPage]);

  // useEffect(() => {
  //   console.log('appData', appData);
  // }, [appData]);

  return (
    <>
      <Head>
        <title>Orion | Dados de Aplicativos</title>
      </Head>
      <BotaoVoltar />
      <h2>{`Cadastro de ${router.query.app}`} </h2>
      <BtnRow>
        <button>
          <span>
            <Filter />
          </span>
          Filtrar
        </button>
        <button onClick={() => saveChanges()}>Salvar</button>
      </BtnRow>
      {visibleModal && (
        <DeleteModal
          setVisibleModal={setVisibleModal}
          appData={appData}
          setAppData={setAppData}
          id={dataId}
        />
      )}
      <TableGrid>
        <table>
          <thead>
            {/* {columnData.map((item, i) => ( */}
            <CollumHide /* key={i} */>
              <th className="first"></th>
              <th className={!columnData.chave_1 ? 'hideSeek' : ''}>
                {columnData.chave_1}
              </th>
              <th className={!columnData.chave_2 ? 'hideSeek' : ''}>
                {columnData.chave_2}
              </th>
              <th className={!columnData.chave_3 ? 'hideSeek' : ''}>
                {columnData.chave_3}
              </th>
              <th className={!columnData.chave_4 ? 'hideSeek' : ''}>
                {columnData.chave_4}
              </th>
              <th className={!columnData.chave_5 ? 'hideSeek' : ''}>
                {columnData.chave_5}
              </th>
              <th className={!columnData.chave_6 ? 'hideSeek' : ''}>
                {columnData.chave_6}
              </th>
              <th className={!columnData.chave_7 ? 'hideSeek' : ''}>
                {columnData.chave_7}
              </th>
              <th className={!columnData.chave_8 ? 'hideSeek' : ''}>
                {columnData.chave_8}
              </th>
              <th className={!columnData.valor_string_1 ? 'hideSeek' : ''}>
                {columnData.valor_string_1}
              </th>
              <th className={!columnData.valor_string_2 ? 'hideSeek' : ''}>
                {columnData.valor_string_2}
              </th>
              <th className={!columnData.valor_string_3 ? 'hideSeek' : ''}>
                {columnData.valor_string_3}
              </th>
              <th className={!columnData.valor_string_4 ? 'hideSeek' : ''}>
                {columnData.valor_string_4}
              </th>
              <th className={!columnData.valor_string_5 ? 'hideSeek' : ''}>
                {columnData.valor_string_5}
              </th>
              <th className={!columnData.valor_string_6 ? 'hideSeek' : ''}>
                {columnData.valor_string_6}
              </th>
              <th className={!columnData.valor_string_7 ? 'hideSeek' : ''}>
                {columnData.valor_string_7}
              </th>
              <th className={!columnData.valor_string_8 ? 'hideSeek' : ''}>
                {columnData.valor_string_8}
              </th>
              <th className={!columnData.valor_string_9 ? 'hideSeek' : ''}>
                {columnData.valor_string_9}
              </th>
              <th className={!columnData.valor_string_10 ? 'hideSeek' : ''}>
                {columnData.valor_string_10}
              </th>
              <th className={!columnData.valor_number_1 ? 'hideSeek' : ''}>
                {columnData.valor_number_1}
              </th>
              <th className={!columnData.valor_number_2 ? 'hideSeek' : ''}>
                {columnData.valor_number_2}
              </th>
              <th className={!columnData.valor_number_3 ? 'hideSeek' : ''}>
                {columnData.valor_number_3}
              </th>
              <th className={!columnData.valor_number_4 ? 'hideSeek' : ''}>
                {columnData.valor_number_4}
              </th>
              <th className={!columnData.valor_number_5 ? 'hideSeek' : ''}>
                {columnData.valor_number_5}
              </th>
              <th className={!columnData.valor_date_1 ? 'hideSeek' : ''}>
                {columnData.valor_date_1}
              </th>
              <th className={!columnData.valor_date_2 ? 'hideSeek' : ''}>
                {columnData.valor_date_2}
              </th>
              <th className={!columnData.valor_date_3 ? 'hideSeek' : ''}>
                {columnData.valor_date_3}
              </th>
              <th className="first"></th>
            </CollumHide>
            {/* ))} */}
          </thead>
          <tbody>
            {gatheredData.map((item: IGatheredDados, i: number) => (
              <CollumHide key={i}>
                <td>{item.option}</td>
                <td className={!columnData.chave_1 ? 'hideSeek' : ''}>
                  <input
                    type="number"
                    value={item.chave_1}
                    name="chave_1"
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].chave_1 = Number(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!columnData.chave_2?.trim() ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.chave_2}
                    name="chave_2"
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].chave_2 = e.target.value;
                      setAppData(newAppData);
                      // setRequestData(newAppData[i].chave_2)
                    }}
                    // onFocus={() => getValidColumns()}
                  />
                </td>
                <td className={!columnData.chave_3?.trim() ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.chave_3}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].chave_3 = e.target.value;
                      setAppData(newAppData);
                      // setRequestData(newAppData[i])
                    }}
                    // onFocus={() => getValidColumns()}
                  />
                </td>
                <td className={!columnData.chave_4?.trim() ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.chave_4}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].chave_4 = e.target.value;
                      setAppData(newAppData);
                      // setRequestData(newAppData[i])
                    }}
                    // onFocus={() => getValidColumns()}
                  />
                </td>
                <td className={!columnData.chave_5?.trim() ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.chave_5}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].chave_5 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!columnData.chave_6?.trim() ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.chave_6}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].chave_6 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!columnData.chave_7?.trim() ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.chave_7}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].chave_7 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!dates.chave_8 ? 'hideSeek' : ''}>
                  <input
                    type="number"
                    value={
                      item.chave_8 &&
                      format(new Date(item.chave_8), 'dd/MM/yyyy')
                    }
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].chave_8 = new Date(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!columnData.valor_string_1 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_1}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_1 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!columnData.valor_string_2 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_2}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_2 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!columnData.valor_string_3 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_3}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_3 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!columnData.valor_string_4 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_4}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_4 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!columnData.valor_string_5 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_5}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_5 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!columnData.valor_string_6 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_6}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_6 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!columnData.valor_string_7 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_7}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_7 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!columnData.valor_string_8 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_8}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_8 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!columnData.valor_string_9 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_9}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_9 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!columnData.valor_string_10 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_10}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_10 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!columnData.valor_number_1 ? 'hideSeek' : ''}>
                  <input
                    type="number"
                    value={item.valor_number_1}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_number_1 = Number(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!columnData.valor_number_2 ? 'hideSeek' : ''}>
                  <input
                    type="number"
                    value={item.valor_number_2}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_number_2 = Number(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td
                  className={
                    !columnData.valor_number_3 /*  || item.valor_number_3 === '0' */
                      ? 'hideSeek'
                      : ''
                  }
                >
                  <input
                    type="number"
                    value={Number(item.valor_number_3)}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_number_3 = Number(e.target.value);
                      setAppData(newAppData);
                    }}
                    onFocus={() => getValidColumns()}
                  />
                </td>
                <td
                  className={
                    !columnData.valor_number_4 /* || item.valor_number_4 === '0' */
                      ? 'hideSeek'
                      : ''
                  }
                >
                  <input
                    type="number"
                    value={item.valor_number_4}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_number_4 = Number(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td
                  className={
                    !columnData.valor_number_5 /* || item.valor_number_5 === '0' */
                      ? 'hideSeek'
                      : ''
                  }
                >
                  <input
                    type="number"
                    value={item.valor_number_5}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_number_5 = Number(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!dates.valor_date_1 ? 'hideSeek' : ''}>
                  <input
                    type="Date"
                    value={
                      item.valor_date_1 &&
                      format(new Date(item.valor_date_1), 'dd/MM/yyyy')
                    }
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_date_1 = new Date(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!dates.valor_date_2 ? 'hideSeek' : ''}>
                  <input
                    type="Date"
                    value={
                      item.valor_date_2 &&
                      format(new Date(item.valor_date_2), 'dd/MM/yyyy')
                    }
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_date_2 = new Date(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!dates.valor_date_3 ? 'hideSeek' : ''}>
                  <input
                    type="Date"
                    value={
                      item.valor_date_3 &&
                      format(new Date(item.valor_date_3), 'dd/MM/yyyy')
                    }
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_date_3 = new Date(e.target.value);
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

CadastrosDados.auth = true;
