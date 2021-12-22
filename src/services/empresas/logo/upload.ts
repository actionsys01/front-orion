import api from "@services/api";

// interface UploadProps {
//     logo: string
// }

export default async function uploadLogo(company_id: number, data : any) {
    const formData = new FormData()
    formData.append('logo', data)

    const response = await api.post(`/empresas/log/${company_id}`, formData)
    return response
}