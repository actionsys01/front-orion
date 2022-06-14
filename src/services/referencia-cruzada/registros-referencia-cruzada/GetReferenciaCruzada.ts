import api from '@services/api';

export default async function GetReferenciaCruzada(refCruzada, codigo_fornecedor: number,page: number) {
  
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
  const response = await api.get(`/referencia-cruzada/fornec/${codigo_fornecedor}`, {
    params: {
      page: page,
      ...filters,
    },
  });

  return response;
}