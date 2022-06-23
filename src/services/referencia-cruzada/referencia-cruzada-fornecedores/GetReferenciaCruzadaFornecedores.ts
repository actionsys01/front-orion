import api from '@services/api';

export default async function GetReferenciaCruzadaFornecedores( refCruzada, page: number,) {
  
  const filters = refCruzada?.reduce((acc, { campo, valor, compare }) => {

    if (compare === 'different') {
      campo = `${campo}_${compare}`;
    }

    if (compare === 'contain') {
      campo = `${campo}_${compare}`;
    }
    if (compare === 'above') {
      campo = `${campo}_${compare}`;
    }
    if (compare === 'lower') {
      campo = `${campo}_${compare}`;
    }
    return { ...acc, [campo]: valor };
  }, {});
  const response = await api.get('/pessoas/paginate', {
    params: {
      page: page,
      ...filters,
    },
  });

  return response;
}