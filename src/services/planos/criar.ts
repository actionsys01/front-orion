import api from "@services/api";

interface ICreatePlainDTO {
    id : number;
    nome : string;
    desconto : number;
    usuarios : number;
    notas : number;
    valor : number;
    dias : number;
    aplicacoes : number[];
}

export default async function criar(data: ICreatePlainDTO) {
    const response = await api.post("planos", data);
    return response
}