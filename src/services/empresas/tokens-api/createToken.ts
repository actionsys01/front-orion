import api from '@services/api';

interface CreateDefinitiveTokenDTOS {
  empresa_id: number;
  user_insert: number;
}

export default async function createToken(data: CreateDefinitiveTokenDTOS) {
  const response = await api.post('/empresas/tokens', data);

  return response;
}
