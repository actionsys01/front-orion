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
import {
  MainPage,
  InputDescripton,
  LabelStyle,
  InputTriple,
  LabelLineStyle,
  BoxStyle,
  TextAreaStyles
} from '../style';

export default function DadosGeraisProdutos() {
  return (
    <>
      <Head>
        <title>Orion | Dados Gerais - Produtos</title>
      </Head>
      <h2>Cadastro de Produtos</h2>
      <h4>Etapa 1/5 - Dados Gerais</h4>
      <MainPage>
        <LabelStyle>
          <label htmlFor="description">Descrição</label>
          <InputDescripton id="description" />
          <LabelLineStyle>
            <div>
              <div>
                <label htmlFor="cod_produto">Código do Produto</label>
                <InputTriple id="cod_produto" />
              </div>
              <div>
                <label htmlFor="sku">SKU</label>
                <InputTriple id="sku" />
              </div>
              <div>
                <label htmlFor="ean">EAN</label>
                <InputTriple id="ean" />
              </div>
            </div>
          </LabelLineStyle>
          <TextAreaStyles>
            <span>Informações Adicionais</span>
            <textarea name="" id="" cols={30} rows={10}></textarea>
          </TextAreaStyles>
        </LabelStyle>
        <BoxStyle>
        <div></div>
        <div></div>
        </BoxStyle>
      </MainPage>
    </>
  );
}

DadosGeraisProdutos.auth = true;
