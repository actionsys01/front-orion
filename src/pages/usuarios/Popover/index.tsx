import React, { useState,  Dispatch, SetStateAction, useCallback} from 'react'; 
import { MoreHorizontal } from "@geist-ui/react-icons";
import {
    Popover,
    Text,
    useToasts,
    Modal,
    useModal
  } from "@geist-ui/react";
import {useSecurityContext} from "@contexts/security"
import * as usuario from "@services/usuarios"
import { useRouter } from "next/router";
import {IUsuario} from "../index"

  interface PopoverProps {
    data: any;
    usuarios: IUsuario[];
    setUsuarios: Dispatch<SetStateAction<IUsuario[]>>
  }

const UserPopover:  React.FC<PopoverProps> = ({data, setUsuarios, usuarios}) => {
    const {userDeletePermission, userUpdatePermission, userPermission} = useSecurityContext()
    const router = useRouter();
    const [visible, setVisible] = useState(false)
    const { setVisible: setVisibleModal, bindings } = useModal();
    const [userId, setUserId] = useState<number>(0);
    const [, setToast] = useToasts()


    const changeHandler = useCallback((next) => {
        setVisible(next)
      }, [])

      function deletar(id: number) {
        setVisible(false)
        setVisibleModal(true)
        setUserId(id)
      }


     async function deleteUser() {
         try {
            const id: number = userId
            await usuario.deletar(id);
            setVisibleModal(false)
            const usuariosAtualizados = usuarios?.filter((usuario) => usuario.id !== id);
            setUsuarios(usuariosAtualizados)
            setToast({
                text: "Usuário excluído.",
                type: "success",
              });
         } catch (error) {
            setToast({
                text: "Houve um problema, por favor tente novamente.",
                type: "warning",
              });
         }
        
      } 

    return <>
    <Popover
      visible={visible}
      onVisibleChange={changeHandler}
      placement="right"
      content={
        <>
          {/* {userUpdatePermission && */}
            <Popover.Item>
            <Text
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                const { id } = data;
                const perfil_nome = data.perfil_id;
                const nome = data.nome;
                const email = data.email;
                router.push({
                  pathname: "/atualizar-usuario",
                  query: { perfil_nome, nome, email, id },
                });
              }}
            >
              Editar
            </Text>
          </Popover.Item>
        { userDeletePermission && 
          <Popover.Item> 
            <Text
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                const { id } = data;
                deletar(id);
              }}
            >
              Deletar
            </Text>
          </Popover.Item>
         } 
        </>
      }
    >
      <span style={{ cursor: "pointer" }}>
        <MoreHorizontal />
      </span>
    </Popover>

    <Modal
      disableBackdropClick={true}
      {...bindings}
    >
      <h4>Deseja realmente excluir o usuário?</h4>
    <Modal.Action passive onClick={() => setVisibleModal(false)} type="abort">
          CANCELAR
        </Modal.Action>
        <Modal.Action onClick={deleteUser}>
          CONTINUAR
        </Modal.Action>
    </Modal>
    </>
}

export default UserPopover;