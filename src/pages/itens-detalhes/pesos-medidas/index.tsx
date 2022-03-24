import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import Loader from '@components/Loader';
import { BottomConfirmBtn } from '@styles/buttons';
import * as request from '@services/itens';
import {
  MainPage,
  AdvanceBtn,
  UMStyles,
  TextDiviser,
  TripleSelectLine,
} from '@pages/itens/style';
import { IProdutos } from '@services/itens/types';

interface IDetails {
  register: IProdutos;
  setRegister: Dispatch<SetStateAction<IProdutos>>;
}

const PesosMedidasDetalhes = ({ register, setRegister }: IDetails) => {
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
    try {
      await request.UpdateProduct({
        id: register.id,
        id_empresa: Number(session?.usuario.empresa.id),
        sku: register.sku,
        user_update: Number(session?.usuario.id),
        ...register,
      });
      setToast({
        text: 'Atualização concluída com sucesso',
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

  return (
    <>
      <MainPage>
        <UMStyles>
          <div>
            <label htmlFor="peso">Peso</label>
            <input
              type="text"
              id="peso"
              readOnly={router.query.action === 'visualizar'}
              value={register?.peso?.toString()}
              onChange={inputHandler}
            />
          </div>
          <div>
            <select
              id="um_peso"
              defaultValue="KG"
              disabled={router.query.action === 'visualizar'}
              value={register?.um_peso && register.um_peso}
              onChange={inputHandler}
            >
              <option value={register?.um_peso}>{register?.um_peso}</option>
              {register?.um_peso != 'KG' && <option value="KG">KG</option>}
              {register?.um_peso != 'TON' && <option value="TON">TON</option>}
            </select>
          </div>
          <div>
            <label htmlFor="volume">Volume</label>
            <input
              type="text"
              id="volume"
              readOnly={router.query.action === 'visualizar'}
              value={register?.volume?.toString()}
              onChange={inputHandler}
            />
          </div>
          <div>
            <select
              id="um_volume"
              onChange={inputHandler}
              disabled={router.query.action === 'visualizar'}
              defaultValue="m3"
            >
              <option value={register?.um_volume}>{register?.um_volume}</option>
              {register?.um_volume != 'm3' && <option value="m3">m3</option>}
              {register?.um_volume != 'litros' && (
                <option value="litros">Litros</option>
              )}
              {register?.um_volume != 'un' && <option value="un">Un</option>}
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
            <TripleSelectLine
              id="um_primaria"
              disabled={router.query.action === 'visualizar'}
              onChange={inputHandler}
            >
              <option defaultValue={register?.um_primaria}>
                {register?.um_primaria}
              </option>
              {register?.um_primaria != 'KG' && <option value="KG">KG</option>}
              {register?.um_primaria != 'TON' && (
                <option value="TON">TON</option>
              )}
            </TripleSelectLine>
          </div>
          <div>
            <label htmlFor="um_secundaria">UM Secundária</label>
            <TripleSelectLine
              id="um_um_secundaria"
              disabled={router.query.action === 'visualizar'}
              onChange={inputHandler}
            >
              <option defaultValue={register?.um_secundaria}>
                {register?.um_secundaria}
              </option>
              {register?.um_secundaria != 'KG' && (
                <option value="KG">KG</option>
              )}
              {register?.um_secundaria != 'TON' && (
                <option value="TON">TON</option>
              )}
            </TripleSelectLine>
          </div>
          <div>
            <label htmlFor="um_compras">UM de Compras</label>
            <TripleSelectLine
              id="um_compras"
              disabled={router.query.action === 'visualizar'}
              onChange={inputHandler}
            >
              <option value={register?.um_compras}>
                {register?.um_compras}
              </option>
              {register?.um_compras != 'KG' && <option value="KG">KG</option>}
              {register?.um_compras != 'TON' && (
                <option value="TON">TON</option>
              )}
            </TripleSelectLine>
          </div>
        </UMStyles>
      </MainPage>
      <BottomConfirmBtn
        style={{
          justifyContent: 'flex-end',
          marginTop: '120px',
          display: router.query.action === 'visualizar' ? 'none' : '',
        }}
      >
        <AdvanceBtn onClick={() => updateProduct()}>Avançar</AdvanceBtn>
      </BottomConfirmBtn>
    </>
  );
};

export default PesosMedidasDetalhes;
