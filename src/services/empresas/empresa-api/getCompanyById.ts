import api from '@services/api';

export default async function getCompanyById(company_id: number) {
  const response = await api.get(`/empresas/${company_id}`);
  return response;
}
