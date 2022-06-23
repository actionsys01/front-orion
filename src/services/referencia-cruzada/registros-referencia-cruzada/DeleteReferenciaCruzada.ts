import api from '@services/api';

export default async function DeleteReferenciaCruzada(id: number) {
    const response = await api.delete(`/referencia-cruzada/${id}`);

    return response;
}
