import api from "@services/api";

export default async function getNfeData(chave: string, company_id: number) {
    const response = api.get(`/nfe/controle/${chave}`, {
        params: {
            company_id
        }
    });
    return response
}