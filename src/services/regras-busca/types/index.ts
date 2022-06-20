export interface IRegrasBusca {
    id?: number,
    id_empresa?: number,
    cnpj_emitente?: string,
    tipo_nota?: string,
    tipo_informacao?: string,
    tag_xml?: string,
    dado_inicio?: string,
    dado_final?: string,
    data_hora_insert?: Date;
    data_hora_update?: Date;
    user_insert?: number;
    user_update?: number;
}

export interface ICreateRegrasBusca {
    id?: number,
    id_empresa?: number,
    cnpj_emitente?: string,
    tipo_nota?: string,
    tipo_informacao?: string,
    tag_xml?: string,
    dado_inicio?: string,
    dado_final?: string,
    data_hora_insert?: Date;
    data_hora_update?: Date;
    user_insert?: number;
    user_update?: number;
}
export interface IUpdateRegrasBusca {
    id?: number,
    id_empresa?: number,
    cnpj_emitente?: string,
    tipo_nota?: string,
    tipo_informacao?: string,
    tag_xml?: string,
    dado_inicio?: string,
    dado_final?: string,
    data_hora_insert?: Date;
    data_hora_update?: Date;
    user_insert?: number;
    user_update?: number;
}