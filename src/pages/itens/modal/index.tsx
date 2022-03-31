import React, { Dispatch, SetStateAction } from 'react';
import { useToasts } from '@geist-ui/react';
import { Modal } from '@styles/modal';
import * as request from '@services/itens';
import { IProdutos } from '@services/itens/types';

interface IModal {
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
  data: IProdutos[];
  setData: Dispatch<SetStateAction<IProdutos[]>>;
  id: number;
}

const DeleteModal = ({ setVisibleModal, data, setData, id }: IModal) => {
  const [, setToast] = useToasts();

  async function deleteProduct() {
    try {
      await request.DeleteProduct(id);
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
