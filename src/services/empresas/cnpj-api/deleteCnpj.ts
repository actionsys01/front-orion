import api from "@services/api";

export default async function deleteCnpj(id: number) {
    const response =  await api.delete(`/empresas/cnpj/${id}`)
    return response
}