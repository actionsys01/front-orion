import api from '@services/api';
import { UpdateProductDTOS } from './types';

export default async function UpdateProduct(data: UpdateProductDTOS) {
  const response = await api.put('/produtos', data);

  return response;
}
