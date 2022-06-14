import api from '@services/api';

export default async function GetConfigById(id: number, dados) {
  // console.log('dados', dados)
  const response = await api.get(`/referencia-cruzada/${id}`, {
  });

  return response;
}
