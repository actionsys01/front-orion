import React, { Dispatch, SetStateAction } from 'react';
import { useToasts } from '@geist-ui/react';
import * as request from '@services/cadastros';
import { Modal } from '@styles/modal';
import { IDados } from '@services/cadastros/types';

interface IModal {
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
  appData: IDados[];
  setAppData: Dispatch<SetStateAction<IDados[]>>;
  id: number;
}

const DeleteModal = ({ setVisibleModal, appData, setAppData, id }: IModal) => {
  const [, setToast] = useToasts();

  async function deleteDado() {
    try {
      await request.DeleteDado(id);
      const currentDados = appData?.filter(item => item.id !== id);
      setAppData(currentDados);
      setToast({
        text: 'Dado excluído com sucesso',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
    setVisibleModal(false);
  }

  return (
    <Modal>
      <div>
        <h5>Deseja realmente excluir a opção selecionada?</h5>
        <div>
          <button onClick={() => setVisibleModal(false)}>CANCELAR</button>
          <button onClick={() => deleteDado()}>CONFIRMAR</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
