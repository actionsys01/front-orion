import api from "@services/api";

interface EntranceProps {
    rg_motorista: string;
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
    empresa: number;
    entradas_notas: string[];
}

export default async function create(data: EntranceProps) {
    return await api.post("/portaria/controle-entrada", data);
}