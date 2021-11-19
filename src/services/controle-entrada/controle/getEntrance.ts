import api from "@services/api";


export default async function getEntrance(page: number, id: number) {
    const response = await api.get(`/portaria/controle-entrada/paginacao/${id}`, {
        params: {
            page
        }
    })
    return response
}