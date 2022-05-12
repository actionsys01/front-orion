import React, { useState} from 'react';
import BotaoVoltar from '@components/BotaoVoltar';
import { ButtonStyle } from './style';
import { useSession } from 'next-auth/client';
import * as perfil from '@services/perfis';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useToasts } from '@geist-ui/react';
import {
  initialState,
  initial,
  initialStateEntrada,
  initialStateB,
} from '@utils/initial-states';
import { initialStates } from './utils/initialStates';
import Perfis from './perfis';

export default function PerfilCadastro() {
  const router = useRouter();
  const [session] = useSession();
  const [, setToast] = useToasts();
  // modais
  const [visible, setVisible] = useState({ ...initialStates });
  // checkbox
  const [isNfe, setIsNfe] = useState({ ...initialState });
  const [isCte, setIsCte] = useState({ ...initialStateB });
  const [isCnpj, setIsCnpj] = useState({ ...initial });
  const [isCertificate, setIsCertificate] = useState({ ...initial });
  const [isUser, setIsUser] = useState({ ...initial });
  const [isProfile, setIsProfile] = useState({ ...initial });
  const [isEntrance, setIsEntrance] = useState({ ...initialStateEntrada });
  const [isNfse, setIsNfse] = useState({ ...initialStateB });
  const [isCompanyConfig, setIsCompanyConfig] = useState(false);
  const [profileApp, setProfileApp] = useState<number[]>([]);



  const gatherData = (e: any) => {
    const findProfileApp = profileApp.find(value => value === Number(e));

    if (!findProfileApp) {
      setProfileApp(state => [...state, Number(e)]);
      return;
    }
    setProfileApp(state => state.filter(value => value !== e));
  };

  async function createProfile() {
    try {
      if (!profileApp.length) {
        setToast({
          text: 'Por favor, selecione ao menos uma permissão',
          type: 'warning',
        });
        return;
      }
      await perfil.criar({
        name: String(router.query.nome),
        descricao: String(router.query.descricao),
        permissions: profileApp,
        empresa_id: Number(session?.usuario.empresa.id),
      });
    } catch (error) {
      console.log(error);
    }
    router.push({ pathname: '/perfil-acesso' });
  }

  return (
    <>
      <Head>
        <title>Orion | Perfil de Cadastro</title>
      </Head>
      <BotaoVoltar />
      <h2>Cadastro de Perfil</h2>
      <ButtonStyle>
        <button type="button" className="btn" onClick={createProfile}>
          Confirmar
        </button>
      </ButtonStyle>
      <Perfis
        gatherData={gatherData}
        isNfe={isNfe}
        setIsNfe={setIsNfe}
        isCte={isCte}
        setIsCte={setIsCte}
        isNfse={isNfse}
        setIsNfse={setIsNfse}
        isEntrance={isEntrance}
        setIsEntrance={setIsEntrance}
        isProfile={isProfile}
        setIsProfile={setIsProfile}
        isUser={isUser}
        setIsUser={setIsUser}
        visible={visible}
        setVisible={setVisible}
        isCnpj={isCnpj}
        setIsCnpj={setIsCnpj}
        isCertificate={isCertificate}
        setIsCertificate={setIsCertificate}
        isCompanyConfig={isCompanyConfig}
        setIsCompanyConfig={setIsCompanyConfig}
      />
    </>
  );
}

PerfilCadastro.auth = true;
