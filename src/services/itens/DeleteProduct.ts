import api from '@services/api';

export default async function DeleteProduct(id: number) {
  const response = await api.delete(`/produtos/${id}`);

  return response;
}
