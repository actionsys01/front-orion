import api from '@services/api';
import { ICreateRegrasBusca } from './types';

export default async function CreateRegrasDeBusca(data: ICreateRegrasBusca) {
  const response = await api.post('/regras-busca', data);
  return response;
}
