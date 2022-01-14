export interface CteProps {
    informacoes_cte: {
        nCT: string;
        serie: string;
        dhEmi: Date;
        dEmi: Date;
    }
    emitente: {
        CNPJ: string;
        xNome: string;
    };

    informacoes_noraml_substituto: {
        infDoc: {
            infNfe: {
                chave: string
            }
        }
    }
    versao: string
}

export interface CteXmlProps {
        informacoes_cte: {
            mod: string;
            serie: string;
            cCT: string;
            nCT: string;
            verProc: string;
            dhEmi: string;
            dEmi: string;
            dhSaiEnt: string;
            modal: string;
            tpServ: string;
            nCFOP: string;
            tpEmis: string;
            xMunFim: string;
            UFFim: string;
            UFIni: string;
            xMunIni: string;
        };
        total: {
            ICMSTot: { vNF: string };
        };
    
        emitente: {
            xNome: string;
            xFant: string;
            CNPJ: string;
            CNAE: string;
            IM: string;
            enderEmit: {
            fone: string;
            UF: string;
            nro: string;
            CEP: string;
            xBairro: string;
            xPais: string;
            xMun: string;
            xLgr: string;
            };
            IE: string;
        };
        remetente: {
            xNome: string;
            xFant: string;
            CNPJ: string;
            CNAE: string;
            IM: string;
            enderReme: {
            fone: string;
            UF: string;
            nro: string;
            CEP: string;
            xBairro: string;
            xPais: string;
            xMun: string;
            xLgr: string;
            };
            IE: string;
        };
        destinatario: {
            xNome: string;
            xFant: string;
            CNPJ: string;
            CNAE: string;
            IM: string;
            enderDest: {
            fone: string;
            UF: string;
            nro: string;
            CEP: string;
            xBairro: string;
            xPais: string;
            xMun: string;
            xLgr: string;
            };
            IE: string;
        };
        versao: string;
        impostos: {
            ICMS: {
            ICMS00: { CST: string; vBC: string; vICMS: string; pICMS: string};
            ICMS20: { CST: string; vBC: string; pRedBC: string; vICMS: string; pICMS: string };
            ICMS45: { CST: string;};
            ICMS60: { CST: string; vBCSTRet: string; vICMSSTRet: string; pICMSSTRet: string };
            ICMS90: { CST: string; pRedBC: string; vBC: string; pICMS: string; vICMS: string };
            ICMSOutraUF: {
                CST: string;
                pRedBCOutraUF: string;
                vBCOutraUF: string;
                pICMSOutraUF: string;
                vICMSOutraUF: string;
            };
            ICMSSN: {
                CST: string;
                indSN: string;
                vTotTrib: string;
                infAdFisco: string;
            };
            };
        };
        valores_servicos: {
            vTPrest: string;
            vRec: string
        };
        sefaz: {
            status: string;
            descricao: string;
        };
    
}

export interface AbaProps {
    data: CteXmlProps
}