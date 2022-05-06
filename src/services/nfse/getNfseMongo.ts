import api from '@services/api';

export default async function getNfseMongo(chave: string) {
  const response = await api.get(`/nfse/xml/${chave}`);

  return response;
}
