import api from '@services/api';

export default async function DeleteDado(id: number) {
  const response = await api.delete(`/cadastro-dados/${id}`);

  return response;
}
