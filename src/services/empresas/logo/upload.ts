import api from "@services/api";


export default async function uploadLogo(company_id: number, data : any) {
    const formData = new FormData()
    formData.append('logo', data)

    const response = await api.patch(`/empresas/logo/${company_id}`, formData)
    return response
}