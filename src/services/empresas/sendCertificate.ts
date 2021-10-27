import api from "@services/api";

export default async function sendCertificate(certificate: any, company_id: number) {
    const formData = new FormData()
    formData.append('certificado', certificate)

    const response = api.post(`/empresas/certificate/${company_id}`, formData);
    return response
}