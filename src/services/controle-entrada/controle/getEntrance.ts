import api from "@services/api";

interface IQueryParams {
    chave_nota?: string;
    status?: string;
    data_entrada?: string;
    data_saida?: string;
}

export default async function getEntrance(page: number, id: number, filters: IQueryParams ) {
    console.log("filtros na request",filters)
    const response = await api.get(`/portaria/controle-entrada/paginacao/${id}`, {
        params: {
            page,
            ...filters
        }
    })
    return response
}