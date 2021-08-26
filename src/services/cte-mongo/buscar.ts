import api from "../api";

export default async function buscar(chave_nota: string) {
  const response = await api.get(`/nfes/${chave_nota}`);
  return response;
}
