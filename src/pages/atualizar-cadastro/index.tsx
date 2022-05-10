import React, { useMemo, useState, useEffect, useCallback } from 'react';
import BotaoVoltar from '@components/BotaoVoltar';
import { Table, ButtonStyle } from '../perfil-cadastro/style';
import { useSession } from 'next-auth/client';
import { Spacer } from '@geist-ui/react';
import { Checkbox } from '@material-ui/core';
import * as perfil from '@services/perfis';
import Head from 'next/head';
import { ChevronDown, ChevronUp } from '@geist-ui/react-icons';
import { useRouter } from 'next/router';
import api from '@services/api';
import { useToasts } from '@geist-ui/react';
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
  const [nfeModal, setNfeModal] = useState<boolean>(false);
  const [cteModal, setCteModal] = useState<boolean>(false);
  const [nfseModal, setNfseModal] = useState<boolean>(false);
  const [entranceModal, setEntranceModal] = useState<boolean>(false);
  const [usersModal, setUsersModal] = useState<boolean>(false);
  const [profileModal, setProfileModal] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [certificadoVisible, setCertificadoVisible] = useState(false);
  const [companyModal, setCompanyModal] = useState(false);

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

  const handleNfeModal = useCallback(() => {
    setNfeModal(!nfeModal);
  }, [nfeModal]);
  const handleCteModal = useCallback(() => {
    setCteModal(!cteModal);
  }, [cteModal]);
  const handleNfseModal = useCallback(() => {
    setNfseModal(!nfseModal);
  }, [nfseModal]);
  const handleEntranceModal = useCallback(() => {
    setEntranceModal(!entranceModal);
  }, [entranceModal]);
  const handleUsersModal = useCallback(() => {
    setUsersModal(!usersModal);
  }, [usersModal]);
  const handleProfileModal = useCallback(() => {
    setProfileModal(!profileModal);
  }, [profileModal]);
  const certificadoModalHandler = useCallback(() => {
    setCertificadoVisible(!certificadoVisible);
  }, [certificadoVisible]);
  const modalHandler = useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  const companyModalHandler = useCallback(() => {
    setCompanyModal(!companyModal);
  }, [companyModal]);

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
      <Table>
        <div className="main">
          <header>
            <span>
              <h5>Aplicação</h5>
              <h5
                style={{
                  width: '15%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                Descrição
              </h5>
              <h5></h5>
            </span>
          </header>
          <div className="body-row">
            <div onClick={handleNfeModal} style={{ cursor: 'pointer' }}>
              <span className="line">
                <h5>Nf-e</h5>
              </span>
              <span className="line">
                <h5>Painel e Visualização de Nf-e</h5>
              </span>
              <span>
                {!nfeModal ? (
                  <ChevronDown className="icon" />
                ) : (
                  <ChevronUp className="icon" />
                )}
              </span>
            </div>
            {nfeModal && (
              <div className="modal">
                <div>
                  <span>
                    <span>
                      <Checkbox
                        value={2}
                        checked={isNfe.VISUALIZAR}
                        onChange={() => gatherData(2)}
                        onClick={() =>
                          setIsNfe({
                            ...isNfe,
                            VISUALIZAR: !isNfe.VISUALIZAR,
                          })
                        }
                      />
                    </span>
                    Visualizar
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        value={1}
                        checked={isNfe.HISTORICO}
                        onChange={() => gatherData(1)}
                        onClick={() =>
                          setIsNfe({
                            ...isNfe,
                            HISTORICO: !isNfe.HISTORICO,
                          })
                        }
                      />
                    </span>
                    Histórico de Notas
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        checked={isNfe.CIENCIA}
                        onChange={() => gatherData(3)}
                        onClick={() =>
                          setIsNfe({
                            ...isNfe,
                            CIENCIA: !isNfe.CIENCIA,
                          })
                        }
                      />
                    </span>
                    Registrar Evento - Ciência da Operação
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        checked={isNfe.CONFIRMACAO}
                        onChange={() => gatherData(4)}
                        onClick={() =>
                          setIsNfe({
                            ...isNfe,
                            CONFIRMACAO: !isNfe.CONFIRMACAO,
                          })
                        }
                      />
                    </span>
                    Registrar Evento - Confirmação da Operação
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        checked={isNfe.OPERACAO_NAO_REALIZADA}
                        onChange={() => gatherData(6)}
                        onClick={() =>
                          setIsNfe({
                            ...isNfe,
                            OPERACAO_NAO_REALIZADA:
                              !isNfe.OPERACAO_NAO_REALIZADA,
                          })
                        }
                      />
                    </span>
                    Registrar Evento - Operação Não Realizada
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        checked={isNfe.DESCONHECIMENTO}
                        onChange={() => gatherData(5)}
                        onClick={() =>
                          setIsNfe({
                            ...isNfe,
                            DESCONHECIMENTO: !isNfe.DESCONHECIMENTO,
                          })
                        }
                      />
                    </span>
                    Registrar Evento - Desconhecimento da Operação
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="body-row">
            <div onClick={handleCteModal} style={{ cursor: 'pointer' }}>
              <span className="line">
                <h5>Ct-e</h5>
              </span>
              <span className="line">
                <h5>Painel e Visualização de Ct-e</h5>
              </span>
              <span>
                {!cteModal ? (
                  <ChevronDown className="icon" />
                ) : (
                  <ChevronUp className="icon" />
                )}
              </span>
            </div>
            {cteModal && (
              <div className="modal">
                <div>
                  <span>
                    <span>
                      <Checkbox
                        checked={isCte.VISUALIZAR}
                        onChange={() => gatherData(14)}
                        onClick={() =>
                          setIsCte({
                            ...isCte,
                            VISUALIZAR: !isCte.VISUALIZAR,
                          })
                        }
                      />
                    </span>
                    Visualizar
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        checked={isCte.HISTORICO}
                        onChange={() => gatherData(13)}
                        onClick={() =>
                          setIsCte({
                            ...isCte,
                            HISTORICO: !isCte.HISTORICO,
                          })
                        }
                      />
                    </span>
                    Histórico de Notas
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        checked={isCte.IMPRIMIR}
                        onClick={() =>
                          setIsCte({ ...isCte, IMPRIMIR: !isCte.IMPRIMIR })
                        }
                        onChange={() => gatherData(15)}
                      />
                    </span>
                    Imprimir Notas
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="body-row">
            <div onClick={handleNfseModal} style={{ cursor: 'pointer' }}>
              <span className="line">
                <h5>Nfs-e</h5>
              </span>
              <span className="line">
                <h5>Painel e Visualização de Nfs-e</h5>
              </span>
              <span>
                {!nfseModal ? (
                  <ChevronDown className="icon" />
                ) : (
                  <ChevronUp className="icon" />
                )}
              </span>
            </div>
            {nfseModal && (
              <div className="modal">
                <div>
                  <span>
                    <span>
                      <Checkbox
                        value={17}
                        checked={isNfse.VISUALIZAR}
                        onClick={() =>
                          setIsNfse({
                            ...isNfse,
                            VISUALIZAR: !isNfse.VISUALIZAR,
                          })
                        }
                        onChange={() => gatherData(16)}
                      />
                    </span>
                    Visualizar
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        value={16}
                        checked={isNfse.HISTORICO}
                        onClick={() =>
                          setIsNfse({
                            ...isNfse,
                            HISTORICO: !isNfse.HISTORICO,
                          })
                        }
                        onChange={() => gatherData(17)}
                      />
                    </span>
                    Histórico de Notas
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        value={18}
                        checked={isNfse.IMPRIMIR}
                        onClick={() =>
                          setIsNfse({
                            ...isNfse,
                            IMPRIMIR: !isNfse.IMPRIMIR,
                          })
                        }
                        onChange={() => gatherData(18)}
                      />
                    </span>
                    Imprimir Notas
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="body-row">
            <div onClick={handleEntranceModal} style={{ cursor: 'pointer' }}>
              <span className="line">
                <h5>Portaria</h5>
              </span>
              <span className="line">
                <h5>Painel e Visualização de Portaria</h5>
              </span>
              <span>
                {!entranceModal ? (
                  <ChevronDown className="icon" />
                ) : (
                  <ChevronUp className="icon" />
                )}
              </span>
            </div>
            {entranceModal && (
              <div className="modal">
                <div>
                  <span>
                    <span>
                      <Checkbox
                        value={19}
                        checked={isEntrance.VISUALIZAR}
                        onChange={() => gatherData(19)}
                        onClick={() =>
                          setIsEntrance({
                            ...isEntrance,
                            VISUALIZAR: !isEntrance.VISUALIZAR,
                          })
                        }
                      />
                    </span>
                    Visualizar
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        value={20}
                        checked={isEntrance.AUTORIZAR}
                        onChange={() => gatherData(20)}
                        onClick={() =>
                          setIsEntrance({
                            ...isEntrance,
                            AUTORIZAR: !isEntrance.AUTORIZAR,
                          })
                        }
                      />
                    </span>
                    Autorizar
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        value={21}
                        checked={isEntrance.EDITAR}
                        onChange={() => gatherData(21)}
                        onClick={() =>
                          setIsEntrance({
                            ...isEntrance,
                            EDITAR: !isEntrance.EDITAR,
                          })
                        }
                      />
                    </span>
                    Editar
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        value={22}
                        checked={isEntrance.CANCELAR}
                        onChange={() => gatherData(22)}
                        onClick={() =>
                          setIsEntrance({
                            ...isEntrance,
                            CANCELAR: !isEntrance.CANCELAR,
                          })
                        }
                      />
                    </span>
                    Cancelar
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        value={23}
                        checked={isEntrance.ADICIONAR}
                        onChange={() => gatherData(23)}
                        onClick={() =>
                          setIsEntrance({
                            ...isEntrance,
                            ADICIONAR: !isEntrance.ADICIONAR,
                          })
                        }
                      />
                    </span>
                    Adicionar
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="body-row">
            <div onClick={handleProfileModal} style={{ cursor: 'pointer' }}>
              <span className="line">
                <h5>Perfis</h5>
              </span>
              <span className="line">
                <h5>Cadastro de Perfis</h5>
              </span>
              <span>
                {!profileModal ? (
                  <ChevronDown className="icon" />
                ) : (
                  <ChevronUp className="icon" />
                )}
              </span>
            </div>
            {profileModal && (
              <div className="modal">
                <div>
                  <span>
                    <span>
                      <Checkbox
                        checked={isProfile.ADICIONAR}
                        onChange={() => gatherData(11)}
                        onClick={() =>
                          setIsProfile({
                            ...isProfile,
                            ADICIONAR: !isProfile.ADICIONAR,
                          })
                        }
                      />
                    </span>
                    Cadastrar Perfil
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        checked={isProfile.EXCLUIR}
                        onChange={() => gatherData(10)}
                        onClick={() =>
                          setIsProfile({
                            ...isProfile,
                            EXCLUIR: !isProfile.EXCLUIR,
                          })
                        }
                      />
                    </span>
                    Excluir Perfil
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        checked={isProfile.EDITAR}
                        onChange={() => gatherData(12)}
                        onClick={() =>
                          setIsProfile({
                            ...isProfile,
                            EDITAR: !isProfile.EDITAR,
                          })
                        }
                      />
                    </span>
                    Editar Perfil
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="body-row">
            <div onClick={handleUsersModal} style={{ cursor: 'pointer' }}>
              <span className="line">
                <h5>Usuários</h5>
              </span>
              <span className="line">
                <h5>Cadastro de Usuários</h5>
              </span>
              <span>
                {!usersModal ? (
                  <ChevronDown className="icon" />
                ) : (
                  <ChevronUp className="icon" />
                )}
              </span>
            </div>
            {usersModal && (
              <div className="modal">
                <div>
                  <span>
                    <span>
                      <Checkbox
                        checked={isUser.ADICIONAR}
                        value={8}
                        onChange={() => gatherData(8)}
                        onClick={() =>
                          setIsUser({
                            ...isUser,
                            ADICIONAR: !isUser.ADICIONAR,
                          })
                        }
                      />
                    </span>
                    Adicionar Usuário
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        checked={isUser.EXCLUIR}
                        value={7}
                        onChange={() => gatherData(7)}
                        onClick={() =>
                          setIsUser({
                            ...isUser,
                            EXCLUIR: !isUser.EXCLUIR,
                          })
                        }
                      />
                    </span>
                    Excluir Usuário
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        checked={isUser.EDITAR}
                        value={9}
                        onChange={() => gatherData(9)}
                        onClick={() =>
                          setIsUser({
                            ...isUser,
                            EDITAR: !isUser.EDITAR,
                          })
                        }
                      />
                    </span>
                    Editar Usuário
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="body-row">
            <div onClick={modalHandler} style={{ cursor: 'pointer' }}>
              <span className="line">
                <h5>CNPJs da Empresa</h5>
              </span>
              <span className="line">
                <h5>Cadastro de CNPJs</h5>
              </span>
              <span>
                {!visible ? (
                  <ChevronDown className="icon" />
                ) : (
                  <ChevronUp className="icon" />
                )}
              </span>
            </div>
            {visible && (
              <div className="modal">
                <div>
                  <span>
                    <span>
                      <Checkbox
                        value={25}
                        checked={isCnpj.ADICIONAR}
                        onChange={() => gatherData(25)}
                        onClick={() =>
                          setIsCnpj({
                            ...isCnpj,
                            ADICIONAR: !isCnpj.ADICIONAR,
                          })
                        }
                      />
                    </span>
                    Adicionar CNPJ
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        value={24}
                        checked={isCnpj.EXCLUIR}
                        onChange={() => gatherData(24)}
                        onClick={() =>
                          setIsCnpj({
                            ...isCnpj,
                            EXCLUIR: !isCnpj.EXCLUIR,
                          })
                        }
                      />
                    </span>
                    Excluir CNPJ
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        value={26}
                        checked={isCnpj.EDITAR}
                        onChange={() => gatherData(26)}
                        onClick={() =>
                          setIsCnpj({
                            ...isCnpj,
                            EDITAR: !isCnpj.EDITAR,
                          })
                        }
                      />
                    </span>
                    Editar CNPJ
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="body-row">
            <div
              onClick={certificadoModalHandler}
              style={{ cursor: 'pointer' }}
            >
              <span className="line">
                <h5>Certificado Digital</h5>
              </span>
              <span className="line">
                <h5>Upload do Certificado Digital</h5>
              </span>
              <span>
                {!certificadoVisible ? (
                  <ChevronDown className="icon" />
                ) : (
                  <ChevronUp className="icon" />
                )}
              </span>
            </div>
            {certificadoVisible && (
              <div className="modal">
                <div>
                  <span>
                    <span>
                      <Checkbox
                        value={28}
                        checked={isCertificate.ADICIONAR}
                        onChange={() => gatherData(28)}
                        onClick={() =>
                          setIsCertificate({
                            ...isCertificate,
                            ADICIONAR: !isCertificate.ADICIONAR,
                          })
                        }
                      />
                    </span>
                    Adicionar Certificado
                  </span>
                  <span>
                    <span>
                      <Checkbox
                        value={27}
                        checked={isCertificate.EXCLUIR}
                        onChange={() => gatherData(27)}
                        onClick={() =>
                          setIsCertificate({
                            ...isCertificate,
                            EXCLUIR: !isCertificate.EXCLUIR,
                          })
                        }
                      />
                    </span>
                    Excluir Certificado
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="body-row">
            <div onClick={companyModalHandler} style={{ cursor: 'pointer' }}>
              <span className="line">
                <h5>Perfil da Empresa</h5>
              </span>
              <span className="line">
                <h5>Confirgurações de Perfil da Empresa</h5>
              </span>
              <span>
                {!companyModal ? (
                  <ChevronDown className="icon" />
                ) : (
                  <ChevronUp className="icon" />
                )}
              </span>
            </div>
            {companyModal && (
              <div className="modal">
                <div>
                  <span>
                    <span>
                      <Checkbox
                        value={29}
                        checked={isCompanyConfig}
                        onClick={() => setIsCompanyConfig(!isCompanyConfig)}
                        onChange={() => gatherData(29)}
                      />
                    </span>
                    Confirgurações de Perfil
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Table>
    </>
  );
}

AtualizarCadastro.auth = true;
