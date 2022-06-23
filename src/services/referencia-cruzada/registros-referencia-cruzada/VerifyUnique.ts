import api from '@services/api';

export default async function VerifyUnique(item_fornecedor: string, codigo_fornecedor: number, id_empresa: number, dados) {
  // console.log('dados', dados)
  const response = await api.get(`/referencia-cruzada/verify/${item_fornecedor}/${codigo_fornecedor}/${id_empresa}`, {
  });

  return response;
}
