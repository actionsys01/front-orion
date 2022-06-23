import api from '@services/api';
import { ICreateReferenciaCruzada } from '../types/index';

export default async function CreateReferenciaCruzada(data: ICreateReferenciaCruzada) {
  console.log('data service',data)
  const response = await api.post('/referencia-cruzada', data);
  return response;
}
