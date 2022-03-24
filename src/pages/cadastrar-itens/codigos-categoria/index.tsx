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
import { IPageBack, inputId, inputValues } from '../utils';
import { ArrowLeftCircle } from '@geist-ui/react-icons';
import { BottomConfirmBtn } from '@styles/buttons';
import { IConfigData } from '@services/cadastros/types';
import * as categoriesRequest from '@services/cadastros';
import * as request from '@services/itens';
import { IProdutos } from '@services/itens/types';
import { MainPage, AdvanceBtn, CategoryCodesStyles } from '../style';
import TableModal from './modal';

interface ICadastroProdutos {
  register: IProdutos;
  setRegister: Dispatch<SetStateAction<IProdutos>>;
  requestId: number;
  codeId: number;
  setTab: Dispatch<SetStateAction<string>>;
  isPageBack: IPageBack;
  setIsPageBack: Dispatch<SetStateAction<IPageBack>>;
}

const CodigosCategoria = ({
  register,
  setRegister,
  requestId,
  setTab,
  isPageBack,
  setIsPageBack,
  codeId,
}: ICadastroProdutos) => {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();
  const [visibleModal, setVisibleModal] = useState(false);

  const [appNames, setAppNames] = useState<IConfigData[]>([]);
  const [dataId, setDataId] = useState(0);
  const [itemName, setItemName] = useState('');
  const [appValues, setAppValues] = useState({ ...inputValues });
  const [appIds, setAppIds] = useState({ ...inputId });
  const [itemId, setItemId] = useState('');

  async function getData() {
    const response = await categoriesRequest.GetCategoryByCode(
      Number(codeId),
      [],
    );
    const data = response.data;
    const ordered = data.sort(function (a, b) {
      return a.id - b.id;
    });
    const finalData = ordered.slice(0, 5);
    setAppNames(finalData);
  }

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
        id: requestId,
        id_empresa: Number(session?.usuario.empresa.id),
        sku: register.sku,
        user_update: Number(session?.usuario.id),
        cod_categoria_1: appValues.input_1,
        cod_categoria_2: appValues.input_2,
        cod_categoria_3: appValues.input_3,
        cod_categoria_4: appValues.input_4,
        cod_categoria_5: appValues.input_5,
      });
      router.push('/itens');
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    showData();
  }, [itemId]);

  // useEffect(() => {
  //   console.log('appValues', appValues);
  //   console.log('itemId', itemId);
  //   console.log('register', register);
  // }, [appValues, itemId, register, appIds]);

  // useEffect(() => {
  //   console.log('appIds', appIds);
  // }, [appIds]);

  return (
    <>
      <h4>Etapa 5/5 - Códigos de Categoria</h4>
      <ArrowLeftCircle
        // eslint-disable-next-line prettier/prettier
        style={{ cursor: "pointer" }}
        onClick={() => {
          setTab('Imagem'), setIsPageBack({ ...isPageBack, page_4: true });
        }}
      />
      {visibleModal && (
        <TableModal
          id={dataId}
          setVisibleModal={setVisibleModal}
          setAppIds={setAppIds}
          appIds={appIds}
          itemName={itemName}
          itemId={itemId}
          setItemId={setItemId}
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
            value={appValues.input_1}
            onFocus={() => {
              setDataId(appNames[0]?.id),
                setVisibleModal(true),
                setItemName('input_1');
            }}
            readOnly
          />
          <label htmlFor="cod_categoria_2">{appNames[1]?.aplicacao}</label>
          <input
            type="text"
            id={appNames[1]?.aplicacao}
            value={appValues.input_2}
            onFocus={() => {
              setDataId(appNames[1]?.id), setVisibleModal(true);
              setItemName('input_2');
            }}
            readOnly
          />
          <label htmlFor="cod_categoria_3">{appNames[2]?.aplicacao}</label>
          <input
            type="text"
            id={appNames[2]?.aplicacao}
            value={appValues.input_3}
            name="3"
            onFocus={() => {
              setDataId(appNames[2]?.id),
                setVisibleModal(true),
                setItemName('input_3');
            }}
            readOnly
          />
          <label htmlFor="cod_categoria_4">{appNames[3]?.aplicacao}</label>
          <input
            type="text"
            id={appNames[3]?.aplicacao}
            value={appValues.input_4}
            name="4"
            onFocus={() => {
              setDataId(appNames[3]?.id),
                setVisibleModal(true),
                setItemName('input_4');
            }}
            readOnly
          />
          <label htmlFor="cod_categoria_5">{appNames[4]?.aplicacao}</label>
          <input
            type="text"
            id={appNames[4]?.aplicacao}
            name="5"
            value={appValues.input_5}
            onFocus={() => {
              setDataId(appNames[4]?.id),
                setVisibleModal(true),
                setItemName('input_5');
            }}
            readOnly
          />
        </CategoryCodesStyles>
      </MainPage>
      <BottomConfirmBtn style={{ justifyContent: 'flex-end' }}>
        <AdvanceBtn onClick={updateProduct}>Avançar</AdvanceBtn>
      </BottomConfirmBtn>
    </>
  );
};

export default CodigosCategoria;
