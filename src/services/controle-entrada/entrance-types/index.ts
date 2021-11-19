import {CompanyProps, PlanoProps} from  "@pages/empresas"

export interface ControlDataProps {
    id: number;
    placa_principal: string;
    placa_reboque1: string;
    placa_reboque2: string;
    placa_reboque3: string;
    status: number;
    descricao_status: string;
    data_entrada: Date;
    data_saida: Date;
    peso_cheio: number;
    peso_vazio: number;
    unidade_medida: string;
    rg_motorista: string;
    empresa: CompanyProps;
    plano: PlanoProps;
    motorista: {
        id: number;
        rg: string;
        nome: string;
    }
    entradas_notas: string[];
}

