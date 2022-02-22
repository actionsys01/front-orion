import api from '@services/api';

export default async function getCertificate(company_id: number) {
  const response = api.get(`/empresas/certificado/${company_id}`);

  return response;
}
