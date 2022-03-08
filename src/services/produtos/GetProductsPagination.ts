import api from '@services/api';

export default async function GetProductsPagination(page: number) {
  const response = await api.get('/produtos/pagination', {
    params: {
      page,
    },
  });

  return response;
}
