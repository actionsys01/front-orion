import api from '@services/api';

export default async function DeleteConfig(id: number) {
  await api.delete(`/cadastro-config/${id}`);
}
