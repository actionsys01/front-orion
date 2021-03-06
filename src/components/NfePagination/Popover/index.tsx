import {
  Modal,
  Popover,
  Text,
  Textarea,
  useModal,
  useToasts,
} from '@geist-ui/react';
import { MoreHorizontal } from '@geist-ui/react-icons';
import { useCallback, useState, useEffect, useMemo } from 'react';
import router, { useRouter } from 'next/router';
import { useSecurityContext } from '@contexts/security';
import api from '@services/api';
import Danfe from '@components/danfe';
import getNfeData from '@services/nfe/getNfeData';
import { useSession } from 'next-auth/client';

interface PopoverProps {
  item: any;
}

interface Event {
  company_id: number;
  dest_cnpj: string;
  tipo_evento: string;
  motivo: string;
  cod_estado: string;
  key: string;
}

const PopoverComponent: React.FC<PopoverProps> = ({ item }) => {
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('');
  const router = useRouter();
  const { setVisible: setVisiblePop, bindings } = useModal();
  const [secondPopoverVisible, setSecondPopoverVisible] = useState(false);
  const { nfePermissions } = useSecurityContext();
  const [reason, setReason] = useState<string>('');
  const [eventType, setEventType] = useState<string>('');
  const [stateCode, setStateCode] = useState<string>('');
  const [invoiceKey, setInvoiceKey] = useState<string>('');
  const [companyId, setCompanyId] = useState<number>();
  const [cnpj, setCnpj] = useState<string>('');
  const [, setToast] = useToasts();
  const [session] = useSession();
  const company_id = Number(session?.usuario.empresa.id);

  const changeHandler = useCallback(next => {
    setVisible(next);
  }, []);

  const changeHandlerSecondPopover = useCallback(next => {
    setSecondPopoverVisible(next);
  }, []);

  const getEventData = useCallback(
    (key, company_id, dest_cnpj) => {
      const firstString = key.substring(0, 1);
      const cod_estado =
        firstString === 'N' ? key.substring(3, 5) : key.substring(0, 2);
      setStateCode(cod_estado);
      setInvoiceKey(key);
      setCompanyId(company_id);
      setCnpj(dest_cnpj);
      setVisiblePop(true);
      setSecondPopoverVisible(false);
      setVisible(false);
    },
    [invoiceKey, cnpj],
  );

  async function eventRegister() {
    try {
      await api.post('/nfe/controle/evento-sefaz', {
        empresa_id: companyId,
        dest_cnpj: cnpj,
        ambiente: 'HOMOLOGACAO',
        tipo_evento: eventType,
        motivo: reason,
        cod_estado: stateCode,
        chave_nota: invoiceKey,
      });
      setToast({
        text: 'Evento registrado com sucesso',
        type: 'success',
      });
    } catch (error) {
      setToast({
        text: 'N??o foi poss??vel registrar o evento, por favor tente novamente',
        type: 'warning',
      });
    }
  }

  const printData = async (nota: string, front: any) => {
    const nfeData: any = [];
    const nfeFrontData: any = [];
    const produtos: any = [];
    nfeFrontData.push(front);
    try {
      const response = await getNfeData(nota, company_id);
      const nfeResponse = response.data;
      if (Array.isArray(nfeResponse)) {
        const products = nfeResponse.map(item => item.produtos_servicos);
        Danfe(nfeResponse, nfeFrontData, products);
      } else {
        nfeData.push(nfeResponse);
        const products = nfeResponse.produtos_servicos;
        if (Array.isArray(products)) {
          Danfe(nfeData, nfeFrontData, products);
        } else {
          produtos.push(products);
          Danfe(nfeData, nfeFrontData, produtos);
        }
      }
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema, por favor tente novamente',
        type: 'warning',
      });
    }
  };

  return (
    <>
      <Popover
        visible={visible}
        onVisibleChange={changeHandler}
        placement="right"
        content={
          <div className={'show'}>
            <Popover.Item>
              <Text
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  const chave_nota = item?.rowValue.chave_nota;
                  const status_sefaz = Number(item?.rowValue.sefaz_status);
                  const desc_status_sefaz = item?.rowValue.sefaz_status_desc;
                  router.push({
                    pathname: `/nfe-detalhes`,
                    query: {
                      chave_nota,
                      status_sefaz,
                      desc_status_sefaz,
                    },
                  });
                }}
              >
                Visualizar
              </Text>
            </Popover.Item>
            {(nfePermissions.CIENCIA ||
              nfePermissions.CONFIRMACAO ||
              nfePermissions.OPERACAO_NAO_REALIZADA ||
              nfePermissions.DESCONHECIMENTO) && (
              <>
                <Popover.Item>
                  <Popover
                    visible={secondPopoverVisible}
                    onVisibleChange={changeHandlerSecondPopover}
                    style={{ cursor: 'pointer' }}
                    placement="right"
                    content={
                      <>
                        {nfePermissions.CIENCIA && (
                          <Popover.Item>
                            <Text
                              style={{
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                const key = String(item?.rowValue.chave_nota);
                                const company_id = Number(
                                  item?.rowValue.empresa_id,
                                );
                                const dest_cnpj = String(
                                  item?.rowValue.dest_cnpj,
                                );
                                const reasonKey = 'CIENCIA_DA_OPERA????O';
                                setReason(reasonKey);
                                setEventType(reasonKey);
                                getEventData(key, company_id, dest_cnpj);
                                setAction('Ci??ncia da Opera????o');
                              }}
                            >
                              Ci??ncia
                            </Text>
                          </Popover.Item>
                        )}
                        {nfePermissions.CONFIRMACAO && (
                          <Popover.Item>
                            <Text
                              style={{
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                const key = String(item?.rowValue.chave_nota);
                                const company_id = Number(
                                  item?.rowValue.empresa_id,
                                );
                                const dest_cnpj = String(
                                  item?.rowValue.dest_cnpj,
                                );
                                const reasonKey = 'CONFIRMACAO_DA_OPERA????O';
                                setReason(reasonKey);
                                setEventType(reasonKey);
                                getEventData(key, company_id, dest_cnpj);
                                setAction('Confirma????o da Opera????o');
                              }}
                            >
                              Confirma????o
                            </Text>
                          </Popover.Item>
                        )}
                        {nfePermissions.OPERACAO_NAO_REALIZADA && (
                          <Popover.Item>
                            <Text
                              style={{
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                const key = String(item?.rowValue.chave_nota);
                                const company_id = Number(
                                  item?.rowValue.empresa_id,
                                );
                                const dest_cnpj = String(
                                  item?.rowValue.dest_cnpj,
                                );
                                const reasonKey = 'OPERACAO_NAO_REALIZADA';
                                setEventType(reasonKey);
                                getEventData(key, company_id, dest_cnpj);
                                setAction('Opera????o n??o realizada');
                              }}
                            >
                              Opera????o n??o realizada
                            </Text>
                          </Popover.Item>
                        )}
                        {nfePermissions.DESCONHECIMENTO && (
                          <Popover.Item>
                            <Text
                              style={{
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                const key = String(item?.rowValue.chave_nota);
                                const company_id = Number(
                                  item?.rowValue.empresa_id,
                                );
                                const dest_cnpj = String(
                                  item?.rowValue.dest_cnpj,
                                );
                                const reasonKey = 'DESCONHECIMENTO_DA_OPERACAO';
                                setEventType(reasonKey);
                                getEventData(key, company_id, dest_cnpj);
                                setAction('Desconhecimento da Opera????o');
                              }}
                            >
                              Desconhecimento
                            </Text>
                          </Popover.Item>
                        )}
                      </>
                    }
                  >
                    Registrar evento
                  </Popover>
                </Popover.Item>
              </>
            )}

            {nfePermissions.HISTORICO && (
              <Popover.Item>
                <Text
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    const chave_nota = item?.rowValue.chave_nota;
                    const empresa_id = item?.rowValue.empresa_id;
                    router.push({
                      pathname: `/historico-notas`,
                      query: { chave_nota, empresa_id },
                    });
                  }}
                >
                  Hist??rico de nota
                </Text>
              </Popover.Item>
            )}
            <Popover.Item>
              <a href={item?.rowValue.xml} download>
                <Text
                  onClick={() => setVisible(false)}
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#1C496A',
                    margin: '0',
                  }}
                >
                  Download
                </Text>
              </a>
            </Popover.Item>
            <Popover.Item>
              <Text
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  const front = item.rowValue;
                  const nota = item.rowValue.chave_nota;
                  printData(nota, front);
                }}
              >
                Imprimir Nota
              </Text>
            </Popover.Item>
          </div>
        }
      >
        <span style={{ cursor: 'pointer' }}>
          <MoreHorizontal />
        </span>
      </Popover>
      <Modal
        style={{ zIndex: 1020 }}
        disableBackdropClick={true}
        {...bindings}
        onClose={() => {
          setEventType('');
          setReason('');
          setStateCode('');
          setInvoiceKey('');
          // setCompanyId()
          setCnpj('');
        }}
      >
        <Modal.Title>{action}</Modal.Title>
        <Modal.Subtitle>Registrar Evento</Modal.Subtitle>
        {action === 'Ci??ncia da Opera????o' && (
          <Modal.Content>
            <Text small style={{ textAlign: 'center' }}>
              Deseja prosseguir com a opera????o?
            </Text>
          </Modal.Content>
        )}
        {action === 'Confirma????o da Opera????o' && (
          <Modal.Content>
            <Text small style={{ textAlign: 'center' }}>
              Deseja prosseguir com a opera????o?
            </Text>
          </Modal.Content>
        )}
        {action === 'Opera????o n??o realizada' && (
          <Modal.Content>
            <Text small>Motivo</Text>
            <Textarea
              width="100%"
              placeholder="Ex: Essa opera????o n??o foi realizada por problemas de log??stica"
              onChange={e => setReason(e.target.value)}
            />
          </Modal.Content>
        )}
        {action === 'Desconhecimento da Opera????o' && (
          <Modal.Content>
            <Text small>Motivo</Text>
            <Textarea
              width="100%"
              placeholder="Ex: Os dados da nota n??o conferem"
              onChange={e => setReason(e.target.value)}
            />
          </Modal.Content>
        )}
        <Modal.Action passive onClick={() => setVisiblePop(false)} type="abort">
          CANCELAR
        </Modal.Action>
        <Modal.Action
          onClick={() => {
            setVisiblePop(false), eventRegister();
          }}
        >
          CONTINUAR
        </Modal.Action>
      </Modal>
    </>
  );
};

export default PopoverComponent;
