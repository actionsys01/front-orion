import api from "../api";

export default async function buscar(id: number) {
  const response = await api.get(`/perfis/empresas/${id}`);
  return response;
}
