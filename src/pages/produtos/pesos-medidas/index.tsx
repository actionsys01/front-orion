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

export default function PesosMedidas() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();
  const [register, setRegister] = useState({
    ...router.query,
    um_peso: 'Kg',
    um_volume: 'm2',
  } as any);

  console.log('router.query 2/5', router.query);

  function inputHandler(evt: any) {
    const value = evt.target.value;
    setRegister({
      ...register,
      [evt.target.id]: value,
    });
  }

  useEffect(() => {
    console.log('register', register);
  }, [register]);

  return (
    <>
      <Head>
        <title>Orion | Pesos e Medidas - Produtos</title>
      </Head>
      <BotaoVoltar />
      <h2>Cadastro de Produtos</h2>
      <h4>Etapa 2/5 - Pesos e Medidas</h4>
      <MainPage>
        <UMStyles>
          <div>
            <label htmlFor="peso">Peso</label>
            <input
              type="text"
              id="peso"
              value={register.peso?.toString()}
              onChange={inputHandler}
            />
          </div>
          <div>
            <select
              id="um_peso"
              defaultValue="KG"
              value={register.um_peso && register.um_peso}
              onChange={inputHandler}
            >
              <option value="KG">KG</option>
              <option value="TON">TON</option>
            </select>
          </div>
          <div>
            <label htmlFor="volume">Volume</label>
            <input
              type="text"
              id="volume"
              value={register.volume?.toString()}
              onChange={inputHandler}
            />
          </div>
          <div>
            <select id="um_volume" onChange={inputHandler} defaultValue="m2">
              <option value="m2">m2</option>
              <option value="m3">m3</option>
              <option value="un">un</option>
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
              <option defaultValue="KG"></option>
              <option value="KG">KG</option>
              <option value="TON">TON</option>
            </TripleSelectLine>
          </div>
          <div>
            <label htmlFor="um_secundaria">UM Secundária</label>
            <TripleSelectLine id="um_um_secundaria" onChange={inputHandler}>
              <option defaultValue="KG"></option>
              <option value="KG">KG</option>
              <option value="TON">TON</option>
            </TripleSelectLine>
          </div>
          <div>
            <label htmlFor="um_compras">UM de Compras</label>
            <TripleSelectLine id="um_compras" onChange={inputHandler}>
              <option value=""></option>
              <option value="KG">KG</option>
              <option value="TON">TON</option>
            </TripleSelectLine>
          </div>
        </UMStyles>
      </MainPage>
      <BottomConfirmBtn style={{ justifyContent: 'flex-end' }}>
        <AdvanceBtn
          onClick={() =>
            router.push({
              pathname: '/produtos/informacoes-fiscais',
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

PesosMedidas.auth = true;
