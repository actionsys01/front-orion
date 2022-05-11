import api from '@services/api';

export default async function getNfeData(chave: string, company_id: number) {
  const response = await api.get(`/nfe/xml/${chave}`, {
    params: {
      company_id,
    },
  });
  return response;
}
