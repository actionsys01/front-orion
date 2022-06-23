import api from '@services/api';

export default async function DeleteRegrasBusca(id: number) {
    const response = await api.delete(`/referencia-cruzada/${id}`);

    return response;
}
