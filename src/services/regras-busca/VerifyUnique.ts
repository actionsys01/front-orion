import api from '@services/api';

export default async function VerifyUnique(id_empresa: number, cnpj_emitente: string, tipo_nota: string, tipo_informacao: string) {
  // console.log('dados', dados)
  const response = await api.get(`/referencia-cruzada/verify/${id_empresa}/${cnpj_emitente}/${tipo_nota}/${tipo_informacao}`, {
  });

  return response;
}
