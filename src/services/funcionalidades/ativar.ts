import api from "../api";

export default async function ativar(codigo_id: number) {
  return await api.post(`/funcionalidades`, {
    codigo_id,
  });
}
