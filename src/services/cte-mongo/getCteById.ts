import api from "@services/api";

export default async function getCteById(chave_nota : string, empresa_id : number) {
    
    const response = await api.get(`/ctes/${chave_nota}`, {
        params: {
            empresa_id
        }
    })
    return response
}