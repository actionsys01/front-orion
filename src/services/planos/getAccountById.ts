import api from "@services/api";

export default async function getAccountById(id: number) {
    const response = await api.get(`/planos/${id}`);
    return response
}