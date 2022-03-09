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
} from '../style';

export default function InformacoesFiscais() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

  const [register, setRegister] = useState({ ...router.query });

  function inputHandler(evt: any) {
    const value = evt.target.value;
    setRegister({
      ...register,
      [evt.target.id]: value,
    });
  }

  console.log('router.query 3/5', router.query);

  useEffect(() => {
    console.log('register', register);
  }, [register]);

  return (
    <>
      <Head>
        <title>Orion | Informações Fiscais - Produtos</title>
      </Head>
      <BotaoVoltar />
      <h2>Cadastro de Produtos</h2>
      <h4>Etapa 3/5 - Informações Fiscais</h4>
      <MainPage>
        <UMStyles>
          <div>
            <label htmlFor="ncm">NCM</label>
            <input type="text" id="ncm" onChange={inputHandler} />
          </div>
          <div>
            <label htmlFor="fci">FCI</label>
            <input type="text" id="fci" onChange={inputHandler} />
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
          height: '50%',
        }}
      >
        <AdvanceBtn
          onClick={() =>
            router.push({
              pathname: '/produtos/imagem',
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

InformacoesFiscais.auth = true;
