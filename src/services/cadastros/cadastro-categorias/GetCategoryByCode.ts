import api from '@services/api';

export default async function GetCategoryByCode(id: number) {
  const response = await api.get('/categorias', {
    params: {
      id,
    },
  });

  return response;
}
