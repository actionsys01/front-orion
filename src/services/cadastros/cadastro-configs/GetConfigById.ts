import api from '@services/api';

export default async function GetConfigById(id: number, dados) {
  // console.log('dados', dados)
  const filters = dados?.reduce((acc, { campo, valor, compare }) => {
    if (compare === 'different') {
      campo = `${campo}_different`;
    }
    return { ...acc, [campo]: valor };
  }, {});
  // console.log('filters', filters)
  const response = await api.get(`/cadastro-config/${id}`, {
    params: {
      ...filters,
    },
  });

  return response;
}
