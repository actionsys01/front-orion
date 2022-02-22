import api from '@services/api';

interface CertificateProps {
  company_id: number;
  certificado: string;
  senha: string;
  data_inicio: Date;
  data_vencimento: Date;
}

export default async function sendCertificate(
  certificate: any,
  data: CertificateProps,
) {
  const formData = new FormData();

  formData.append('certificado', certificate);
  formData.append('senha', data.senha);
  formData.append('data_inicio', data.data_inicio.toString());
  formData.append('data_vencimento', data.data_vencimento.toString());

  const response = api.post(
    `/empresas/certificado/${data.company_id}`,
    formData,
  );
  return response;
}
