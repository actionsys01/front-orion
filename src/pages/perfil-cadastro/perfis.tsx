import React, { useCallback, useEffect, useState } from 'react';
import { Table } from './style';
import { ChevronDown, ChevronUp } from '@geist-ui/react-icons';
import { Checkbox } from '@material-ui/core';
import { accountsResources } from '@utils/permissions-labels';
import * as planos from '@services/planos';
import { useRouter } from 'next/router';
import { availableResources } from '@utils/initial-states';

const Perfis = ({
  gatherData,
  isNfe,
  setIsNfe,
  isCte,
  setIsCte,
  isNfse,
  setIsNfse,
  isEntrance,
  setIsEntrance,
  isProfile,
  setIsProfile,
  isUser,
  setIsUser,
  visible,
  setVisible,
  isCnpj,
  setIsCnpj,
  isCertificate,
  setIsCertificate,
  isCompanyConfig,
  setIsCompanyConfig,
}) => {
  // const [availableApps, setAvailableApps] = useState({
  //   ...availableResources,
  // });

  // const router = useRouter();

  // async function getAccountResources() {
  //   console.log('first');
  //   const response = await planos.getAccountById(Number(router.query.planoId));
  //   const data = response.data.aplicacoes;
  //   const apps: [] = data.map(item => item.categoria);
  //   let currentApps;
  //   for (let i = 0; i < apps.length; i++) {
  //     currentApps = accountsResources.find(item => item === apps[i]);
  //     const accountApps = availableApps;
  //     accountApps[currentApps] = true;
  //     setAvailableApps(accountApps);
  //   }
  // }

  // useEffect(() => {
  //   getAccountResources();
  // }, [isNfe]);

  return (
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
        {/* {availableApps?.NFE && ( */}
        <div className="body-row">
          <div
            onClick={() =>
              setVisible({ ...visible, nfeModal: !visible.nfeModal })
            }
            style={{ cursor: 'pointer' }}
          >
            <span className="line">
              <h5>Nf-e</h5>
            </span>
            <span className="line">
              <h5>Painel e Visualização de Nf-e</h5>
            </span>
            <span>
              {!visible?.nfeModal ? (
                <ChevronDown className="icon" />
              ) : (
                <ChevronUp className="icon" />
              )}
            </span>
          </div>
          {visible?.nfeModal && (
            <div className="modal">
              <div>
                <span>
                  <span>
                    <Checkbox
                      value={2}
                      checked={isNfe.VISUALIZAR}
                      onClick={() =>
                        setIsNfe({
                          ...isNfe,
                          VISUALIZAR: !isNfe.VISUALIZAR,
                        })
                      }
                      onChange={() => gatherData(2)}
                    />
                  </span>
                  Visualizar
                </span>
                <span>
                  <span>
                    <Checkbox
                      value={1}
                      checked={isNfe.HISTORICO}
                      onClick={() =>
                        setIsNfe({ ...isNfe, HISTORICO: !isNfe.HISTORICO })
                      }
                      onChange={() => gatherData(1)}
                    />
                  </span>
                  Histórico de Notas
                </span>
                <span>
                  <span>
                    <Checkbox
                      value={3}
                      checked={isNfe.CIENCIA}
                      onClick={() =>
                        setIsNfe({ ...isNfe, CIENCIA: !isNfe.CIENCIA })
                      }
                      onChange={() => gatherData(3)}
                    />
                  </span>
                  Registrar Evento - Ciência da Operação
                </span>
                <span>
                  <span>
                    <Checkbox
                      value={4}
                      checked={isNfe.CONFIRMACAO}
                      onClick={() =>
                        setIsNfe({
                          ...isNfe,
                          CONFIRMACAO: !isNfe.CONFIRMACAO,
                        })
                      }
                      onChange={() => gatherData(4)}
                    />
                  </span>
                  Registrar Evento - Confirmação da Operação
                </span>
                <span>
                  <span>
                    <Checkbox
                      value={6}
                      checked={isNfe.OPERACAO_NAO_REALIZADA}
                      onClick={() =>
                        setIsNfe({
                          ...isNfe,
                          OPERACAO_NAO_REALIZADA: !isNfe.OPERACAO_NAO_REALIZADA,
                        })
                      }
                      onChange={() => gatherData(6)}
                    />
                  </span>
                  Registrar Evento - Operação Não Realizada
                </span>
                <span>
                  <span>
                    <Checkbox
                      value={5}
                      checked={isNfe.DESCONHECIMENTO}
                      onClick={() =>
                        setIsNfe({
                          ...isNfe,
                          DESCONHECIMENTO: !isNfe.DESCONHECIMENTO,
                        })
                      }
                      onChange={() => gatherData(5)}
                    />
                  </span>
                  Registrar Evento - Desconhecimento da Operação
                </span>
              </div>
            </div>
          )}
        </div>
        {/* // )}  */}
        {/* {availableApps?.CTE && ( */}
        <div className="body-row">
          <div
            onClick={() =>
              setVisible({ ...visible, cteModal: !visible.cteModal })
            }
            style={{ cursor: 'pointer' }}
          >
            <span className="line">
              <h5>Ct-e</h5>
            </span>
            <span className="line">
              <h5>Painel e Visualização de Ct-e</h5>
            </span>
            <span>
              {!visible?.cteModal ? (
                <ChevronDown className="icon" />
              ) : (
                <ChevronUp className="icon" />
              )}
            </span>
          </div>
          {visible?.cteModal && (
            <div className="modal">
              <div>
                <span>
                  <span>
                    <Checkbox
                      checked={isCte.VISUALIZAR}
                      onClick={() =>
                        setIsCte({
                          ...isCte,
                          VISUALIZAR: !isCte.VISUALIZAR,
                        })
                      }
                      onChange={() => gatherData(14)}
                    />
                  </span>
                  Visualizar
                </span>
                <span>
                  <span>
                    <Checkbox
                      checked={isCte.HISTORICO}
                      onClick={() =>
                        setIsCte({ ...isCte, HISTORICO: !isCte.HISTORICO })
                      }
                      onChange={() => gatherData(13)}
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
        {/* )}  */}
        {/* {availableApps?.NFSE && ( */}
        <div className="body-row">
          <div
            onClick={() =>
              setVisible({ ...visible, nfseModal: !visible.nfseModal })
            }
            style={{ cursor: 'pointer' }}
          >
            <span className="line">
              <h5>Nfs-e</h5>
            </span>
            <span className="line">
              <h5>Painel e Visualização de Nfs-e</h5>
            </span>
            <span>
              {!visible?.nfseModal ? (
                <ChevronDown className="icon" />
              ) : (
                <ChevronUp className="icon" />
              )}
            </span>
          </div>
          {visible?.nfseModal && (
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
                      onChange={() => gatherData(17)}
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
                      onChange={() => gatherData(16)}
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
                        setIsNfse({ ...isNfse, IMPRIMIR: !isNfse.IMPRIMIR })
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
        {/* )}  */}
        {/* {availableApps?.ENTRADA && ( */}
        <div className="body-row">
          <div
            onClick={() =>
              setVisible({
                ...visible,
                entranceModal: !visible.entranceModal,
              })
            }
            style={{ cursor: 'pointer' }}
          >
            <span className="line">
              <h5>Entrada</h5>
            </span>
            <span className="line">
              <h5>Painel e Visualização de Portaria</h5>
            </span>
            <span>
              {!visible?.entranceModal ? (
                <ChevronDown className="icon" />
              ) : (
                <ChevronUp className="icon" />
              )}
            </span>
          </div>
          {visible?.entranceModal && (
            <div className="modal">
              <div>
                <span>
                  <span>
                    <Checkbox
                      value={19}
                      checked={isEntrance.VISUALIZAR}
                      onClick={() =>
                        setIsEntrance({
                          ...isEntrance,
                          VISUALIZAR: !isEntrance.VISUALIZAR,
                        })
                      }
                      onChange={() => gatherData(19)}
                    />
                  </span>
                  Visualizar
                </span>
                <span>
                  <span>
                    <Checkbox
                      value={20}
                      checked={isEntrance.AUTORIZAR}
                      onClick={() =>
                        setIsEntrance({
                          ...isEntrance,
                          AUTORIZAR: !isEntrance.AUTORIZAR,
                        })
                      }
                      onChange={() => gatherData(20)}
                    />
                  </span>
                  Autorizar
                </span>
                <span>
                  <span>
                    <Checkbox
                      value={21}
                      checked={isEntrance.EDITAR}
                      onClick={() =>
                        setIsEntrance({
                          ...isEntrance,
                          EDITAR: !isEntrance.EDITAR,
                        })
                      }
                      onChange={() => gatherData(21)}
                    />
                  </span>
                  Editar
                </span>
                <span>
                  <span>
                    <Checkbox
                      value={22}
                      checked={isEntrance.CANCELAR}
                      onClick={() =>
                        setIsEntrance({
                          ...isEntrance,
                          CANCELAR: !isEntrance.CANCELAR,
                        })
                      }
                      onChange={() => gatherData(22)}
                    />
                  </span>
                  Cancelar
                </span>
                <span>
                  <span>
                    <Checkbox
                      value={23}
                      checked={isEntrance.ADICIONAR}
                      onClick={() =>
                        setIsEntrance({
                          ...isEntrance,
                          ADICIONAR: !isEntrance.ADICIONAR,
                        })
                      }
                      onChange={() => gatherData(23)}
                    />
                  </span>
                  Adicionar
                </span>
              </div>
            </div>
          )}
        </div>
        {/* )}  */}
        <div className="body-row">
          <div
            onClick={() =>
              setVisible({
                ...visible,
                profileModal: !visible.profileModal,
              })
            }
            style={{ cursor: 'pointer' }}
          >
            <span className="line">
              <h5>Perfis</h5>
            </span>
            <span className="line">
              <h5>Cadastro de Perfis</h5>
            </span>
            <span>
              {!visible?.profileModal ? (
                <ChevronDown className="icon" />
              ) : (
                <ChevronUp className="icon" />
              )}
            </span>
          </div>
          {visible?.profileModal && (
            <div className="modal">
              <div>
                <span>
                  <span>
                    <Checkbox
                      checked={isProfile.ADICIONAR}
                      onClick={() =>
                        setIsProfile({
                          ...isProfile,
                          ADICIONAR: !isProfile.ADICIONAR,
                        })
                      }
                      onChange={() => gatherData(11)}
                    />
                  </span>
                  Cadastrar Perfil
                </span>
                <span>
                  <span>
                    <Checkbox
                      checked={isProfile.EXCLUIR}
                      onClick={() =>
                        setIsProfile({
                          ...isProfile,
                          EXCLUIR: !isProfile.EXCLUIR,
                        })
                      }
                      onChange={() => gatherData(10)}
                    />
                  </span>
                  Excluir Perfil
                </span>
                <span>
                  <span>
                    <Checkbox
                      checked={isProfile.EDITAR}
                      onClick={() =>
                        setIsProfile({
                          ...isProfile,
                          EDITAR: !isProfile.EDITAR,
                        })
                      }
                      onChange={() => gatherData(12)}
                    />
                  </span>
                  Editar Perfil
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="body-row">
          <div
            onClick={() =>
              setVisible({
                ...visible,
                usersModal: !visible.usersModal,
              })
            }
            style={{ cursor: 'pointer' }}
          >
            <span className="line">
              <h5>Usuários</h5>
            </span>
            <span className="line">
              <h5>Cadastro de Usuários</h5>
            </span>
            <span>
              {!visible?.usersModal ? (
                <ChevronDown className="icon" />
              ) : (
                <ChevronUp className="icon" />
              )}
            </span>
          </div>
          {visible?.usersModal && (
            <div className="modal">
              <div>
                <span>
                  <span>
                    <Checkbox
                      value={8}
                      checked={isUser.ADICIONAR}
                      onClick={() =>
                        setIsUser({ ...isUser, ADICIONAR: !isUser.ADICIONAR })
                      }
                      onChange={() => gatherData(8)}
                    />
                  </span>
                  Adicionar Usuário
                </span>
                <span>
                  <span>
                    <Checkbox
                      value={7}
                      checked={isUser.EXCLUIR}
                      onClick={() =>
                        setIsUser({ ...isUser, EXCLUIR: !isUser.EXCLUIR })
                      }
                      onChange={() => gatherData(7)}
                    />
                  </span>
                  Excluir Usuário
                </span>
                <span>
                  <span>
                    <Checkbox
                      value={9}
                      checked={isUser.EDITAR}
                      onClick={() =>
                        setIsUser({ ...isUser, EDITAR: !isUser.EDITAR })
                      }
                      onChange={() => gatherData(9)}
                    />
                  </span>
                  Editar Usuário
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="body-row">
          <div
            onClick={() =>
              setVisible({
                ...visible,
                cnpjModal: !visible.cnpjModal,
              })
            }
            style={{ cursor: 'pointer' }}
          >
            <span className="line">
              <h5>CNPJs da Empresa</h5>
            </span>
            <span className="line">
              <h5>Cadastro de CNPJs</h5>
            </span>
            <span>
              {!visible?.cnpjModal ? (
                <ChevronDown className="icon" />
              ) : (
                <ChevronUp className="icon" />
              )}
            </span>
          </div>
          {visible?.cnpjModal && (
            <div className="modal">
              <div>
                <span>
                  <span>
                    <Checkbox
                      value={25}
                      checked={isCnpj.ADICIONAR}
                      onClick={() =>
                        setIsCnpj({ ...isCnpj, ADICIONAR: !isCnpj.ADICIONAR })
                      }
                      onChange={() => gatherData(25)}
                    />
                  </span>
                  Adicionar CNPJ
                </span>
                <span>
                  <span>
                    <Checkbox
                      value={24}
                      checked={isCnpj.EXCLUIR}
                      onClick={() =>
                        setIsCnpj({ ...isCnpj, EXCLUIR: !isCnpj.EXCLUIR })
                      }
                      onChange={() => gatherData(24)}
                    />
                  </span>
                  Excluir CNPJ
                </span>
                <span>
                  <span>
                    <Checkbox
                      value={26}
                      checked={isCnpj.EDITAR}
                      onClick={() =>
                        setIsCnpj({ ...isCnpj, EDITAR: !isCnpj.EDITAR })
                      }
                      onChange={() => gatherData(26)}
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
            onClick={() =>
              setVisible({
                ...visible,
                certificadoModal: !visible.certificadoModal,
              })
            }
            style={{ cursor: 'pointer' }}
          >
            <span className="line">
              <h5>Certificado Digital</h5>
            </span>
            <span className="line">
              <h5>Upload do Certificado Digital</h5>
            </span>
            <span>
              {!visible?.certificadoModal ? (
                <ChevronDown className="icon" />
              ) : (
                <ChevronUp className="icon" />
              )}
            </span>
          </div>
          {visible?.certificadoModal && (
            <div className="modal">
              <div>
                <span>
                  <span>
                    <Checkbox
                      value={28}
                      checked={isCertificate.ADICIONAR}
                      onClick={() =>
                        setIsCertificate({
                          ...isCertificate,
                          ADICIONAR: !isCertificate.ADICIONAR,
                        })
                      }
                      onChange={() => gatherData(28)}
                    />
                  </span>
                  Adicionar Certificado
                </span>
                <span>
                  <span>
                    <Checkbox
                      value={27}
                      checked={isCertificate.EXCLUIR}
                      onClick={() =>
                        setIsCertificate({
                          ...isCertificate,
                          EXCLUIR: !isCertificate.EXCLUIR,
                        })
                      }
                      onChange={() => gatherData(27)}
                    />
                  </span>
                  Excluir Certificado
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="body-row">
          <div
            onClick={() =>
              setVisible({
                ...visible,
                companyModal: !visible.companyModal,
              })
            }
            style={{ cursor: 'pointer' }}
          >
            <span className="line">
              <h5>Perfil da Empresa</h5>
            </span>
            <span className="line">
              <h5>Confirgurações de Perfil da Empresa</h5>
            </span>
            <span>
              {!visible?.companyModal ? (
                <ChevronDown className="icon" />
              ) : (
                <ChevronUp className="icon" />
              )}
            </span>
          </div>
          {visible?.companyModal && (
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
  );
};

export default Perfis;
