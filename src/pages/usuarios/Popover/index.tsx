import React, { useState,  Dispatch, SetStateAction, useCallback, useEffect} from 'react'; 
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
import * as companyRequest from '@services/empresas'
import { useRouter } from "next/router";
import { IUsuario } from "../index"
import { useSession } from "next-auth/client";

  interface PopoverProps {
    data: any;
    usuarios: IUsuario[];
    setUsuarios: Dispatch<SetStateAction<IUsuario[]>>
    setUserModalVisible: Dispatch<SetStateAction<boolean>>
  }

const UserPopover: React.FC<PopoverProps> = ({ data, setUsuarios, usuarios, setUserModalVisible } : PopoverProps) => {
    const { userPermissions } = useSecurityContext()
    const router = useRouter();
    const [session] = useSession();
    const [visible, setVisible] = useState(false)
    const { setVisible: setVisibleModal, bindings } = useModal();
    const [userId, setUserId] = useState<number>(0);
    const [, setToast] = useToasts()


    const changeHandler = useCallback((next) => {
        setVisible(next)
      }, [])

  async function deletar(id: number, userEmail: string) {
    const response = await companyRequest.getCompanyById(Number(session?.usuario.empresa.id))
    const userEAdress = response.data.email
    if (userEAdress === userEmail) {
      setUserModalVisible(true)
      setVisible(false)
      return
    }
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
          {userPermissions.EDITAR &&
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
          </Popover.Item>}
        { userPermissions.EXCLUIR && 
          <Popover.Item> 
            <Text
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                const { id } = data;
                const userEmail = data.email
                deletar(id, userEmail);
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