import api from '@services/api';

export default async function GetProductsPagination(page, itens) {
  // console.log('itens', itens);
  const filters = itens?.reduce((acc, { campo, valor, compare }) => {
    if (compare !== 'equal') {
      campo = `${campo}_${compare}`;
    }
    return { ...acc, [campo]: valor };
  }, {});
  const response = await api.get('/produtos/pagination', {
    params: {
      page: page,
      ...filters,
    },
  });

  return response;
}
