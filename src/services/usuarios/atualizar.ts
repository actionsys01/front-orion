import api from "@services/api";

interface IUsuario {
  senha?: string;
  perfil?: string;
  nome?: string;
  id?: number;
}

export default async function atualizar(data: IUsuario) {
  const response = await api.put(`/usuarios/${data.id}`, {
    nome: data.nome, senha: data.senha, perfil: data.perfil
  } );

  return response;
}
