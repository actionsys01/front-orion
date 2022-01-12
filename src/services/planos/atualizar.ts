import api from "@services/api";

interface IUpdatePlanoDTO {
    id : number
    nome : string;
    desconto : number;
    usuarios : number;
    descricao: string;
    notas : number;
    valor : number;
    dias : number;
    aplicacoes : number[];
}

export default async function atualizar(data: IUpdatePlanoDTO) {
    const response = await api.put(`/planos/update`, data);
    return response
}