import api from '@services/api';
import { ICreateRegrasBusca } from './types';

export default async function CreateRegrasDeBusca(data: ICreateRegrasBusca) {
  const response = await api.post('/referencia-cruzada', data);
  return response;
}
