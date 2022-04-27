import api from '@services/api';

interface UpdateDefinitiveTokenDTOS {
  id: number;
  user_update: number;
  token: string;
}

export default async function disableToken(data: UpdateDefinitiveTokenDTOS) {
  const response = await api.put('/empresas/tokens', data);

  return response;
}
