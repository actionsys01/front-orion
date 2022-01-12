import api from "@services/api";

export default async function getCnpj(company_id: number, page?: number) {
    const response = await api.get(`/empresas/cnpj/${company_id}`, {
        params: {
            page
        }
    })

    return response
}