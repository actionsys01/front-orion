export interface CreateProductDTOS {
  id_empresa: number;
  sku: number;
  cod_produto: string;
  ean?: string;
  desc_produto?: string;
  comprado_produzido?: string;
  empacotado?: boolean;
  inform_adicionais?: string;
  classe_contabil?: string;
  origem?: string;
  controle_rastro?: boolean;
  lote?: string;
  peso?: number;
  um_peso?: string;
  volume?: number;
  um_volume?: string;
  um_primaria?: string;
  um_secundaria?: string;
  um_compras?: string;
  cnm?: string;
  fci?: string;
  finalidade_compra?: string;
  url_foto?: string;
  cod_categoria_1?: string;
  cod_categoria_2?: string;
  cod_categoria_3?: string;
  cod_categoria_4?: string;
  cod_categoria_5?: string;
  cod_categoria_act_1?: string;
  cod_categoria_act_2?: string;
  cod_categoria_act_3?: string;
  cod_categoria_act_4?: string;
  cod_categoria_act_5?: string;
  ativo?: boolean;
  user_insert: number;
}

export interface UpdateProductDTOS {
  id: number;
  id_empresa: number;
  sku: number;
  cod_produto?: string;
  ean?: string;
  desc_produto?: string;
  comprado_produzido?: string;
  empacotado?: boolean;
  inform_adicionais?: string;
  classe_contabil?: string;
  origem?: string;
  controle_rastro?: boolean;
  lote?: string;
  peso?: number;
  um_peso?: string;
  volume?: number;
  um_volume?: string;
  um_primaria?: string;
  um_secundaria?: string;
  um_compras?: string;
  cnm?: string;
  fci?: string;
  finalidade_compra?: string;
  url_foto?: string;
  cod_categoria_1?: string;
  cod_categoria_2?: string;
  cod_categoria_3?: string;
  cod_categoria_4?: string;
  cod_categoria_5?: string;
  cod_categoria_act_1?: string;
  cod_categoria_act_2?: string;
  cod_categoria_act_3?: string;
  cod_categoria_act_4?: string;
  cod_categoria_act_5?: string;
  ativo?: boolean;
  user_update: number;
}
