import api from '@services/api';

export default async function GetRegrasBuscaById(id: number) {
  // console.log('dados', dados)
  const response = await api.get(`/regras-busca/${id}`, {
  });

  return response;
}
