import api from "@services/api";

export default async function dashboardRequest(id: number){
    const response = await api.get(`/empresas/dashboard/${id}`)
    return response
}