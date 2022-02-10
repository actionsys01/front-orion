import api from '@services/api';

export default async function getUsersByCompanyId(page: number) {
    const response = await api.get(`/usuarios/`, {
        params: {
            page,
        },
    });

    return response;
}
