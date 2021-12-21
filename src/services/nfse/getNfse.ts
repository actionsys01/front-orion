import api from "@services/api";

export default async function getNfse(page: number, company_id: number) {
    const response = await api.get(`/nfse/pagination/${company_id}`, {
        params: {
            page: page
        }
    })
    return response
}