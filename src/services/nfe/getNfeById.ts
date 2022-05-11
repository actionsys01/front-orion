import api from '@services/api';

export default async function getNfeById(key: string, company_id: number) {
  const response = await api.get(`/nfe/${key}`, {
    params: {
      company_id,
    },
  });
  return response;
}
