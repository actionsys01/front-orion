import React, { Dispatch, SetStateAction } from 'react';
import { useToasts } from '@geist-ui/react';
import { Modal } from '@styles/modal';
import { IConfigData } from '@services/cadastros/types';
import * as request from '@services/cadastros';

interface IModal {
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
  data: IConfigData[];
  setData: Dispatch<SetStateAction<IConfigData[]>>;
  id: number;
}

const DeleteModal = ({ data, setData, id, setVisibleModal }: IModal) => {
  const [, setToast] = useToasts();

  async function deleteConfig() {
    try {
      await request.DeleteConfig(id);
      const currentConfigApps = data?.filter(item => item.id !== id);
      setData(currentConfigApps);
      setToast({
        text: 'Categoria excluída com sucesso',
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
        <h5>Deseja realmente excluir a aplicação selecionada?</h5>
        <div>
          <button onClick={() => setVisibleModal(false)}>CANCELAR</button>
          <button onClick={() => deleteConfig()}>CONFIRMAR</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
