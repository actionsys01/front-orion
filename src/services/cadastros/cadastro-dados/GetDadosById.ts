import api from '@services/api';

export default async function GetDadosById(id: number) {
  const response = await api.get(`/cadastro-dados/${id}`);

  return response;
}
