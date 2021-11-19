import api from "@services/api";

interface CreateCnpjToCompany {
    cnpj : string;
    nome : string;
    nsu  : string;
    uf : string;
    status_sefaz : number;
}

export default async function createCnpj(company_id: number, data: CreateCnpjToCompany) {
    const response = await api.post(`/empresas/cnpj/${company_id}`, data)
    return response
}