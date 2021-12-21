import api from "@services/api";

interface IUsuario {
  perfil?: string;
  nome?: string;
  id?: number;
  email?: string
}

export default async function atualizar(data: IUsuario) {
  const response = await api.put(`/usuarios/${data.id}`, data );

  return response;
}
