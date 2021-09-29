import api from "@services/api";

export default async function deletar(perfil_id: number) {
  return await api.delete(`/perfil/${perfil_id}`);
}
