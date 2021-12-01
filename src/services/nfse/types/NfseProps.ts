export interface NfseProps {
    id: number,
    chave_nota: string,
    empresa_id: number,
    nota: string,
    emit_cnpj: string,
    emit_nome: string,
    dest_cnpj: string,
    dest_nome: string,
    serie: number,
    prefeitura_status: number,
    dt_hr_emi: string,
    dt_hr_receb: string
}