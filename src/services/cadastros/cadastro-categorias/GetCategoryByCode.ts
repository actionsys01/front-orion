import api from '@services/api';

export default async function GetCategoryByCode(id: number, categorias) {
  const filters = categorias?.reduce((acc, { campo, valor, compare }) => {
    if (compare === 'contain') {
      campo = `${campo}_${compare}`;
    }
    return { ...acc, [campo]: valor };
  }, {});
  const response = await api.get('/categorias', {
    params: {
      id,
      ...filters,
    },
  });

  return response;
}
