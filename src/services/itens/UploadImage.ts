import api from '@services/api';

export default async function UploadImage(id: number, file: File) {
  const formData = new FormData();
  formData.append('url_foto', file);

  const response = await api.patch(`/produtos/img/${id}`, formData);

  return response;
}
