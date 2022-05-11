import api from '@services/api';
import IEvento from './dtos/evento';

export default async function registerEvent(data: IEvento) {
  const response = await api.post('/nfe/controle/evento-sefaz', data);

  return response;
}
