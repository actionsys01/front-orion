import React, { useState, Dispatch, SetStateAction, useCallback } from 'react';

import { useToasts, Modal, useModal } from '@geist-ui/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { useSecurityContext } from '@contexts/security';

import * as usuario from '@services/usuarios';
import * as companyRequest from '@services/empresas';

import { IUsuario } from '../index';
import Popover from '@components/Popover';

interface PopoverProps {
  data: any;
  usuarios: IUsuario[];
  setUsuarios: Dispatch<SetStateAction<IUsuario[]>>;
  setUserModalVisible: Dispatch<SetStateAction<boolean>>;
  i: number;
}

const UserPopover: React.FC<PopoverProps> = ({
  data,
  setUsuarios,
  usuarios,
  setUserModalVisible,
  i,
}: PopoverProps) => {
  const { userPermissions } = useSecurityContext();
  const router = useRouter();
  const [session] = useSession();
  const { setVisible: setVisibleModal, bindings } = useModal();
  const [userId, setUserId] = useState<number>(0);
  const [, setToast] = useToasts();

  async function deletar(id: number, userEmail: string) {
    const response = await companyRequest.getCompanyById(
      Number(session?.usuario.empresa.id),
    );
    const userEAdress = response.data.email;
    if (userEAdress === userEmail) {
      setUserModalVisible(true);
      return;
    }
    setVisibleModal(true);
    setUserId(id);
  }

  async function deleteUser() {
    try {
      const id: number = userId;
      await usuario.deletar(id);
      setVisibleModal(false);
      const usuariosAtualizados = usuarios?.filter(
        usuario => usuario.id !== id,
      );
      setUsuarios(usuariosAtualizados);
      setToast({
        text: 'Usuário excluído.',
        type: 'success',
      });
    } catch (error) {
      setToast({
        text: 'Houve um problema, por favor tente novamente.',
        type: 'warning',
      });
    }
  }

  return (
    <>
      <Popover
        style={{ width: '45px !important' }}
        num={i}
        quant={2}
        content={[
          {
            optionName: 'Editar',
            onClick: userPermissions.EDITAR
              ? () => {
                  const { id } = data;
                  const perfil_nome = data.perfil_id;
                  const nome = data.nome;
                  const email = data.email;
                  router.push({
                    pathname: '/atualizar-usuario',
                    query: { perfil_nome, nome, email, id },
                  });
                }
              : () => '',
            className: userPermissions.EDITAR ? 'able' : 'disabled',
          },
          {
            optionName: 'Deletar',
            onClick: userPermissions.EXCLUIR
              ? () => {
                  const { id } = data;
                  const userEmail = data.email;
                  deletar(id, userEmail);
                }
              : () => '',
            className: userPermissions.EXCLUIR ? 'able' : 'disabled',
          },
        ]}
      />

      <Modal disableBackdropClick={true} {...bindings}>
        <h4>Deseja realmente excluir o usuário?</h4>
        <Modal.Action
          passive
          onClick={() => setVisibleModal(false)}
          type="abort"
        >
          CANCELAR
        </Modal.Action>
        <Modal.Action onClick={deleteUser}>CONTINUAR</Modal.Action>
      </Modal>
    </>
  );
};

export default UserPopover;
