import api from "@services/api";

export default async function getControlById(id : number) {
    const response = await api.get(`/portaria/controle-entrada/${id}`)
    return response
}