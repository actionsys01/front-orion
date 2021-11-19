import api from "@services/api";


interface UpdateCnpjToCompany {
    cnpj : string;
    nome : string;
    nsu  : string;
    uf : string;
    status_sefaz : number;
}

export default async function updateCnpj(id : number, data: UpdateCnpjToCompany) {
    const response = await api.put(`/empresas/cnpj/${id}`, data)
    
    return response
}