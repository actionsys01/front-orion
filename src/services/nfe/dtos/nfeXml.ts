export interface nfeXmlProps {
     informacoes_nfe: {
            mod: string;
            serie: string;
            nNF: string;
            verProc: string;
            dEmi: string;
            dhEmi: string;
            dhSaiEnt: string;
            hSaiEnt: string;
            dSaiEnt: string;
            NFref: [
              {
                refNFe: string;
                refNF: {
                  cUF: string;
                  AAMM: string;
                  CNPJ: string;
                  mod: string;
                  serie: string;
                  nNF: string;
                };
                refECF: { nCOO: string; nECF: string };
              }
            ]
          | {
              refNFe: string;
              refNF: {
                cUF: string;
                AAMM: string;
                CNPJ: string;
                mod: string;
                serie: string;
                nNF: string;
              };
              refECF: { nCOO: string; nECF: string };
            };
          };
          versao: string;
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
          total: {
            ICMSTot: {
              vNF: string;
              vICMS: string;
              vBCST: string;
              vBC: string;
              vST: string;
              vProd: string;
              vFrete: string;
              vSeg: string;
              vDesc: string;
              vII: string;
              vIPI: string;
              vOutro: string;
              vCOFINS: string;
              vPIS: string;
              vICMSDeson: string;
            };
          }
          produtos_servicos: {
            nItem: string;
            prod: {
              cProd: string;
              NCM: string;
              xPed: string;
              uCom: string;
              uTrib: string;
              vUnTrib: string;
              vTotTrib: string;
              vOutro: string;
              EXTIPI: string;
              vDesc: string;
              nFCI: string;
              rastro:
              | [
                  {
                    nLote: string;
                    dVal: string;
                    qLote: string;
                    dFab: string;
                  }
                ]
              | { nLote: string; dVal: string; qLote: string; dFab: string };
            }
          } | [
            nItem: string,
            prod: {
              cProd: string;
              NCM: string;
              xPed: string;
              uCom: string;
              uTrib: string;
              vUnTrib: string;
              vTotTrib: string;
              vOutro: string;
              EXTIPI: string;
              vDesc: string;
              nFCI: string;
              rastro:
              | [
                  {
                    nLote: string;
                    dVal: string;
                    qLote: string;
                    dFab: string;
                  }
                ]
              | { nLote: string; dVal: string; qLote: string; dFab: string };
            }
          ]
          transporte: {
            modFrete: string;
            transporta: {
              xNome: string;
              xMun: string;
              CNPJ: string;
              IE: string;
              UF: string;
              xEnder: string;
            };
            vol:
              | [{ qVol: string; esp: string; marca: string; nVol: string }]
              | { qVol: string; esp: string; marca: string; nVol: string };
          };
          cobranca: {
            dup:
              | [
                  {
                    nDup: string;
                    dVenc: string;
                    vDup: string;
                  }
                ]
              | { nDup: string; dVenc: string; vDup: string };
          };
          informacoes_adicionais: {
            infCpl: string;
            infAdFisco: string;
            compra: {
              xNEmp: string;
              xPed: string;
              xCont: string;
            };
          };
}