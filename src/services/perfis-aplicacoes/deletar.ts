import api from "../api";

export default async function deletar(id: number) {
  return await api.delete(`/perfis/aplicacoes/empresas/${id}`);
}
