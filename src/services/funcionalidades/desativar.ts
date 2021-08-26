import api from "../api";

export default async function desativar(codigo_id: number) {
  return await api.delete(`/funcionalidades`, {
    data: { codigo_id },
  });
}
