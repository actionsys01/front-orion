import React, { Dispatch, SetStateAction } from 'react';
import { useToasts } from '@geist-ui/react';
import { Modal } from '@styles/modal';
import * as request from '@services/referencia-cruzada';
import { IDados } from '@services/referencia-cruzada/types';

interface IModal {
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
  data: IDados[];
  setData: Dispatch<SetStateAction<IDados[]>>;
  id: number;
}

const DeleteModal = ({ setVisibleModal, data, setData, id }: IModal) => {
  const [, setToast] = useToasts();

  async function deleteRefCruzada() {
    try {
      await request.DeleteReferenciaCruzada(id);
      const currentProducts = data?.filter(item => item.id !== id);
      setData(currentProducts);
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
          <button onClick={() => deleteRefCruzada()}>CONFIRMAR</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
