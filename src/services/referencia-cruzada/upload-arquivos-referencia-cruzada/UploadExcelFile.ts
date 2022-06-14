import api from '@services/api';
import { IExcelFileRequest } from '../types';

export default async function UploadExcelFile(
  arquivo: any,
  data: IExcelFileRequest,
) {
  const formData = new FormData();

  console.log('data', data)

  formData.append('arquivo', arquivo);
  formData.append('id_empresa', data.id_empresa.toString());
  formData.append('status', data.status.toString());
  formData.append('desc_status', data.desc_status);

  const response = await api.post('/referencia-cruzada/arquivos/upload', formData);

  return response;
}
