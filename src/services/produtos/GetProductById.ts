import api from '@services/api';

export default async function GetProductById(id: number) {
  const response = await api.get(`/produtos/${id}`);

  return response;
}
