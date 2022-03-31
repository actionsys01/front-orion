import api from '@services/api';

export default async function GetProductsPagination(page, itens, companyId) {
  // console.log('itens', itens);
  // console.log('companyId', companyId)
  const filters = itens?.reduce((acc, { campo, valor, compare }) => {
    if (compare !== 'equal') {
      campo = `${campo}_${compare}`;
    }
    return { ...acc, [campo]: valor };
  }, {});
  const response = await api.get('/produtos/pagination', {
    params: {
      page: page,
      companyId: companyId,
      ...filters,
    },
  });

  return response;
}
