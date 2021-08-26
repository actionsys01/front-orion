import api from "../api";

export default async function deletar(id: number) {
  const response = await api.delete(`/usuarios/${id}`);
  return response;
}
