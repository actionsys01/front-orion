import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { useSession } from 'next-auth/client';
import { ArrowLeftCircle } from '@geist-ui/react-icons';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BottomConfirmBtn } from '@styles/buttons';
import { IPageBack } from '../utils';
import * as request from '@services/itens';
import {
  MainPage,
  AdvanceBtn,
  UMStyles,
  TextDiviser,
  TripleSelectLine,
} from '../style';
import { IProdutos } from '@services/itens/types';

interface ICadastroProdutos {
  register: IProdutos;
  setRegister: Dispatch<SetStateAction<IProdutos>>;
  requestId: number;
  setTab: Dispatch<SetStateAction<string>>;
  isPageBack: IPageBack;
  setIsPageBack: Dispatch<SetStateAction<IPageBack>>;
}

const PesosMedidas = ({
  register,
  setRegister,
  requestId,
  setTab,
  isPageBack,
  setIsPageBack,
}: ICadastroProdutos) => {
  const [, setToast] = useToasts();
  const router = useRouter();
  const [session] = useSession();

  function inputHandler(evt: any) {
    const value = evt.target.value;
    setRegister({
      ...register,
      [evt.target.id]: value,
    });
  }

  async function updateProduct() {
    if (!register.um_primaria) {
      setToast({
        text: 'Favor preencher os campos obrigatórios.',
        type: 'warning',
      });
      return;
    }
    try {
      await request.UpdateProduct({
        id: requestId,
        id_empresa: Number(session?.usuario.empresa.id),
        sku: register.sku,
        user_update: Number(session?.usuario.id),
        ...register,
      });
      setTab('InformacoesFiscais');
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }

  return (
    <>
      <Head>
        <title>Orion | Pesos e Medidas - Produtos</title>
      </Head>
      <h4>Etapa 2/5 - Pesos e Medidas</h4>
      <ArrowLeftCircle
        // eslint-disable-next-line prettier/prettier
        style={{ cursor: "pointer" }}
        onClick={() => {
          setTab('DadosGerais'), setIsPageBack({ ...isPageBack, page_1: true });
        }}
      />
      <MainPage>
        <UMStyles>
          <div>
            <label htmlFor="peso">Peso</label>
            <input
              type="text"
              id="peso"
              value={register?.peso?.toString()}
              onChange={inputHandler}
            />
          </div>
          <div>
            <select
              id="um_peso"
              defaultValue="KG"
              value={register?.um_peso && register?.um_peso}
              onChange={inputHandler}
            >
              <option value="Kg">Kg</option>
              <option value="Ton">Ton</option>
              <option value="Gr">Gr</option>
            </select>
          </div>
          <div>
            <label htmlFor="volume">Volume</label>
            <input
              type="text"
              id="volume"
              value={register?.volume?.toString()}
              onChange={inputHandler}
            />
          </div>
          <div>
            <select
              id="um_volume"
              onChange={inputHandler}
              value={register?.um_volume}
              defaultValue="m3"
            >
              <option value="m3">m3</option>
              <option value="litros">Litros</option>
              <option value="un">Un</option>
            </select>
          </div>
        </UMStyles>
      </MainPage>
      <TextDiviser>
        <h5>Unidades de Medida</h5>
      </TextDiviser>
      <MainPage>
        <UMStyles style={{ gap: '45px' }}>
          <div>
            <label htmlFor="um_primaria">UM Primária</label>
            <TripleSelectLine id="um_primaria" onChange={inputHandler}>
              <option value={register?.um_primaria}>
                {register?.um_primaria}
              </option>
              <option value="KG">KG</option>
              <option value="TON">TON</option>
            </TripleSelectLine>
          </div>
          <div>
            <label htmlFor="um_secundaria">UM Secundária</label>
            <TripleSelectLine id="um_um_secundaria" onChange={inputHandler}>
              <option value={register?.um_secundaria}>
                {register?.um_secundaria}
              </option>
              <option value="KG">KG</option>
              <option value="TON">TON</option>
            </TripleSelectLine>
          </div>
          <div>
            <label htmlFor="um_compras">UM de Compras</label>
            <TripleSelectLine id="um_compras" onChange={inputHandler}>
              <option value={register?.um_compras}>
                {register?.um_compras}
              </option>
              <option value="KG">KG</option>
              <option value="TON">TON</option>
            </TripleSelectLine>
          </div>
        </UMStyles>
      </MainPage>
      <BottomConfirmBtn style={{ justifyContent: 'flex-end' }}>
        <AdvanceBtn onClick={() => updateProduct()}>Avançar</AdvanceBtn>
      </BottomConfirmBtn>
    </>
  );
};

export default PesosMedidas;
