import api from '@services/api';

interface UpdateCnpjToCompany {
  cnpj: string;
  nome: string;
  nfe: boolean;
  cte: boolean;
  uf: string;
  status_sefaz: number;
}

export default async function updateCnpj(
  id: number,
  data: UpdateCnpjToCompany,
) {
  console.log('data update', data);
  const response = await api.put(`/empresas/cnpj/${id}`, data);

  return response;
}
