import api from '@services/api';

export default async function GetConfigById(id: number, dados) {
  console.log('dados', dados)
  const filters = dados?.reduce((acc, { campo, valor }) => {
    // if (compare === 'contain') {
    //   campo = `${campo}_${compare}`;
    // }
    return { ...acc, [campo]: valor };
  }, {});

  const response = await api.get(`/cadastro-config/${id}`, {
    params: {
      ...filters,
    },
  });

  return response;
}
