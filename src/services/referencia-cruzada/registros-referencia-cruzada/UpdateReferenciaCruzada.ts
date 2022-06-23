import api from '@services/api';
import { IUpdateReferenciaCruzada } from '../types';

export default async function UpdateReferenciaCruzada(data: IUpdateReferenciaCruzada) {
    const response = await api.put('/referencia-cruzada/', data);
    return response;
}