import React from 'react';
import { Table } from '../perfil-cadastro/style';
import { ChevronDown, ChevronUp } from '@geist-ui/react-icons';
import { Checkbox } from '@material-ui/core';

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
                          OPERACAO_NAO_REALIZADA: !isNfe.OPERACAO_NAO_REALIZADA,
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
          <div
            onClick={() =>
              setVisible({ ...visible, entranceModal: !visible.entranceModal })
            }
            style={{ cursor: 'pointer' }}
          >
            <span className="line">
              <h5>Portaria</h5>
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
          <div
            onClick={() =>
              setVisible({ ...visible, profileModal: !visible.profileModal })
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
          <div
            onClick={() =>
              setVisible({ ...visible, usersModal: !visible.usersModal })
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
          <div
            onClick={() =>
              setVisible({ ...visible, cnpjModal: !visible.cnpjModal })
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
          <div
            onClick={() =>
              setVisible({ ...visible, companyModal: !visible.companyModal })
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
