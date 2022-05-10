import React, { useCallback, useState, useEffect } from 'react';
import BotaoVoltar from '@components/BotaoVoltar';
import { Table, ButtonStyle } from './style';
import { useSession } from 'next-auth/client';
import { Checkbox } from '@material-ui/core';
import * as perfil from '@services/perfis';
import * as planos from '@services/planos';
import Head from 'next/head';
import { ChevronDown, ChevronUp } from '@geist-ui/react-icons';
import { useRouter } from 'next/router';
import { useToasts } from '@geist-ui/react';
import { accountsResources } from '@utils/permissions-labels';
import {
  initialState,
  initial,
  initialStateEntrada,
  initialStateB,
  availableResources,
} from '@utils/initial-states';
import Perfis from './perfis';

export default function PerfilCadastro() {
  const router = useRouter();
  const [session] = useSession();
  const [, setToast] = useToasts();
  // modais
  const [nfeModal, setNfeModal] = useState(false);
  const [cteModal, setCteModal] = useState(false);
  const [nfseModal, setNfseModal] = useState(false);
  const [entranceModal, setEntranceModal] = useState(false);
  const [usersModal, setUsersModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [certificadoVisible, setCertificadoVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [companyModal, setCompanyModal] = useState(false);
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

  const [availableApps, setAvailableApps] = useState({ ...availableResources });
  const [profileApp, setProfileApp] = useState<number[]>([]);

  async function getAccountResources() {
    const response = await planos.getAccountById(Number(router.query.planoId));
    const data = response.data.aplicacoes;
    const apps: [] = data.map(item => item.categoria);
    let currentApps;
    for (let i = 0; i < apps.length; i++) {
      currentApps = accountsResources.find(item => item === apps[i]);
      const accountApps = availableApps;
      accountApps[currentApps] = true;
      setAvailableApps(accountApps);
    }
  }

  useEffect(() => {
    getAccountResources();
  }, []);

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
        availableApps={availableApps}
        gatherData={gatherData}
        nfeModal={nfeModal}
        setNfeModal={setNfeModal}
        isNfe={isNfe}
        setIsNfe={setIsNfe}
        cteModal={cteModal}
        setCteModal={setCteModal}
        isCte={isCte}
        setIsCte={setIsCte}
        nfseModal={nfseModal}
        setNfseModal={setNfseModal}
        isNfse={isNfse}
        setIsNfse={setIsNfse}
        isEntrance={isEntrance}
        setIsEntrance={setIsEntrance}
        entranceModal={entranceModal}
        setEntranceModal={setEntranceModal}
        profileModal={profileModal}
        setProfileModal={setProfileModal}
        isProfile={isProfile}
        setIsProfile={setIsProfile}
        usersModal={usersModal}
        setUsersModal={setUsersModal}
        isUser={isUser}
        setIsUser={setIsUser}
        visible={visible}
        setVisible={setVisible}
        isCnpj={isCnpj}
        setIsCnpj={setIsCnpj}
        certificadoVisible={certificadoVisible}
        setCertificadoVisible={setCertificadoVisible}
        isCertificate={isCertificate}
        setIsCertificate={setIsCertificate}
        companyModal={companyModal}
        setCompanyModal={setCompanyModal}
        isCompanyConfig={isCompanyConfig}
        setIsCompanyConfig={setIsCompanyConfig}
      />
    </>
  );
}

PerfilCadastro.auth = true;
