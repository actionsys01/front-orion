export interface IConfigData {
  id: number;
  id_empresa: number;
  cod_categoria: string;
  aplicacao: string;
  desc_aplicacao: string;
  chave_1?: string;
  chave_2?: string;
  chave_3?: string;
  chave_4?: string;
  chave_5?: string;
  chave_6?: string;
  chave_7?: string;
  chave_8?: string;
  valor_string_1?: string;
  valor_string_2?: string;
  valor_string_3?: string;
  valor_string_4?: string;
  valor_string_5?: string;
  valor_string_6?: string;
  valor_string_7?: string;
  valor_string_8?: string;
  valor_string_9?: string;
  valor_string_10?: string;
  valor_number_1?: string;
  valor_number_2?: string;
  valor_number_3?: string;
  valor_number_4?: string;
  valor_number_5?: string;
  valor_date_1?: string;
  valor_date_2?: string;
  valor_date_3?: string;
  user_insert?: number;
  user_update?: number;
  cadastro_dados_id: IDados;
}

export interface IDados {
  [x: string]: any;
  // [x: string]: any;
  id: number;
  chave_1?: number;
  chave_2?: string;
  chave_3?: string;
  chave_4?: string;
  chave_5?: string;
  chave_6?: string;
  chave_7?: string;
  chave_8?: Date;
  cod_categoria: number;
  desc_aplicacao: string;
  valor_date_1?: Date;
  valor_date_2?: Date;
  valor_date_3?: Date;
  valor_number_1?: number;
  valor_number_2?: number;
  valor_number_3?: number | any;
  valor_number_4?: number | any;
  valor_number_5?: number | any;
  valor_string_1?: string;
  valor_string_2?: string;
  valor_string_3?: string;
  valor_string_4?: string;
  valor_string_5?: string;
  valor_string_6?: string;
  valor_string_7?: string;
  valor_string_8?: string;
  valor_string_9?: string;
  valor_string_10?: string;
  active: boolean;
}

export interface IDadosProps {
  [x: string]: any;
  // [x: string]: any;
  chave_1?: number;
  chave_2?: string;
  chave_3?: string;
  chave_4?: string;
  chave_5?: string;
  chave_6?: string;
  chave_7?: string;
  chave_8?: Date;
  cod_categoria: number;
  desc_aplicacao: string;
  valor_date_1?: Date;
  valor_date_2?: Date;
  valor_date_3?: Date;
  valor_number_1?: number;
  valor_number_2?: number;
  valor_number_3?: number | any;
  valor_number_4?: number | any;
  valor_number_5?: number | any;
  valor_string_1?: string;
  valor_string_2?: string;
  valor_string_3?: string;
  valor_string_4?: string;
  valor_string_5?: string;
  valor_string_6?: string;
  valor_string_7?: string;
  valor_string_8?: string;
  valor_string_9?: string;
  valor_string_10?: string;
  active: boolean;
}

export interface IUpdateCadastroConfigDTO {
  id: number;
  id_empresa: number;
  cod_categoria: string;
  aplicacao: string;
  chave_1?: string;
  chave_2?: string;
  chave_3?: string;
  chave_4?: string;
  chave_5?: string;
  chave_6?: string;
  chave_7?: string;
  chave_8?: string;
  desc_aplicacao: string;
  valor_string_1?: string;
  valor_string_2?: string;
  valor_string_3?: string;
  valor_string_4?: string;
  valor_string_5?: string;
  valor_string_6?: string;
  valor_string_7?: string;
  valor_string_8?: string;
  valor_string_9?: string;
  valor_string_10?: string;
  valor_number_1?: string;
  valor_number_2?: string;
  valor_number_3?: string;
  valor_number_4?: string;
  valor_number_5?: string;
  valor_date_1?: string;
  valor_date_2?: string;
  valor_date_3?: string;
  user_insert?: number;
  user_update?: number;
}

export interface IGatheredDados {
  id: number;
  option: JSX.Element;
  chave_1?: number;
  chave_2?: string;
  chave_3?: string;
  chave_4?: string;
  chave_5?: string;
  chave_6?: string;
  chave_7?: string;
  chave_8?: Date;
  cod_categoria: string;
  desc_aplicacao: string;
  valor_date_1?: Date;
  valor_date_2?: Date;
  valor_date_3?: Date;
  valor_number_1?: number;
  valor_number_2?: number;
  valor_number_3?: number | any;
  valor_number_4?: number | any;
  valor_number_5?: number | any;
  valor_string_1?: string;
  valor_string_2?: string;
  valor_string_3?: string;
  valor_string_4?: string;
  valor_string_5?: string;
  valor_string_6?: string;
  valor_string_7?: string;
  valor_string_8?: string;
  valor_string_9?: string;
  valor_string_10?: string;
}

export interface ICreateDados {
  // [x: string]: any;
  id_empresa: number;
  aplicacao: number;
  chave_1?: number;
  chave_2?: string;
  chave_3?: string;
  chave_4?: string;
  chave_5?: string;
  chave_6?: string;
  chave_7?: string;
  chave_8?: Date;
  cod_categoria: number;
  desc_aplicacao: string;
  valor_date_1?: Date;
  valor_date_2?: Date;
  valor_date_3?: Date;
  valor_number_1?: number;
  valor_number_2?: number;
  valor_number_3?: number;
  valor_number_4?: number;
  valor_number_5?: number;
  valor_string_1?: string;
  valor_string_2?: string;
  valor_string_3?: string;
  valor_string_4?: string;
  valor_string_5?: string;
  valor_string_6?: string;
  valor_string_7?: string;
  valor_string_8?: string;
  valor_string_9?: string;
  valor_string_10?: string;
}
