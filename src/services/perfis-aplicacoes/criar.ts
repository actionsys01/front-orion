import api from "../api";

interface IPerfil {
  nome: string;
  perfil_id: number;
  acao: string;
  descricao: string;
  codigo_id: number;
}

export default async function criar(data: IPerfil) {
  const response = await api.post(`/perfis/aplicacoes/empresas`, data);
  return response;
}
