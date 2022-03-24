import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import { ProdutosDetailStyle } from './style';
import { IProdutos } from '@services/itens/types';
import * as request from '@services/itens';
import Loader from '@components/Loader';
import { DadosGeraisDetalhes } from './dados-gerais';
import PesosMedidasDetalhes from './pesos-medidas';
import InformacoesFiscaisDetalhes from './informacoes-fiscais';
import ImagemDetalhes from './imagem';
import CodigoCategoriaDetalhes from './codigos-categoria';
import * as companyRequest from '@services/empresas';

export default function ProdutosDetalhes() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [tab, setTab] = useState<
    | 'DadosGerais'
    | 'PesosMedidas'
    | 'InformacoesFiscais'
    | 'Imagem'
    | 'CodigoCategoria'
  >('DadosGerais');

  const [categoryId, setCategoryId] = useState(0);
  const [register, setRegister] = useState<IProdutos>();

  console.log('router.query', router.query)

  async function getProductData() {
    try {
      const response = await request.GetProductById(Number(router.query.id));
      const data = response.data;
      setLoading(false);
      setRegister(data);
      const companyResponse = await companyRequest.getCompanyById(
        Number(session?.usuario.empresa.id),
      );
      const companyData = companyResponse.data.categoria_id;
      const categoryId = companyData
        .filter(item => item.cod_categoria === 'Geral')
        .map(i => i.id);
      setCategoryId(categoryId);
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema tente novamente',
        type: 'warning',
      });
    }
  }

  useEffect(() => {
    getProductData();
  }, []);

  // async function getCompanyCategoryData() {
  //   try {
  //   } catch (error) {
  //     console.log(error);
  //     setToast({
  //       text: 'Houve um problema tente novamente',
  //       type: 'warning',
  //     });
  //   }
  // }

  console.log('categoryId', categoryId);
  console.log('register', register)

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Orion | Detalhes Produtos</title>
      </Head>
      <BotaoVoltar />
      <ProdutosDetailStyle>
        <ul>
          <li
            onClick={() => setTab('DadosGerais')}
            className={tab === 'DadosGerais' && 'active'}
          >
            Dados Gerais
          </li>
          <li
            onClick={() => setTab('PesosMedidas')}
            className={tab === 'PesosMedidas' && 'active'}
          >
            Pesos e Medidas
          </li>
          <li
            onClick={() => setTab('InformacoesFiscais')}
            className={tab === 'InformacoesFiscais' && 'active'}
          >
            Informações Fiscais
          </li>
          <li
            onClick={() => setTab('Imagem')}
            className={tab === 'Imagem' && 'active'}
          >
            Imagem
          </li>
          <li
            onClick={() => setTab('CodigoCategoria')}
            className={tab === 'CodigoCategoria' && 'active'}
          >
            Códigos de Categoria
          </li>
        </ul>
      </ProdutosDetailStyle>
      {tab === 'DadosGerais' && (
        <DadosGeraisDetalhes register={register} setRegister={setRegister} />
      )}
      {tab === 'PesosMedidas' && (
        <PesosMedidasDetalhes register={register} setRegister={setRegister} />
      )}
      {tab === 'InformacoesFiscais' && (
        <InformacoesFiscaisDetalhes
          register={register}
          setRegister={setRegister}
        />
      )}
      {tab === 'Imagem' && (
        <ImagemDetalhes
          register={register}
          setRegister={setRegister}
          id={Number(router.query.id)}
        />
      )}
      {tab === 'CodigoCategoria' && categoryId != 0 && (
        <CodigoCategoriaDetalhes
          register={register}
          setRegister={setRegister}
          categoryId={categoryId}
        />
      )}
    </>
  );
}

ProdutosDetalhes.auth = true;
