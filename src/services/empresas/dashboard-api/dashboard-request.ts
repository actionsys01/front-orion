import api from "@services/api";

export default async function dashboardRequest(id: number, date: string){
    const response = await api.get(`/empresas/dashboard/${id}`, {
        params: {
            date
        }
    })
    return response
}