import api from '@services/api';
import { IUpdateRegrasBusca } from './types';

export default async function UpdateRegrasBusca(data: IUpdateRegrasBusca) {
    const response = await api.put('/regras-busca/', data);
    return response;
}