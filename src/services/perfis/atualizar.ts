import api from "../api";

interface IPerfil {
  descricao: string;
  id: number;
}

export default async function atualizar(data: IPerfil) {
  return await api.put(`/perfis/empresas/${data.id}`, data);
}
