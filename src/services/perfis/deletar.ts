import api from "../api";

export default async function deletar(perfil_id: number) {
  return await api.delete(`/perfis/empresas/${perfil_id}`);
}
