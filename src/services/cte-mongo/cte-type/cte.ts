export interface CteProps {
    emitente: {
        CNPJ: string;
        xNome: string;
    };
    informacoes_cte: {
        nCT: string;
        serie: string;
        dhEmi: Date;
        dEmi: Date;
    }

    informacoes_noraml_substituto: {
        infDoc: {
            infNfe: {
                chave: string
            }
        }
    }
}