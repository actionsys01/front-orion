import api from '@services/api';
import { CreateProductDTOS } from './types';

export default async function CreateProduct(data: CreateProductDTOS) {
  const response = await api.post('/produtos', data);

  return response;
}
