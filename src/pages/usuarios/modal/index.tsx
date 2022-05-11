import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from '@styles/modal';

interface ModalProps {
  setUserModalVisible: Dispatch<SetStateAction<boolean>>;
}

const UserModal = ({ setUserModalVisible }: ModalProps) => {
  return (
    <Modal>
      <div>
        <h5>Não é possível deletar o usuário do tipo ADMIN.</h5>
        <div>
          <button onClick={() => setUserModalVisible(false)}>OK</button>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
