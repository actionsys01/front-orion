import api from '@services/api';

interface IUpdateProfile {
    companyId: number;
    nome: string;
    descricao: string;
    permissoes: number[];
    profileId: number;
}

export default async function atualizar(data: IUpdateProfile) {
    return await api.put(`/perfil/${data.profileId}`, data);
}
