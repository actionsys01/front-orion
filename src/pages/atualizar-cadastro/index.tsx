import React, { useState, useEffect } from 'react';
import BotaoVoltar from '@components/BotaoVoltar';
import { ButtonStyle } from '../perfil-cadastro/style';
import { useSession } from 'next-auth/client';
import { Spacer } from '@geist-ui/react';
import * as perfil from '@services/perfis';
import Head from 'next/head';
import { useRouter } from 'next/router';
import api from '@services/api';
import { useToasts } from '@geist-ui/react';
import { initialStates } from '../perfil-cadastro/utils/initialStates';
import {
  tripleLabels,
  middlePermissions,
  entranceLabels,
  severalPermissions,
} from '@utils/permissions-labels';
import {
  initialState,
  initial,
  initialStateEntrada,
  initialStateB,
} from '@utils/initial-states';
import Perfis from './perfis';

type ProfilePermissions = {
  id: number;
  acao: string;
  categoria: string;
};
export default function AtualizarCadastro() {
  const router = useRouter();
  const id_profile = Number(router.query.perfilId);
  const [session] = useSession();
  const [profilePermissions, setProfilePermissions] = useState<
    ProfilePermissions[]
  >([]);
  const companyId = Number(session?.usuario.empresa.id);
  const [, setToast] = useToasts();
  // modais
  const [visible, setVisible] = useState({ ...initialStates });

  const [profileApp, setProfileApp] = useState<number[]>([]);

  const [isNfe, setIsNfe] = useState({ ...initialState });
  const [isCte, setIsCte] = useState({ ...initialStateB });
  const [isCnpj, setIsCnpj] = useState({ ...initial });
  const [isCertificate, setIsCertificate] = useState({ ...initial });
  const [isUser, setIsUser] = useState({ ...initial });
  const [isProfile, setIsProfile] = useState({ ...initial });
  const [isEntrance, setIsEntrance] = useState({ ...initialStateEntrada });
  const [isNfse, setIsNfse] = useState({ ...initialStateB });
  const [isCompanyConfig, setIsCompanyConfig] = useState(false);

  const getAllPermissions = async () => {
    try {
      const response = await api.get(`/perfil/search/${id_profile}`);
      const data = await response.data.permissoes;
      const currentPermissions: any = [];
      if (Array.isArray(data)) {
        data.map((item: any) => currentPermissions.push(item.id));
        setProfilePermissions(data);
        setProfileApp(currentPermissions);
        return currentPermissions;
      } else {
        const createArray: any = [];
        createArray.push(data);
        // console.log(`createArray`, createArray)
        createArray.map((item: any) => currentPermissions.push(item.id));
        setProfilePermissions(createArray);
        setProfileApp(currentPermissions);
      }
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema, por favor tente novamente',
        type: 'warning',
      });
    }
  };

  function getUserPermissions() {
    if (profilePermissions) {
      const nfeCheck: string[] = profilePermissions
        ?.filter(item => item.categoria === 'NFE')
        .map(permit => permit.acao);
      nfeCheck && verifyFurtherPermissions(nfeCheck, 'nfe');
      const cnpjPermissionCheck: string[] = profilePermissions
        ?.filter(item => item.categoria === 'CNPJS')
        .map(permit => permit.acao);
      cnpjPermissionCheck && verifyPermissions(cnpjPermissionCheck, 'cnpj');
      const userPermissionCheck: string[] = profilePermissions
        ?.filter(item => item.categoria === 'USUARIO')
        .map(permit => permit.acao);
      userPermissionCheck && verifyPermissions(userPermissionCheck, 'usuario');
      const profileCheck: string[] = profilePermissions
        ?.filter(item => item.categoria === 'PERFIS')
        .map(permit => permit.acao);
      profileCheck && verifyPermissions(profileCheck, 'perfis');
      const certificateCheck: string[] = profilePermissions
        ?.filter(item => item.categoria === 'CERTIFICADO')
        .map(permit => permit.acao);
      certificateCheck && verifyPermissions(certificateCheck, 'certificado');
      const entranceCheck: string[] = profilePermissions
        ?.filter(item => item.categoria === 'ENTRADA')
        .map(permit => permit.acao);
      entranceCheck && verifyFurtherPermissions(entranceCheck, 'entrada');
      const nfseCheck: string[] = profilePermissions
        ?.filter(item => item.categoria === 'NFSE')
        .map(permit => permit.acao);
      nfseCheck && verifyFurtherPermissions(nfseCheck, 'nfse');
      const cteCheck: string[] = profilePermissions
        ?.filter(item => item.categoria === 'CTE')
        .map(permit => permit.acao);
      cteCheck && verifyFurtherPermissions(cteCheck, 'cte');
      setIsCompanyConfig(
        Boolean(profilePermissions?.find(item => item.categoria === 'EMPRESA')),
      );
    }
  }

  function verifyPermissions(param, type) {
    let currentPermissions;
    for (let i = 0; i < param.length; i++) {
      currentPermissions = tripleLabels.find(item => item === param[i]);
      // console.log(`currentPermissions`, currentPermissions)
      if (currentPermissions && type === 'cnpj') {
        const permissionsFormatted = isCnpj;
        permissionsFormatted[currentPermissions] = true;
        setIsCnpj(permissionsFormatted);
      }
      if (currentPermissions && type === 'usuario') {
        const permissionsFormatted = isUser;
        permissionsFormatted[currentPermissions] = true;
        setIsUser(permissionsFormatted);
      }
      if (currentPermissions && type === 'perfis') {
        const permissionsFormatted = isProfile;
        permissionsFormatted[currentPermissions] = true;
        setIsProfile(permissionsFormatted);
      }
      if (currentPermissions && type === 'certificado') {
        const permissionsFormatted = isCertificate;
        permissionsFormatted[currentPermissions] = true;
        setIsCertificate(permissionsFormatted);
      }
    }
  }

  function verifyFurtherPermissions(param, type) {
    if (type === 'entrada') {
      let current;
      for (let i = 0; i < param.length; i++) {
        current = entranceLabels.find(item => item === param[i]);
        if (current) {
          const permissionsFormatted = isEntrance;
          permissionsFormatted[current] = true;
          setIsEntrance(permissionsFormatted);
        }
      }
    }
    if (type === 'nfe') {
      let current;
      for (let i = 0; i < param.length; i++) {
        current = severalPermissions.find(item => item === param[i]);
        if (current) {
          const permissionsFormatted = isNfe;
          permissionsFormatted[current] = true;
          setIsNfe(permissionsFormatted);
        }
      }
    } else {
      let current;
      for (let i = 0; i < param.length; i++) {
        current = middlePermissions.find(item => item === param[i]);
        if (current && type === 'nfse') {
          const permissionsFormatted = isNfse;
          permissionsFormatted[current] = true;
          setIsNfse(permissionsFormatted);
        }
        if (current && type === 'cte') {
          const permissionsFormatted = isCte;
          permissionsFormatted[current] = true;
          setIsCte(permissionsFormatted);
        }
      }
    }
  }

  useEffect(() => {
    getUserPermissions();
  }, [profilePermissions]);

  useEffect(() => {
    getAllPermissions();
  }, []);

  const gatherData = (e: any) => {
    const findProfileApp = profileApp.find(value => value === Number(e));
    if (!findProfileApp) {
      setProfileApp(state => [...state, Number(e)]);
      return;
    }
    setProfileApp(state => state.filter(value => value !== e));
  };

  async function updateProfile() {
    try {
      await perfil.atualizar({
        profileId: Number(router.query.perfilId),
        nome: String(router.query.name),
        descricao: String(router.query.descricao),
        permissoes: profileApp,
        companyId: companyId,
      });
      setToast({
        text: 'Perfil atualizado com sucesso',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema, por favor tente novamente',
        type: 'warning',
      });
    }
    router.push({ pathname: '/perfil-acesso' });
  }

  return (
    <>
      <Head>
        <title>Orion | Perfil de Cadastro</title>
      </Head>
      <BotaoVoltar />
      <h2>Atualização de Perfil</h2>
      <ButtonStyle>
        <button className="btn" onClick={updateProfile}>
          Confirmar
        </button>
      </ButtonStyle>
      <Spacer y={1} />
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

AtualizarCadastro.auth = true;
