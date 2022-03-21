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
import * as request from '@services/produtos';
import { BottomConfirmBtn } from '@styles/buttons';
import { MainPage, AdvanceBtn, UMStyles } from '@pages/produtos/style';
import { IProdutos } from '@services/produtos/types';

interface IDetails {
  register: IProdutos;
  setRegister: Dispatch<SetStateAction<IProdutos>>;
}

const InformacoesFiscaisDetalhes = ({ register, setRegister }: IDetails) => {
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
            <label htmlFor="ncm">NCM</label>
            <input
              type="text"
              id="ncm"
              readOnly={router.query.action === 'visualizar'}
              value={register?.ncm}
              onChange={inputHandler}
            />
          </div>
          <div>
            <label htmlFor="fci">FCI</label>
            <input
              type="text"
              id="fci"
              readOnly={router.query.action === 'visualizar'}
              value={register?.fci}
              onChange={inputHandler}
            />
          </div>
          <div>
            <label htmlFor="finalidade_compra">Finalidade da Compra</label>
            <select
              style={{ margin: '0', width: '220px' }}
              id="finalidade_compra"
            ></select>
          </div>
        </UMStyles>
      </MainPage>
      <BottomConfirmBtn
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          height: '65%',
          display: router.query.action === 'visualizar' ? 'none' : '',
        }}
      >
        <AdvanceBtn onClick={() => updateProduct()}>Avançar</AdvanceBtn>
      </BottomConfirmBtn>
    </>
  );
};

export default InformacoesFiscaisDetalhes;
