import api from "../api";

interface IUsuario {
  senha?: string;
  status?: boolean;
  perfil_id?: string;
  nome?: string;
  id?: number;
}

export default async function atualizar(data: IUsuario) {
  const response = await api.put(`/usuarios/${data.id}`, data);

  return response;
}
