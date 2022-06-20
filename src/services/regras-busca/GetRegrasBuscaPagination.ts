import api from '@services/api';

export default async function GetRegrasBuscaPagination(regrasBusca,page: number) {
  
  const filters = regrasBusca?.reduce((acc, { campo, valor, compare }) => {

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
  const response = await api.get(`/regras-busca/pagination`, {
    params: {
      page: page,
      ...filters,
    },
  });

  return response;
}