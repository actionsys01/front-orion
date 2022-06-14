export interface IPessoas {
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


export const InitialDadosPessoas = {
    id: null,
    codigo_pessoa: null,
    id_empresa: null,
    tipo_pessoa: '',
    nome: '',
    apelido: '',
    cnpj: '',
    finalidade_principal: null,
    inscricao_estadual: '',
    inscricao_municipal: '',
    inscricao_suframa: '',
    cod_categoria_1: '',
    cod_categoria_2: '',
    cod_categoria_3: '',
    cod_categoria_4: '',
    cod_categoria_5: '',
    cod_categoria_act_1: '',
    cod_categoria_act_2: '',
    cod_categoria_act_3: '',
    cod_categoria_act_4: '',
    cod_categoria_act_5: '',
    ativo: null,
    user_insert: '',
    user_update: '',
    data_hora_inativacao: null,
    data_hora_insert: null,
    data_hora_update: null,
    contato_id: null,
    endereco_id: null,
}
