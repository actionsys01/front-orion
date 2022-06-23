
export interface ICreateReferenciaCruzada {
    codigo_fornecedor: number;
    item_fornecedor?: string;
    um_fornecedor?: string;
    item_cliente?: string;
    um_cliente?: string;
    fator_conversao?: number;
}

export interface IUpdateReferenciaCruzada {
    id: number;
    id_empresa: number;
    codigo_fornecedor: number;
    item_fornecedor?: string;
    um_fornecedor?: string;
    item_cliente?: string;
    um_cliente?: string;
    fator_conversao?: number;
}

export interface IGatheredDados {
    id: number,
    option: JSX.Element;
    id_empresa: number,
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

export interface IDados {
    [x: string]: any;
    id: number;
    item_fornecedor?: string;
    um_fornecedor?: string;
    item_cliente?: string;
    um_cliente?: string;
    fator_conversao?: number;
    data_hora_insert?: Date;
    data_hora_update?: Date;
    user_insert?: number;
    user_update?: number;
    active: boolean;
}


export interface IFornecedores {
    id?: number;
    codigo_pessoa?: number;
    id_empresa?: number;
    tipo_pessoa?: string;
    nome?: string;
    apelido?: string;
    cnpj?: string;
    finalidade_principal?: string;
    inscricao_estadual?: number;
    inscricao_municipal?: string;
    inscricao_suframa?: string;
    cod_categoria_1?: string;
    cod_categoria_2?: string;
    cod_categoria_3?: string;
    cod_categoria_4?: string;
    cod_categoria_5?: string;
    cod_categoria_act_1: string;
    cod_categoria_act_2: string;
    cod_categoria_act_3: string;
    cod_categoria_act_4: string;
    cod_categoria_act_5: string;
    ativo: boolean;
    user_insert: number;
    user_update: number;
    data_hora_inativacao?: Date;
    data_hora_insert?: Date;
    data_hora_update?: Date;
    contato_id: number;
    endereco_id: number;
}

export interface IExcelFileRequest {
    id_empresa: number;
    arquivo: string;
    status: number;
    desc_status: string;
}