import api from '@services/api';

export default async function GetConfigById(id: number) {
  const response = await api.get(`/cadastro-config/${id}`);

  return response;
}
