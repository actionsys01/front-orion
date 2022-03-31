import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import Loader from '@components/Loader';
import { IConfigData, IDados, IGatheredDados } from '@services/cadastros/types';
import { ModalStyle, TableModalStyle } from './style';
import { CollumHide } from '../../../cadastros-dados/style';
import { Pages } from '@styles/pages';
import Pagination from '@material-ui/lab/Pagination';
import * as request from '@services/cadastros/';
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import { BottomConfirmBtn } from '@styles/buttons';
import { X } from '@geist-ui/react-icons';
// import Modalpaginate from '@pages/cadastrar-produtos/utils';

const initialValues = {
  chave_8: false,
  valor_date_1: false,
  valor_date_2: false,
  valor_date_3: false,
};

interface IInputValues {
  [x: string]: string;
  input_1: string;
  input_2: string;
  input_3: string;
  input_4: string;
  input_5: string;
}

interface IModal {
  id: number;
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
  appIds: IInputValues;
  setAppIds: Dispatch<SetStateAction<IInputValues>>;
  itemName: string;
  itemId: string;
  setItemId: Dispatch<SetStateAction<string>>;
}

const TableModal = ({
  id,
  setVisibleModal,
  setAppIds,
  appIds,
  itemName,
  itemId,
  setItemId,
}: IModal) => {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

  const [columnData, setColumnData] = useState({} as IConfigData);
  const [dates, setDates] = useState({ ...initialValues });
  const [appData, setAppData] = useState<IDados[]>([]);
  // const [page, setPage] = useState(0);
  // const [quantityPage, setQuantityPage] = useState(1);

  const getDadosCadastros = useCallback(async () => {
    try {
      const response = await request.GetConfigById(Number(id), []);
      const data = response.data;
      const pageData = response.data.cadastro_dados_id;
      setColumnData(data);
      setAppData(pageData);

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
  }, []);

  // const radioHandler = useCallback(evt => {
  //   console.log('evt', evt.target.value);
  //   setAppValues({...appValues, `${itemName}`: evt.target.value});
  // }, []);

  function radioHandler(evt: any) {
    setItemId(evt.target.value);
    const value = evt.target.value;
    setAppIds({
      ...appIds,
      [itemName]: value,
    });
  }

  const gatheredData = useMemo(() => {
    const allData: any[] = [];
    if (appData) {
      appData.forEach(item => {
        allData.push({
          ...item,
          option: (
            <Radio
              checked={itemId === item.id.toString()}
              value={item.id.toString()}
              onChange={radioHandler}
            />
          ),
        });
      });
    }
    return allData;
  }, [appData, itemId]);

  useEffect(() => {
    getDadosCadastros();
  }, []);

  return (
    <ModalStyle>
      <div>
        <X onClick={() => setVisibleModal(false)} />
        <TableModalStyle>
          <table>
            <thead>
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
            </thead>
            <tbody>
              {gatheredData.map((item: IGatheredDados, i: number) => (
                <CollumHide key={i}>
                  <td>
                    <FormControl>
                      <RadioGroup aria-label="control" name="row-radio">
                        <FormControlLabel label="" control={item.option} />
                      </RadioGroup>
                    </FormControl>
                  </td>
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
          {/* <Pages>
            <Pagination
              onChange={handleChange}
              count={quantityPage}
              shape="rounded"
            />
          </Pages> */}
        </TableModalStyle>
        <BottomConfirmBtn>
          <button
            style={{ marginTop: '15px' }}
            onClick={() => setVisibleModal(false)}
          >
            Salvar
          </button>
        </BottomConfirmBtn>
      </div>
    </ModalStyle>
  );
};

export default TableModal;
