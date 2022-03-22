import api from '@services/api';

export default async function GetProductByCode(cod_produto: string) {
  const response = await api.get('/produtos', {
    params: {
      cod_produto,
    },
  });

  return response;
}
