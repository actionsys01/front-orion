import api from "@services/api";

export default async function getHistorico(company_id : number, key : string) {
    const response = await api.get('/historico/', {
        params: {
            company_id,
            key
        }
    })
    return response
}

