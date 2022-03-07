import api from '@services/api';
import { IUpdateCadastroConfigDTO } from '../types';

export default async function UpdateConfig(data: IUpdateCadastroConfigDTO) {
  const response = await api.put('/cadastro-config/', data);
  return response;
}
