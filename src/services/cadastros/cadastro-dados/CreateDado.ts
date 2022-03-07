import api from '@services/api';
import { ICreateDados } from '../types/index';

export default async function CreateDado(data: ICreateDados) {
  const response = await api.post('/cadastro-dados', data);
  return response;
}
