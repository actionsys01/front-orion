import api from "@services/api";

export default async function buscar(chave_nota: string) {
  const response = await api.get(`/ctes/${chave_nota}`);
  return response;
}
