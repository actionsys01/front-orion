import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Loader from '@components/Loader';
import * as companyRequest from '@services/empresas';
import * as categoriesRequest from '@services/cadastros';
import DadosGeraisProdutos from './dados-gerais';
import PesosMedidas from './pesos-medidas';
import InformacoesFiscais from './informacoes-fiscais';
import ImagemProduto from './imagem';
import CodigosCategoria from './codigos-categoria';
import { IProdutos } from '@services/produtos/types';
import { productsPageWayBack } from './utils';

export default function CadastrarProdutos() {
  const [session] = useSession();

  const [tab, setTab] = useState<
    | 'DadosGerais'
    | 'PesosMedidas'
    | 'InformacoesFiscais'
    | 'Imagem'
    | 'CodigoCategoria'
  >('DadosGerais');

  const [register, setRegister] = useState({
    empacotado: false,
    controle_rastro: false,
    sku: 0,
    um_peso: 'KG',
    um_volume: 'm3',
  } as IProdutos);

  const [requestId, setRequestId] = useState(0);
  const [dataId, setDataId] = useState(0);
  const [isPageBack, setIsPageBack] = useState({ ...productsPageWayBack });

  async function getCompanyCategoryData() {
    try {
      const response = await companyRequest.getCompanyById(
        Number(session?.usuario.empresa.id),
      );
      const data = response.data.categoria_id;
      const categoryId = data
        .filter(item => item.cod_categoria === 'Geral')
        .map(i => i.id);
      console.log('categoryId', categoryId);
      setDataId(categoryId);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCompanyCategoryData();
  }, []);

  useEffect(() => {
    console.log('register', register);
  }, [register]);

  useEffect(() => {
    console.log('requestId', requestId);
  }, [requestId]);

  useEffect(() => {
    console.log('dataId', dataId);
  }, [dataId]);

  return (
    <>
      <Head>
        <title>Orion | Cadastrar Produtos</title>
      </Head>
      <h2>Cadastro de Produtos</h2>
      <h4></h4>
      {tab === 'DadosGerais' && (
        <DadosGeraisProdutos
          register={register}
          setRegister={setRegister}
          setRequestId={setRequestId}
          setTab={setTab}
          isPageBack={isPageBack}
        />
      )}
      {tab === 'PesosMedidas' && (
        <PesosMedidas
          register={register}
          setRegister={setRegister}
          requestId={requestId}
          setTab={setTab}
          isPageBack={isPageBack}
          setIsPageBack={setIsPageBack}
        />
      )}
      {tab === 'InformacoesFiscais' && (
        <InformacoesFiscais
          register={register}
          setRegister={setRegister}
          setTab={setTab}
          requestId={requestId}
          isPageBack={isPageBack}
          setIsPageBack={setIsPageBack}
        />
      )}
      {tab === 'Imagem' && (
        <ImagemProduto
          setTab={setTab}
          requestId={requestId}
          isPageBack={isPageBack}
          setIsPageBack={setIsPageBack}
        />
      )}
      {tab === 'CodigoCategoria' && dataId != 0 && (
        <CodigosCategoria
          register={register}
          setRegister={setRegister}
          requestId={requestId}
          dataId={dataId}
          setTab={setTab}
          isPageBack={isPageBack}
          setIsPageBack={setIsPageBack}
        />
      )}
    </>
  );
}

CadastrarProdutos.auth = true;
