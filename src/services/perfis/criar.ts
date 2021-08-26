import api from "../api";

interface IPerfil {
  nome: string;
  descricao: string;
}

export default async function criar(data: IPerfil) {
  const response = await api.post(`/perfis/empresas`, data);
  return response;
}
