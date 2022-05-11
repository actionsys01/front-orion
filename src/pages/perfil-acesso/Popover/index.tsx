import {
  Modal,
  Text,
  useModal,
  useToasts,
  Input,
} from '@geist-ui/react';
import { useCallback, useState, Dispatch, SetStateAction } from 'react';
import router from 'next/router';
import { useSecurityContext } from '@contexts/security';
import { IPerfilAplicacao } from '../index';
import * as perfil from '@services/perfis';
import { useSession } from 'next-auth/client';
import { number } from 'yup';
import Popover from '@components/Popover';

interface PopoverProps {
  data: any;
  setPerfisAplicacoes: Dispatch<SetStateAction<IPerfilAplicacao[]>>;
  i: any;
}

interface CopyProfile {
  id: number;
  nome: string;
  descricao: string;
  atualizadoEm: string;
  atualizadoPorIp: string;
  criadoEm: string;
  criadoPorIp: string;
  permissões: ProfilePermissions;
}

interface ProfilePermissions {
  id: number;
  categoria: string;
  acao: string;
}

const ProfilePopover: React.FC<PopoverProps> = ({
  data,
  setPerfisAplicacoes,
  i
}) => {
  const [visible, setVisible] = useState(false);
  const { setVisible: setVisibleModal, bindings } = useModal();
  const { profilePermission } = useSecurityContext();
  const [name, setName] = useState<string>('');
  const [session] = useSession();
  const [descricao, setDescricao] = useState<string>('');
  const [empresaId, setEmpresaId] = useState<number>();
  const [perfilId, setPerfiId] = useState<number>(0);
  const [copiedPermissions, setCopiedPermissions] = useState<number[]>([]);

  const [acao, setAcao] = useState<
    'editar' | 'cadastrar' | 'copiar' | 'deletar'
  >('cadastrar');
  const [, setToast] = useToasts();

  const changeHandler = useCallback(next => {
    setVisible(next);
  }, []);

  async function getProfileId(id: number) {
    const response = await perfil.getProfileById(id);
    const profile = response.data.permissoes;
    const permissions = profile.map((item: any) => item.id);
    setCopiedPermissions(permissions);
  }

  // console.log('copiedPermissions', copiedPermissions);

  function copiar({
    nome,
    descricao,
  }: Omit<
    IPerfilAplicacao,
    'atualizadoEm' | 'atualizadoPorIp' | 'criadoEm' | 'criadoPorIp' | 'id'
  >) {
    setAcao('copiar');
    setName(`Cópia de ${nome}`);
    setDescricao(descricao);
    setVisibleModal(true);
  }

  function editar({
    nome,
    descricao,
    id,
  }: Omit<
    IPerfilAplicacao,
    'atualizadoEm' | 'atualizadoPorIp' | 'criadoEm' | 'criadoPorIp'
  >) {
    setAcao('editar');
    setName(nome);
    setDescricao(descricao);
    setPerfiId(id);
    setVisibleModal(true);
  }

  function deletar({
    id,
  }: Omit<
    IPerfilAplicacao,
    | 'nome'
    | 'descricao'
    | 'atualizadoEm'
    | 'atualizadoPorIp'
    | 'criadoEm'
    | 'criadoPorIp'
  >) {
    setAcao('deletar');
    setPerfiId(id);
    setVisibleModal(true);

    console.log(`perfilId`, perfilId);
  }

  async function deleteProfile() {
    const id: number | undefined = perfilId;
    try {
      await perfil.deletar(id);
      setPerfisAplicacoes(oldPerfisAplicacoes =>
        oldPerfisAplicacoes.filter(
          (perfil: IPerfilAplicacao) => perfil.id !== id,
        ),
      );
    } catch (error: any) {
      setToast({ text: error.response.data.mensagem, type: 'warning' });
    }
    setVisibleModal(false);
  }

  async function copyProfile() {
    try {
      const newProfileResponse = await perfil.criar({
        name: name,
        descricao: descricao,
        permissions: copiedPermissions,
        empresa_id: Number(session?.usuario.empresa.id),
      });
      setToast({
        text: 'Cópia realizada com sucesso.',
        type: 'success',
      });
      // console.log("new:",newProfileResponse.data);

      setPerfisAplicacoes(oldPerfisAplicacoes => [
        ...oldPerfisAplicacoes,
        newProfileResponse.data,
      ]);
    } catch (error) {
      setToast({
        text: 'Houve um problema com a operação, por favor tente novamente.',
        type: 'warning',
      });
    }
    setVisibleModal(false);
  }

  async function updateProfile() {
    if (!name || !descricao) {
      setToast({
        text: 'Informe todos os dados do usuário.',
        type: 'warning',
      });
      return;
    }
    router.push({
      pathname: '/atualizar-cadastro',
      query: { name, descricao, perfilId },
    });
  }

  return (
    <>
      <Popover
        num={i}
        quant={3}
        content={[
          {
            optionName: 'Editar',
            onClick: profilePermission.EDITAR
              ? () => {
                  const item = data as IPerfilAplicacao;
                  editar(item);
                }
              : () => '',
            className: profilePermission.EDITAR ? 'able' : 'disabled',
          },
          {
            optionName: 'Deletar',
            onClick: profilePermission.EXCLUIR
              ? () => {
                  const item = data as IPerfilAplicacao;
                  deletar(item);
                }
              : () => '',
            className: profilePermission.EXCLUIR ? 'able' : 'disabled',
          },
          {
            optionName: 'Copiar',
            onClick: () => {
              const item = data as IPerfilAplicacao;
              const id = Number(data.id);
              getProfileId(id);
              copiar(item);
            },
            className: 'able',
          },
        ]}
      />

      <Modal
        disableBackdropClick={true}
        {...bindings}
        onClose={() => {
          setName('');
          setDescricao('');
        }}
      >
        <Modal.Title>{acao}</Modal.Title>
        <Modal.Subtitle>Perfil de Acesso</Modal.Subtitle>
        {acao === 'deletar' && <h4>Deseja realmente excluir o perfil?</h4>}
        {acao === 'copiar' && (
          <Modal.Content>
            {/* <Text small>Deseja prosseguir com a cópia do perfil selecionado?</Text> */}
            <Text small>Nome</Text>
            <Input
              width="100%"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Text small>Descrição</Text>
            <Input
              width="100%"
              placeholder="Ex: Permitir deletar"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            />
          </Modal.Content>
        )}
        {acao === 'editar' && (
          <Modal.Content>
            <Text small>Nome</Text>
            <Input
              width="100%"
              value={name}
              disabled={true}
              // onChange={(e) => setName(e.target.value)}
            />
            <Text small>Descrição</Text>
            <Input
              width="100%"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            />
          </Modal.Content>
        )}
        <Modal.Action
          passive
          onClick={() => setVisibleModal(false)}
          type="abort"
        >
          CANCELAR
        </Modal.Action>
        <Modal.Action
          onClick={() =>
            acao === 'editar'
              ? updateProfile()
              : acao === 'copiar'
              ? copyProfile()
              : acao === 'deletar'
              ? deleteProfile()
              : null
          }
        >
          CONTINUAR
        </Modal.Action>
      </Modal>
    </>
  );
};

export default ProfilePopover;
