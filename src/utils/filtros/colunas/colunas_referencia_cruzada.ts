export interface ICreateReferenciaCruzada {
    id?: number;
    id_empresa?: number;
    codigo_fornecedor?: number;
    item_fornecedor?: string;
    um_fornecedor?: string;
    item_cliente?: string;
    um_cliente?: string;
    fator_conversao?: number;
    data_hora_insert?: Date;
    data_hora_update?: Date;
    user_insert?: number;
    user_update?: number;
}

export const InitialDadosRef = {
    id: null,
    item_fornecedor: '---',
    um_fornecedor: '---',
    item_cliente: '---',
    um_cliente: '---',
    fator_conversao: 0,
    active: true
};

export interface ILabels {
    item_fornecedor?: string;
    um_fornecedor?: string;
    item_cliente?: string;
    um_cliente?: string;
    fator_conversao?: number;
}