import { ControlDataProps } from '@services/controle-entrada/entrance-types';

export interface INfeDto {
  xml: string;
  chave_nota: string;
  empresa_id: number;
  nota: string;
  emit_cnpj: string;
  dest_cnpj: string;
  emit_nome: string;
  dest_nome: string;
  serie: string;
  dt_hr_emi: Date;
  sefaz_status: number;
  sefaz_status_desc: string;
  fisico_status: number;
  fisico_status_dt_hr: Date;
  sefaz_status_dt_hr: string;
  diverg_status: number;
  diverg_status_dt_hr: string;
  frete_vinc_nfe_status: number;
  frete_vinc_nfe_status_dt_hr: Date;
  integracao_status: number;
  integracao_status_dt_hr: Date;
  portaria_status: number;
  portaria_status_ent_dt_hr: Date;
  portaria_status_sai_dt_hr: Date;
  criado_em: string;
  atualizado_em: Date;
  criado_por: string;
  atualizado_por: string;
  criado_por_ip: string;
  atualizado_por_ip: string;
  controle_entrada: ControlDataProps | null;
}

export default INfeDto;
