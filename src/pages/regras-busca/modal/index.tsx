import React, { Dispatch, SetStateAction } from 'react';
import { useToasts } from '@geist-ui/react';
import { Modal } from '@styles/modal';
import * as request from '@services/regras-busca';
import { IRegrasBusca } from '@services/regras-busca/types';

interface IModal {
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
  data: IRegrasBusca[];
  setData: Dispatch<SetStateAction<IRegrasBusca[]>>;
  id: number;
}

const DeleteModal = ({ setVisibleModal, data, setData, id }: IModal) => {
  const [, setToast] = useToasts();

  async function deleteProduct() {
    try {
      await request.DeleteRegrasBusca(id);
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
          <button onClick={() => deleteProduct()}>CONFIRMAR</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
