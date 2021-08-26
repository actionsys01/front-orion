import api from "../api";

interface IPerfil {
  nome: string;
  perfil_id: number;
}

export default async function atualizar(data: IPerfil) {
  return await api.put(`/perfis/aplicacoes/empresas`, data);
}
