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
import { UploadCloud } from '@geist-ui/react-icons';
import Loader from '@components/Loader';
import { BottomConfirmBtn } from '@styles/buttons';
import {
  MainPage,
  AdvanceBtn,
  UMStyles,
  TextDiviser,
  TripleSelectLine,
  ImageBoxStyle,
} from '../style';

export default function ImagemProduto() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

  const [register, setRegister] = useState({ ...router.query });

  console.log('router.query 4/5', router.query);

  return (
    <>
      <Head>
        <title>Orion | Imagem - Produtos</title>
      </Head>
      <BotaoVoltar />
      <h2>Cadastro de Produtos</h2>
      <h4>Etapa 4/5 - Imagem</h4>
      <MainPage>
        <ImageBoxStyle>
          <UploadCloud />
          <p>Nenhum arquivo selecionado</p>
          <BottomConfirmBtn>
            <button>Upload</button>
          </BottomConfirmBtn>
        </ImageBoxStyle>
      </MainPage>
      <BottomConfirmBtn style={{ justifyContent: 'flex-end' }}>
        <AdvanceBtn
          onClick={() =>
            router.push({
              pathname: '/produtos/codigos-categoria',
              query: register,
            })
          }
        >
          Avançar
        </AdvanceBtn>
      </BottomConfirmBtn>
    </>
  );
}

ImagemProduto.auth = true;
