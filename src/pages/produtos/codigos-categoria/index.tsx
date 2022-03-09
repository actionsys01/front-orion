import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import Loader from '@components/Loader';
import { BottomConfirmBtn } from '@styles/buttons';
import {
  MainPage,
  AdvanceBtn,
  UMStyles,
  TextDiviser,
  TripleSelectLine,
  CategoryCodesStyles,
} from '../style';

export default function CodigosCategoria() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

  console.log('router.query 5/5', router.query);

  return (
    <>
      <Head>
        <title>Orion | Códigos de Categoria - Produtos</title>
      </Head>
      <BotaoVoltar />
      <h2>Cadastro de Produtos</h2>
      <h4>Etapa 5/5 - Códigos de Categoria</h4>
      <MainPage
        style={{ justifyContent: 'flex-start', paddingInlineStart: '25px' }}
      >
        <CategoryCodesStyles>
          <label htmlFor="cod_categoria_1">Cód. Categoria 1</label>
          <input type="text" id="cod_categoria_1" />
          <label htmlFor="cod_categoria_2">Cód. Categoria 2</label>
          <input type="text" id="cod_categoria_2" />
          <label htmlFor="cod_categoria_3">Cód. Categoria 3</label>
          <input type="text" id="cod_categoria_3" />
          <label htmlFor="cod_categoria_4">Cód. Categoria 4</label>
          <input type="text" id="cod_categoria_4" />
          <label htmlFor="cod_categoria_5">Cód. Categoria 5</label>
          <input type="text" id="cod_categoria_5" />
        </CategoryCodesStyles>
      </MainPage>
      <BottomConfirmBtn style={{ justifyContent: 'flex-end' }}>
        <AdvanceBtn>Avançar</AdvanceBtn>
      </BottomConfirmBtn>
    </>
  );
}

CodigosCategoria.auth = true;
