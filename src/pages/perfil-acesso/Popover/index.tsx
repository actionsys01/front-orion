import { Link, Modal, Popover, Text, Textarea, useModal, useToasts, Input } from "@geist-ui/react";
import { MoreHorizontal } from "@geist-ui/react-icons";
import { useCallback, useState } from "react";
import router from "next/router";
import {useSecurityContext} from "@contexts/security"
import {IPerfilAplicacao, IUpdateProfile, IPerfil} from "../index"
import * as perfil from "@services/perfis";
import api from "@services/api"

interface PopoverProps {
    data: any
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

const ProfilePopover: React.FC<PopoverProps> = ({ data }) => {
    const [visible, setVisible] = useState(false)
    const { setVisible: setVisibleModal, bindings } = useModal();
    const {profileUpdatePermission, profileDeletePermission} = useSecurityContext();
    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [empresaId, setEmpresaId] = useState<number>()
    const [perfilId, setPerfiId] = useState<number>();
    const [perfisAplicacoes, setPerfisAplicacoes] = useState<ProfilePermissions[]>([]);
    // const [copiedId, setCopiedId] = useState<number | null>()
    const [copiedPermissions, setCopiedPermissions] = useState<number[]>([])
   
    const [acao, setAcao] = useState<"editar" | "cadastrar" | "copiar">(
        "cadastrar"
      );
      const [, setToast] = useToasts();

    const changeHandler = useCallback((next) => {
        setVisible(next)
      }, [])



       function copiar({
        nome,
        descricao,
        id
      }: Omit<IPerfilAplicacao,  "atualizadoEm" | "atualizadoPorIp" | "criadoEm" | "criadoPorIp">  ) {
        setAcao("copiar");
       
        setVisibleModal(true);
        setNome(`Cópia de ${nome}`);
        setDescricao(descricao);
        // getProfilePermissions(id)
      }
    
       async function editar({
        nome,
        descricao,
        id,
      }: Omit<IPerfilAplicacao, "atualizadoEm" | "atualizadoPorIp" | "criadoEm" | "criadoPorIp">) {
        setAcao("editar");
        setVisibleModal(true);
        setNome(nome);
        setDescricao(descricao);
        setPerfiId(id)
      }
    
     async function deletar({
        id,
      }: Omit<IPerfilAplicacao, "nome" | "descricao" | "atualizadoEm" | "atualizadoPorIp" | "criadoEm" | "criadoPorIp">) {
        try {
          await perfil.deletar(id);
          
        } catch (error: any) {
          
          setToast({ text: "Houve um problema, por favor reinicie seu navegador.", 
            type: "warning" });
        }
        // const perfisAtualizados = perfisAplicacoes.filter(
        //   (perfil: IPerfilAplicacao) => perfil.id !== id
        // );
        // setPerfisAplicacoes(perfisAtualizados)
      }  

      // async function getProfilePermissions(id: number){
      //   const permissions = await api.get(`/perfil/search?profile_id=${id}`);
      //   const insideData: any = [];
      //   const profileData= permissions.data
      //   insideData.push(profileData)
      //   console.log("copy:",insideData);
      //   const arrayOfPermissions = insideData.map((item: any) => item.permissoes);
      //   // setPerfisAplicacoes(arrayOfPermissions)
      //   const final= arrayOfPermissions.map(({id}) => id)
      //   console.log("final",final);
      // }

      // console.log("outside:",perfisAplicacoes)

      async function copyProfile() {
          try {
            
            await perfil.criar({name: nome, descricao: descricao, permissions: copiedPermissions, empresa_id: Number(empresaId)})
          } catch (error) {
              setToast({
                  text: "Houve um problema com a operação, por favor tente novamente.",
                  type: "warning"
              })
          }
       
      }

      async function updateProfile() {
        if(!nome || !descricao) {
          setToast({
            text: "Informe todos os dados do usuário.",
            type: "warning"}); 
            return
        }
          router.push({
            pathname: "/atualizar-cadastro",
            query: { nome, descricao, perfilId },
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
            setNome("");
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
            placeholder={nome}
            disabled={ true }
            // onChange={(e) => setNome(e.target.value)}
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
            placeholder={nome}
            disabled={ true }
            // onChange={(e) => setNome(e.target.value)}
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
        <Modal.Action passive onClick={() => setVisibleModal(false)} type="abort">
          CANCELAR
        </Modal.Action>
        <Modal.Action onClick={updateProfile } >
          CONTINUAR
        </Modal.Action>
      </Modal>

    </>
}


export default ProfilePopover