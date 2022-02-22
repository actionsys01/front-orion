import api from '@services/api';

export default async function deleteCertificate(company_id: number) {
  const response = await api.delete(`/empresas/certificado/${company_id}`);

  return response;
}
