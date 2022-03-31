import React, {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import { useRouter } from 'next/router';
import Loader from '@components/Loader';
import { BottomConfirmBtn } from '@styles/buttons';
import { IConfigData } from '@services/cadastros/types';
import * as categoriesRequest from '@services/cadastros';
import * as request from '@services/itens';
import { IProdutos } from '@services/itens/types';
import {
  MainPage,
  AdvanceBtn,
  CategoryCodesStyles,
} from '@pages/itens/style';
import TableModalDetalhes from './modal';
import app from 'next/app';

interface IDetails {
  register: IProdutos;
  setRegister: Dispatch<SetStateAction<IProdutos>>;
  categoryId: number;
}

export const inputValues = {
  input_1: '',
  input_2: '',
  input_3: '',
  input_4: '',
  input_5: '',
};

const inputId = {
  input_1: '',
  input_2: '',
  input_3: '',
  input_4: '',
  input_5: '',
};

const InputToggle = {
  input_1: false,
  input_2: false,
  input_3: false,
  input_4: false,
  input_5: false,
};

const CodigoCategoriaDetalhes = ({
  register,
  setRegister,
  categoryId,
}: IDetails) => {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();
  const [visibleModal, setVisibleModal] = useState(false);

  const [appNames, setAppNames] = useState<IConfigData[]>([]);
  const [dataId, setDataId] = useState(0);
  const [itemName, setItemName] = useState('');
  const [appValues, setAppValues] = useState({ ...inputValues });
  const [appIds, setAppIds] = useState({ ...inputId });
  const [appToggled, setAppToggled] = useState({ ...InputToggle });
  const [itemId, setItemId] = useState('');
  // const [registerId, setRegisterId] = useState(`cod_categoria_${1}`);

  async function getData() {
    const response = await categoriesRequest.GetCategoryByCode(
      Number(categoryId),
      [],
    );
    const data = response.data;
    const ordered = data.sort(function (a, b) {
      return a.id - b.id;
    });
    const finalData = ordered.slice(0, 5);
    setAppNames(finalData);
  }

  useEffect(() => {
    getData();
  }, []);

  const showData = useCallback(async () => {
    const response = await categoriesRequest.GetDadosById(Number(itemId));
    const data = response.data;
    for (let i = 2; i <= 9; i++) {
      const teste = Object.entries(data)[i];
      if (teste && teste[1] !== 0 && teste[1] !== null && teste[1] !== '---') {
        setAppValues({
          ...appValues,
          [itemName]: teste[1],
        });
        break;
      }
    }
  }, [itemId]);

  async function updateProduct() {
    try {
      await request.UpdateProduct({
        id: register.id,
        id_empresa: Number(session?.usuario.empresa.id),
        sku: register.sku,
        user_update: Number(session?.usuario.id),
        cod_categoria_1: appValues.input_1,
        cod_categoria_2: appValues.input_2,
        cod_categoria_3: appValues.input_3,
        cod_categoria_4: appValues.input_4,
        cod_categoria_5: appValues.input_5,
      });
      setToast({
        text: 'Atualização concluída com sucesso',
        type: 'success',
      });
      // router.push('/produtos');
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }

  useEffect(() => {
    showData();
  }, [itemId]);

  useEffect(() => {
    console.log('appValues', appToggled);
  }, [appToggled]);

  return (
    <>
      {visibleModal && (
        <TableModalDetalhes
          id={dataId}
          setVisibleModal={setVisibleModal}
          setAppIds={setAppIds}
          appIds={appIds}
          itemName={itemName}
          itemId={itemId}
          setItemId={setItemId}
          appToggled={appToggled}
          setAppToggled={setAppToggled}
        />
      )}
      <MainPage
        style={{ justifyContent: 'flex-start', paddingInlineStart: '25px' }}
      >
        <CategoryCodesStyles>
          <label htmlFor={appNames[0]?.aplicacao}>
            {appNames[0]?.aplicacao}
          </label>
          <input
            type="text"
            id={appNames[0]?.aplicacao}
            value={
              !appToggled.input_1
                ? register?.cod_categoria_1
                : appValues.input_1
            }
            onFocus={
              router.query.action === 'visualizar'
                ? () => ''
                : () => {
                    setDataId(appNames[0]?.id),
                      setVisibleModal(true),
                      setItemName('input_1');
                  }
            }
            readOnly
          />
          <label htmlFor="cod_categoria_2">{appNames[1]?.aplicacao}</label>
          <input
            type="text"
            id={appNames[1]?.aplicacao}
            value={
              !appToggled.input_2
                ? register?.cod_categoria_2
                : appValues.input_2
            }
            onFocus={
              router.query.action === 'visualizar'
                ? () => ''
                : () => {
                    setDataId(appNames[1]?.id), setVisibleModal(true);
                    setItemName('input_2');
                  }
            }
            readOnly
          />
          <label htmlFor="cod_categoria_3">{appNames[2]?.aplicacao}</label>
          <input
            type="text"
            id={appNames[2]?.aplicacao}
            value={
              !appToggled.input_3
                ? register?.cod_categoria_3
                : appValues.input_3
            }
            name="3"
            onFocus={
              router.query.action === 'visualizar'
                ? () => ''
                : () => {
                    setDataId(appNames[2]?.id),
                      setVisibleModal(true),
                      setItemName('input_3');
                  }
            }
            readOnly
          />
          <label htmlFor="cod_categoria_4">{appNames[3]?.aplicacao}</label>
          <input
            type="text"
            id={appNames[3]?.aplicacao}
            value={
              !appToggled.input_4
                ? register?.cod_categoria_4
                : appValues.input_4
            }
            name="4"
            onFocus={
              router.query.action === 'visualizar'
                ? () => ''
                : () => {
                    setDataId(appNames[3]?.id),
                      setVisibleModal(true),
                      setItemName('input_4');
                  }
            }
            readOnly
          />
          <label htmlFor="cod_categoria_5">{appNames[4]?.aplicacao}</label>
          <input
            type="text"
            id={appNames[4]?.aplicacao}
            name="5"
            value={
              !appToggled.input_5
                ? register?.cod_categoria_5
                : appValues.input_5
            }
            onFocus={
              router.query.action === 'visualizar'
                ? () => ''
                : () => {
                    setDataId(appNames[4]?.id),
                      setVisibleModal(true),
                      setItemName('input_5');
                  }
            }
            readOnly
          />
        </CategoryCodesStyles>
      </MainPage>
      <BottomConfirmBtn
        style={{
          justifyContent: 'flex-end',
          display: router.query.action === 'visualizar' ? 'none' : '',
        }}
      >
        <AdvanceBtn onClick={updateProduct}>Atualizar</AdvanceBtn>
      </BottomConfirmBtn>
    </>
  );
};

export default CodigoCategoriaDetalhes;
