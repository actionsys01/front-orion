import { Link, Modal, Popover, Text, Textarea, useModal, useToasts, Input } from "@geist-ui/react";
import { MoreHorizontal } from "@geist-ui/react-icons";
import { useCallback, useState, Dispatch, SetStateAction } from "react";
import router from "next/router";
import {useSecurityContext} from "@contexts/security"
import {IPerfilAplicacao, IUpdateProfile, IPerfil} from "../index"
import * as perfil from "@services/perfis";
import api from "@services/api"
import { useSession } from "next-auth/client";

interface PopoverProps {
    data: any;
    setPerfisAplicacoes: Dispatch<SetStateAction<IPerfilAplicacao[]>>
  }

   interface CopyProfile {
    id: number;
    nome: string;
    descricao: string;
    atualizadoEm: string;
    atualizadoPorIp: string;
    criadoEm: string;
    criadoPorIp: string;
    permissões: ProfilePermissions
  }

interface ProfilePermissions {
id: number;
categoria: string;
acao: string
}

const ProfilePopover: React.FC<PopoverProps> = ({ data, setPerfisAplicacoes }) => {
    const [visible, setVisible] = useState(false)
    const { setVisible: setVisibleModal, bindings } = useModal();
    const {profileUpdatePermission, profileDeletePermission} = useSecurityContext();
    const [name, setName] = useState<string>("");
    const [session] = useSession()
    const [descricao, setDescricao] = useState<string>("");
    const [empresaId, setEmpresaId] = useState<number>()
    const [perfilId, setPerfiId] = useState<number>();
    const [copiedPermissions, setCopiedPermissions] = useState<number[]>([])
   
    const [acao, setAcao] = useState<"editar" | "cadastrar" | "copiar">(
        "cadastrar"
      );
      const [, setToast] = useToasts();

    const changeHandler = useCallback((next) => {
        setVisible(next)
      }, [])

      async function getProfileId (id: number) {
        const response = await api.get(`/perfil/search?profile_id=${id}`)
        const profile = response.data.permissoes
        const permissions =  profile.map((item: any) => item.id)
        
        console.log("mapa:",profile, "result:", permissions)
        setCopiedPermissions(permissions)
      }



       function copiar({ nome,
        descricao} : Omit<IPerfilAplicacao, "atualizadoEm" | "atualizadoPorIp" | "criadoEm" | "criadoPorIp" | "id"> ) {
        setAcao("copiar")  
        setName(`Cópia de ${nome}`)
        setDescricao(descricao);
        setVisibleModal(true)
      }
      console.log("post:", descricao, name,)
    
        function editar({
        nome,
        descricao,
        id,
      }: Omit<IPerfilAplicacao, "atualizadoEm" | "atualizadoPorIp" | "criadoEm" | "criadoPorIp">) {
        setAcao("editar");
        setName(nome);
        setDescricao(descricao);
        setPerfiId(id)
        setVisibleModal(true);
      }
    
     async function deletar({
        id,
      }: Omit<IPerfilAplicacao, "nome" | "descricao" | "atualizadoEm" | "atualizadoPorIp" | "criadoEm" | "criadoPorIp">) {
        try {
          await perfil.deletar(id);
          
          setPerfisAplicacoes(oldPerfisAplicacoes =>
            oldPerfisAplicacoes.filter((perfil: IPerfilAplicacao) => perfil.id !== id)
          )
        } catch (error: any) {
          console.log("erro:",error.response.data.mensagem)
          setToast({ text:  error.response.data.mensagem, 
            type: "warning" });
        }

      }  

    

      async function copyProfile() {
          try {
            await perfil.criar({name: name, descricao: descricao, permissions: copiedPermissions, empresa_id: Number(session?.usuario.empresa.id)})
            setToast({
              text: "Cópia realizada com sucesso.",
              type: "success"
          })
          
          } catch (error) {
              setToast({
                  text: "Houve um problema com a operação, por favor tente novamente.",
                  type: "warning"
              })
          }
          setVisibleModal(false)
      }

      async function updateProfile() {
        if(!name || !descricao) {
          setToast({
            text: "Informe todos os dados do usuário.",
            type: "warning"}); 
            return
        }
          router.push({
            pathname: "/atualizar-cadastro",
            query: { name, descricao, perfilId },
          })
      
      }

    return <>
     <Popover
              visible={visible}
              onVisibleChange={changeHandler}
              placement="right"
              {...bindings}
              content={
                <>
                  {profileUpdatePermission && <Popover.Item>
                    <Text
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const item = data.rowValue as IPerfilAplicacao;
                        editar(item);
                      }}
                    >
                      Editar
                    </Text>
                  </Popover.Item>}
                  {profileDeletePermission && <Popover.Item>
                    <Text
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const item = data.rowValue as IPerfilAplicacao;
                        deletar(item) ;
                        setVisible(false)
                      }}
                    >
                      Deletar
                    </Text>
                  </Popover.Item>}
                  <Popover.Item>
                    <Text
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setVisible(false)
                        const item = data.rowValue as IPerfilAplicacao;
                        const id = Number(data.rowValue.id);
                        getProfileId(id)
                        copiar(item);
                        
                      }}
                    >
                      Copiar
                    </Text>
                  </Popover.Item>
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
            onClose={() => {
            setName("");
            setDescricao("");
            }}
      >
            <Modal.Title>{acao}</Modal.Title>
            <Modal.Subtitle>Perfil de Acesso</Modal.Subtitle>
            {acao === "copiar" && 
            <Modal.Content>
                {/* <Text small>Deseja prosseguir com a cópia do perfil selecionado?</Text> */}
                <Text small>Nome</Text>
          <Input
            width="100%"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Text small>Descrição</Text>
          <Input
            width="100%"
            placeholder="Ex: Permitir deletar"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Modal.Content>
        }
        {acao === "editar" && 
        <Modal.Content>
          <Text small>Nome</Text>
          <Input
            width="100%"
            value={name}
            disabled={ true}
            // onChange={(e) => setName(e.target.value)}
          />
          <Text small>Descrição</Text>
          <Input
            width="100%"
            placeholder={descricao}
            // value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Modal.Content>
        }
        <Modal.Action passive onClick={() => setVisibleModal(false)} type="abort">
          CANCELAR
        </Modal.Action>
        <Modal.Action onClick={acao === "editar" ? updateProfile : copyProfile } >
          CONTINUAR
        </Modal.Action>
      </Modal>

    </>
}


export default ProfilePopover