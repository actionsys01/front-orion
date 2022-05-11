import React, { useState } from 'react';
import { PopoverStyle } from './style';
import { initialStates } from '../utils/initial-states';
import registerEvent from '@services/nfe/registerEvent';
import { useToasts } from '@geist-ui/react';
import { useSession } from 'next-auth/client';
import { useSecurityContext } from '@contexts/security';

const PopoverEvento = ({ item, visible, setVisible }) => {
  const [request, setRequest] = useState({ ...initialStates });
  const [action, setAction] = useState('');
  const [, setToast] = useToasts();
  const [session] = useSession();

  const { nfePermissions } = useSecurityContext();

  // const visibleHandler = () => {
  //   setVisible(!visible);
  // };

  async function eventRegister() {
    try {
      await registerEvent({
        ambiente: request.ambiente,
        chave_nota: request.chave_nota,
        cod_estado: request.cod_estado,
        dest_cnpj: request.dest_cnpj,
        empresa_id: Number(session?.usuario.empresa.id),
        motivo: request.motivo,
        tipo_evento: request.tipo_evento,
      });
    } catch (error) {
      setToast({
        text: 'Não foi possível registrar o evento, por favor tente novamente',
        type: 'warning',
      });
    }
  }

  return (
    <PopoverStyle>
      {visible && (
        <div onMouseLeave={() => setVisible(false)}>
          <p
            onClick={
              nfePermissions.CIENCIA
                ? () => {
                    setRequest({
                      ...request,
                      motivo: 'CIENCIA_DA_OPERAÇÃO',
                      tipo_evento: 'CIENCIA_DA_OPERAÇÃO',
                      dest_cnpj: item.dest_cnpj,
                      chave_nota: item.chave_nota,
                    });
                    setAction('Ciência da Operação');
                  }
                : () => ''
            }
            className={nfePermissions.CIENCIA ? 'able' : 'disable'}
          >
            Ciência
          </p>
          <p
            onClick={
              nfePermissions.CONFIRMACAO
                ? () => {
                    setRequest({
                      ...request,
                      motivo: 'CONFIRMACAO_DA_OPERAÇÃO',
                      tipo_evento: 'CONFIRMACAO_DA_OPERAÇÃO',
                      dest_cnpj: item.dest_cnpj,
                      chave_nota: item.chave_nota,
                    });
                    setAction('Confirmação da Operação');
                  }
                : () => ''
            }
            className={nfePermissions.CONFIRMACAO ? 'able' : 'disable'}
          >
            Confirmação
          </p>
          <p
            onClick={
              nfePermissions.OPERACAO_NAO_REALIZADA
                ? () => {
                    setRequest({
                      ...request,
                      motivo: 'OPERACAO_NAO_REALIZADA',
                      tipo_evento: 'OPERACAO_NAO_REALIZADA',
                      dest_cnpj: item.dest_cnpj,
                      chave_nota: item.chave_nota,
                    });
                    setAction('Operação não realizada');
                  }
                : () => ''
            }
            className={
              nfePermissions.OPERACAO_NAO_REALIZADA ? 'able' : 'disable'
            }
          >
            Operação não realizada
          </p>
          <p
            onClick={
              nfePermissions.DESCONHECIMENTO
                ? () => {
                    setRequest({
                      ...request,
                      motivo: 'DESCONHECIMENTO_DA_OPERACAO',
                      tipo_evento: 'DESCONHECIMENTO_DA_OPERACAO',
                      dest_cnpj: item.dest_cnpj,
                      chave_nota: item.chave_nota,
                    });
                    setAction('Desconhecimento da Operação');
                  }
                : () => ''
            }
            className={nfePermissions.DESCONHECIMENTO ? 'able' : 'disable'}
          >
            Desconhecimento
          </p>
        </div>
      )}
    </PopoverStyle>
  );
};

export default PopoverEvento;
