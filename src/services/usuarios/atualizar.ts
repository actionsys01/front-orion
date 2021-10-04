import api from "@services/api";

interface IUsuario {
  perfil?: string;
  nome?: string;
  id?: number;
}

export default async function atualizar(data: IUsuario) {
  const response = await api.put(`/usuarios/${data.id}`, {
    nome: data.nome, perfil: data.perfil
  } );

  return response;
}
