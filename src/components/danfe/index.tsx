import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import  {format} from "date-fns"
import JsBarcode from 'jsbarcode';

function Danfe(nfeData: any, nfeFrontData: any, products: any){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    // console.log("prodArray true", products)

    const gatheredNfeData: any = []
    const gatherInvoiceData = nfeData?.map((data: any) => {
        gatheredNfeData.push({
            ...data,
            emissionDate: (data.informacoes_nfe.dhEmi ? format(new Date(data.informacoes_nfe?.dhEmi), "dd/MM/yyyy") : data.informacoes_nfe.dEmi ? format(new Date(data.informacoes_nfe?.dEmi), "dd/MM/yyyy") : ""),
            receiveDate: (data.informacoes_nfe.dhSaiEnt ?  format(new Date(data.informacoes_nfe?.dhSaiEnt), "dd/MM/yyyy ") : data.informacoes_nfe.dSaiEnt ? format(new Date(data.informacoes_nfe?.dSaiEnt), "dd/MM/yyyy") : ""),
            emissionTime:  (data.informacoes_nfe.dhEmi ? format(new Date(data.informacoes_nfe?.dhEmi), "HH:mm:ss") : data.informacoes_nfe.dEmi ? format(new Date(data.informacoes_nfe?.dEmi), "HH:mm:ss") : ""),
            dup_vencimento: (data.cobranca ? format(new Date(data.cobranca.dup?.dVenc), "dd/MM/yyyy ") : ""),
            IPI: data.produtos_servicos.imposto?.IPI?.IPINT || data.produtos_servicos.imposto?.IPI?.IPITrib
        })
        return gatheredNfeData
     })


    const getNota = nfeFrontData?.map((item) => item.chave_nota)
    const chave_nota = getNota.toString()

    function textToBase64Barcode(text){
        if(text) {
            if(text?.startsWith("NFe")) {
                const chave = text.slice(3)
                var canvas = document.createElement("canvas");
                JsBarcode(canvas, chave, {format: "CODE128"});
                return canvas.toDataURL("image/png");
            } else {
                var canvas = document.createElement("canvas");
                JsBarcode(canvas, text, {format: "CODE128"});
                return canvas.toDataURL("image/png");
            }
        } 
    }

    const chaveBarcode = textToBase64Barcode(chave_nota)

    //Header
    const headerFirstRow = nfeFrontData.map((item: any) => {
        return [
            {image: chaveBarcode, fontSize: 4, width: 295, colSpan: 2, alignment: "center", border: [true, false, true, true]},
            {},
            {text: `NF-e\n Nº${item.nota}`, lineHeight: 1.5, fontSize: 10, bold: true, alignment: "center", border: [true, false, true, false]},
            
        ]
    });

    const headerSecondRow = nfeFrontData.map((item: any) => {
        return [
            {text: "", fontSize: 10,  alignment: "center", border: [true, false, true, true]} ,
            {text: "", fontSize: 9, alignment: "center", border: [true, false, true, true]},
            {text: `Série ${item.serie}`, alignment: "center", bold: true, border: [true, false, true, true]}
            
        ]
    });
    
    const generalFirstRow = nfeData.map((item: any) => {
        return [
            {text: "", alignment: "center", border: [true, false, true, false]},
            {text: "Documento Auxiliar da Nota\n Fiscal Eletrônica", alignment: "center",  fontSize: 7, border: [true, false, true, false]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, false]}
            
        ]
    });

    const generalSecondRow = nfeFrontData.map((item: any) => {
        return [
            {text: item.emit_nome , fontSize: 10,  alignment: "center", bold: true, border: [true, false, true, false]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, false]},
            {text: item.chave_nota, alignment: "center", bold: true, fontSize: 7, border: [true, false, true, true]}
            
        ]
    });
    
    const generalLastRow = nfeData.map((item: any) => {
        return [
            {text: `${item.emitente.enderEmit.xLgr}\n
            ${item.emitente.enderEmit.xBairro} - ${item.emitente.enderEmit.CEP}\n
            ${item.emitente.enderEmit.xMun} - Fone/Fax ${item.emitente.enderEmit.fone}`, 
            fontSize: 6, lineHeight: 0.5,  alignment: "center", border: [true, false, true, true], margin: [0, 0, 0, 10]},
            {text: `${item.informacoes_nfe.tpNF}\n\nNº${item.informacoes_nfe.nNF}\n Série ${item.informacoes_nfe.serie}`, bold: true, fontSize: 9, alignment: "center", border: [true, false, true, true]},
            {text: "Consulta de autenticidade no portal nacional da NF-e\n ww.nfe.fazenda.gov.br/portal ou no site da Sefaz Autorizadora",
            fontSize: 8.5, alignment: "center", lineHeight: 1.6, border: [true, true, true, true], margin: [0, 10, 0, 0]}
            
        ]
    });

    const hFooterlFirstRow = nfeData.map((item: any) => {
        return [
            {text: item.informacoes_nfe.natOp, fontSize: 7, bold: true, colSpan: 2,  alignment: "center", border: [true, false, true, true]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, true]},
            {text: "",fontSize: 4, border: [true, false, true, true]}
            
        ]
    });

    const hFooterSecondRow = nfeData.map((item: any) => {
        return [
            {text: item.emitente.IE, fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true]},
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]},
            {text: item.emitente.CNPJ,fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true]}
            
        ]
    });

    //DESTINATÁRIO / REMETENTE

    const emitenteFirstRow = gatheredNfeData.map((item: any) => {
        return [
            {text: item.destinatario.xNome, fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true]},
            {text: item.destinatario.CNPJ, fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true]},
            {text: item.emissionDate, fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true]},
            {text: item.receiveDate, fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true]},
            {text: item.emissionTime, fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true]}
            
        ]
    });

    const emitenteSecondtRow = nfeData.map((item: any) => {
        return [
            {text: item.destinatario.enderDest.xLgr, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            {text: item.destinatario.enderDest.xBairro, fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true]},
            {text: item.destinatario.enderDest.CEP, fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true]}
            
            
        ]
    });

    const emitenteThirdRow = nfeData.map((item: any) => {
        return [
            {text: item.destinatario.enderDest.xMun, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            {text: item.destinatario.enderDest.UF, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            {text: item.destinatario.enderDest.fone, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            {text: item.destinatario.IE, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            
        ]
    });


     
     // IMPOSTOS

    const impostoFirstRow = gatheredNfeData?.map((item: any) => {
       
        return [
            {text: item.total.ICMSTot.vBC, fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true]},
            {text: item.total.ICMSTot.vICMS, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            {text: item.total.ICMSTot?.vBCST, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            {text: item.total.ICMSTot?.vST, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            {text: item.total.ICMSTot.vII, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            {text: item.total.ICMSTot?.vPIS, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            {text: item.total.ICMSTot?.vProd, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]}
            
        ]
    });

    const impostoSecondRow = gatheredNfeData?.map((item: any) => {
       
        return [
            {text: item.total.ICMSTot?.vFrete, fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true]},
            {text: item.total.ICMSTot?.vSeg, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            {text: item.total.ICMSTot?.vDesc, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            {text: item.total.ICMSTot?.vOutro, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            {text: item.total.ICMSTot?.vIPI, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            {text: item.total.ICMSTot?.vCOFINS, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            {text: item.total.ICMSTot?.vNF, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]}
            
        ]
    });

// TRANSPORTE

    const tranportadorFirstRow = nfeData.map((item: any) => {
        return [
            {text: item.transporte.transporta?.xNome, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            {text: item.transporte.modFrete, fontSize: 7, bold: true, alignment: "center", border: [true, false, true, true]},
            {text: item.transporte.veicTransp?.RNTC, fontSize: 7, border: [true, false, true, true]},
            {text: item.transporte.veicTransp?.placa, fontSize: 7, bold: true, border: [true, false, true, true]},
            {text: item.transporte.transporta?.UF, fontSize: 7, bold: true, border: [true, false, true, true]},
            {text: item.transporte.transporta?.CNPJ, fontSize: 7, bold: true, border: [true, false, true, true]}
        ]
    });

    const tranportadorSecondRow = nfeData.map((item: any) => {
        return [
            {text: item.transporte.transporta?.xEnder, fontSize: 7, colSpan: 2, alignment: "center", bold: true, border: [true, false, true, true]},
            {text: "", fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true]},
            {text: item.transporte.transporta?.xMun, fontSize: 7, colSpan: 2, alignment: "center", bold: true, border: [true, false, true, true]},
            {text: "", fontSize: 7, bold: true, alignment: "center", border: [true, false, true, true]},
            {text: item.transporte.transporta?.UF, fontSize: 7, bold: true, alignment: "center", border: [true, false, true, true]},
            {text: item.transporte.transporta?.IE, fontSize: 7, bold: true, alignment: "center", border: [true, false, true, true]}
        ]
    });

    const tranportadorThirdRow = nfeData.map((item: any) => {
        return [
            {text: item.transporte.vol?.qVol, fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true]},
            {text: item.transporte.vol?.esp, fontSize: 7, bold: true, alignment: "center", border: [true, false, true, true]},
            {text: item.transporte.vol?.marca, fontSize: 7, alignment: "center", border: [true, false, true, true]},
            {text: item.transporte.vol?.nVol, fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true]},
            {text: item.transporte.vol?.pesoB, fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true]},
            {text: item.transporte.vol?.pesoL, fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true]}
        ]
    });

    // PRODUTOS 

    const produtosTable = products.map((item: any, i: any) => {
        const ICMS = (item.imposto?.ICMS?.ICMS00 || 
            item.imposto?.ICMS?.ICMS10 || 
            item.imposto?.ICMS?.ICMS20 || 
            item.imposto?.ICMS?.ICMS30 || 
            item.imposto?.ICMS?.ICMS40 || 
            item.imposto?.ICMS?.ICMS51 || 
            item.imposto?.ICMS?.ICMS60 || 
            item.imposto?.ICMS?.ICMS70 || 
            item.imposto?.ICMS?.ICMS90 || 
            item.imposto?.ICMS?.ICMSST);
            // console.log("icms mapped",ICMS)
        return [
            {text: item.prod.cProd, bold: true, fontSize: 6, alignment: "center", border: [true, false, true, false]},
            {text: item.prod?.xProd, bold: true, fontSize: 5, alignment: "center", border: [true, false, true, false]},
            {text: item.prod?.NCM, bold: true, fontSize: 5, alignment: "center", border: [true, false, true, false]},
            {text: ICMS.CST, fontSize: 5, alignment: "center", bold: true, border: [true, false, true, false]},
            {text: item.prod?.CFOP, bold: true, fontSize: 5, alignment: "center", border: [true, false, true, false]},
            {text: item.prod?.uCom, fontSize: 6, alignment: "center", bold: true, border: [true, false, true, false]},
            {text: item.prod?.qCom, bold: true, fontSize: 5, alignment: "center", border: [true, false, true, false]},
            {text: item.prod?.vUnCom, bold: true, fontSize: 5, alignment: "center", border: [true, false, true, false]},
            {text: item.prod?.vProd, bold: true, fontSize: 5, alignment: "center", border: [true, false, true, false]},
            {text: ICMS.vBC, fontSize: 5, bold: true, alignment: "center", border: [true, false, true, false]},
            {text: ICMS.vICMS, fontSize: 5, bold: true, alignment: "center", border: [true, false, true, false]},
            {text: ICMS.pICMS, fontSize: 5, bold: true, alignment: "center", border: [true, false, true, false]},
            {text: item.imposto.IPI?.IPITrib?.vIPI, fontSize: 5, bold: true, alignment: "center", border: [true, false, true, false]}
        ]
    })


    const produtosLastRow = nfeData.map((item: any) => {
        return [
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, true]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, true]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, true]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, true]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, true]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, true]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, true]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, true]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, true]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, true]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, true]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, true]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, true]}
        ]
    });

    // FOOTER

    const lastTable = gatheredNfeData.map((item: any) => {
        return [
            {text: item.informacoes_adicionais.infCpl, fontSize: 5, lineHeight: 1, alignment: "center", bold: true, border: [true, false, true, true]},
            {text: item.cobranca?.dup?.nDUP, fontSize: 5, lineHeight: 1, alignment: "center", bold: true, border: [true, true, false, true]},
            {text: item.dup_vencimento, fontSize: 5, lineHeight: 1, alignment: "center", bold: true, border: [false, true, false, true]},
            {text: item.cobranca?.dup?.vDup, fontSize: 5, lineHeight: 1, alignment: "center", bold: true, border: [false, true, true, true]},
        ]
    })

    const details: any = [
        { // header
            table:{
                headerRows: 1,
                widths: ['*', 200, '*'],
                heights: [1, 10, 1, 10],
                body: [
                    [
                        {text: '', style: 'tableHeader', colSpan: 2, border: [true, true, true, false]},
                        {text: "", rowSpan:3}, 
                        {text: '', style: 'tableHeader',  border: [true, true, true, false]},
                        
                    ],
                    ...headerFirstRow,
                    [
                        {text: 'DATA DE RECEBIMENTO',fontSize: 4, style: 'tableHeader', alignment: "center", border: [true, true, true, false]},
                        {text: 'IDENTIFICAÇÃO E ASSINATURA DO RECEBEDOR', fontSize: 4, style: 'tableHeader', alignment: "center", border: [true, true, true, false]}, 
                        {text :"",  border: [true, false, true, false]}
                    ],
                    ...headerSecondRow,
                ],
            }
        },
        {// general   
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: ['*', '*', 260],
                heights: [2, 12, 2, 2, 2],
                body: [
                    [
                        {text: "IDENTIFICAÇÃO DO EMITENTE", fontSize: 4, style: 'tableHeader',  border: [true, true, true, false]},
                        {text: 'DANFE',  alignment: "center", bold: true, style: 'tableHeader',  border: [true, true, true, false]}, 
                        {text: '', style: 'tableHeader',  border: [true, true, true, false]},
                        
                    ],
                    ...generalFirstRow,
                    [
                        {text: '', style: 'tableHeader', alignment: "center", border: [true, false, true, false]},
                        {text: '0 - Entrada \n 1 - Saída', fontSize: 7, style: 'tableHeader', alignment: "center", border: [true, false, true, false]}, 
                        {text :"CHAVE DE ACESSO", fontSize: 4, border: [true, true, true, false]}
                    ],
                    ...generalSecondRow,
                    ...generalLastRow,
                ],
            }
        }, { //final
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: ['*', '*', '*'],
                heights: [1, 10, 1, 10],
                body: [
                    [
                        {text: "NATUREZA DA OPERAÇÃO", colSpan: 2, fontSize: 4,  border: [true, true, true, false]},
                        {text: "",  border: [true, true, true, false]},
                        {text: "PROTOCOLO DE AUTORIZAÇÃO DE USO", fontSize: 4, border: [true, true, true, false]}
                    ],
                    ...hFooterlFirstRow,
                    [
                        {text: "INSCRIÇÃO ESTADUAL", fontSize: 4, border: [true, true, true, false]},
                        {text: "INSCRIÇÃO ESTADUAL DO SUBST. TRIBUT.", fontSize: 4, border: [true, true, true, false]},
                        {text: "CNPJ", fontSize: 4, border: [true, true, true, false]}
                    ],
                    ...hFooterSecondRow,
                ]
            }
        },
        {text: "DESTINATÁRIO / REMETENTE", fontSize:8, bold: true, margin: [0, 3, 0, 2]},
        {// emitente primeira fileira 
            table:{
                headerRows: 1,
                widths: [ 150, '*', '*', '*', '*'],
                heights: [1, 10],
                body: [
                    [
                        {text: "NOME /RAZÃO SOCIAL", fontSize: 4, border: [true, true, true, false]},
                        {text: "CNPJ /CPF", fontSize: 4, border: [true, true, true, false]},
                        {text: "DATA DE EMISSÃO", fontSize: 4, border: [true, true, true, false]},
                        {text: "DATA DE SAÍDA", fontSize: 4, border: [true, true, true, false]},
                        {text: "HORA DA EMISSÃO", fontSize: 4, border: [true, true, true, false]}
                    ],
                    ...emitenteFirstRow,
                ]
            }
        },
        { // emitente segunda fileira 
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ 250, '*', '*'],
                heights: [1, 10],
                body: [
                    [
                        {text: "ENDEREÇO", fontSize: 4, border: [true, true, true, false]},
                        {text: "BAIRRO/ DISTRITO", fontSize: 4, border: [true, true, true, false]},
                        {text: "CEP", fontSize: 4, border: [true, true, true, false]},
                    ],
                    ...emitenteSecondtRow,
                ]
            }
        },
        { // emitente terceira fileira 
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ 150, 30, '*', '*'],
                heights: [1, 10],
                body: [
                    [
                        {text: "MUNICÍPIO", fontSize: 4, border: [true, true, true, false]},
                        {text: "UF", fontSize: 4, border: [true, true, true, false]},
                        {text: "FONE /FAX", fontSize: 4, border: [true, true, true, false]},
                        {text: "INSCRIÇÃO ESTADUAL", fontSize: 4, border: [true, true, true, false]},
                    ],
                    ...emitenteThirdRow,
                ]
            }
        },
        {text: "CÁLCULO DE IMPOSTO", fontSize:8, bold: true, margin: [0, 3, 0, 2]},
        { // imposto primeira fileira 
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', '*', '*', '*', '*', '*','*'],
                heights: [1, 10, 1, 10],
                body: [
                    [
                        {text: "BASE DE CÁLCULO ICMS", fontSize: 4, alignment: "center", border: [true, true, true, false]},
                        {text: "VALOR ICMS", fontSize: 4, alignment: "center", border: [true, true, true, false]},
                        {text: "BASE CÁLC. ICMS S.T", alignment: "center", fontSize: 4, border: [true, true, true, false]},
                        {text: "VALOR ICMS SUBST", fontSize: 4, alignment: "center", border: [true, true, true, false]},
                        {text: "VALOR IMP IMPORTAÇÃO", fontSize: 4, alignment: "center", border: [true, true, true, false]},
                        {text: "VALOR DO PIS", fontSize: 4, alignment: "center", border: [true, true, true, false]},
                        {text: "VALOR TOTAL PRODUTOS", fontSize: 4, alignment: "center", border: [true, true, true, false]}
                    ],
                    ...impostoFirstRow,
                    [// imposto segunda fileira 
                        {text: "VALORDO FRETE", fontSize: 4, alignment: "center", border: [true, true, true, false]},
                        {text: "VALOR DO SEGURO", fontSize: 4, alignment: "center", border: [true, true, true, false]},
                        {text: "DESCONTO", fontSize: 4, alignment: "center", border: [true, true, true, false]},
                        {text: "OUTRAS DESPESAS", fontSize: 4, alignment: "center", border: [true, true, true, false]},
                        {text: "VALOR TOTAL IPI", fontSize: 4, alignment: "center", border: [true, true, true, false]},
                        {text: "VALOR DA CONFINS", fontSize: 4, alignment: "center", border: [true, true, true, false]},
                        {text: "VALOR TOTAL NOTA", fontSize: 4, alignment: "center", border: [true, true, true, false]}
                    ],
                    ...impostoSecondRow
                ]
            }
        },
        {text: "TRANSPORTADOR /VOLUME TRANSPORTADO", fontSize:8, bold: true, margin: [0, 3, 0, 2]},
        { // transportador primeira fileira 
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ 100, 100, '*', '*', 30, '*'],
                heights: [1, 10, 1, 10],
                body: [
                    [
                        {text: "NOME /RAZÃO SOCIAL", fontSize: 4, border: [true, true, true, false]},
                        {text: "FRETE POR CONTA", fontSize: 4, border: [true, true, true, false]},
                        {text: "CÓDIGO ANTT", fontSize: 4, border: [true, true, true, false]},
                        {text: "PLACA", fontSize: 4, border: [true, true, true, false]},
                        {text: "UF", fontSize: 4, border: [true, true, true, false]},
                        {text: "CNPJ /CPF", fontSize: 4, border: [true, true, true, false]}
                    ],
                    ...tranportadorFirstRow,
                ],
            }
        },
        {// transportador segunda fileira 
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ 120, 80, '*', '*', 30, '*'],
                heights: [1, 10, 1, 10],
                body: [
                    [
                        {text: "ENDEREÇO", colSpan: 2, fontSize: 4, border: [true, true, true, false]},
                        {text: "", fontSize: 4, border: [true, true, true, false]},
                        {text: "MUNICÍPIO", colSpan: 2, fontSize: 4, border: [true, true, true, false]},
                        {text: "", fontSize: 4, border: [true, true, true, false]},
                        {text: "UF", fontSize: 4, border: [true, true, true, false]},
                        {text: "INSCRIÇÃO ESTADUAL", fontSize: 4, border: [true, true, true, false]}
                    ],
                    ...tranportadorSecondRow,
                ]
            }
        },
        { // transportador terceira fileira 
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ 60, '*', '*', '*', '*', '*'],
                heights: [1, 10, 1, 10],
                body: [
                    [
                        {text: "QUANTIDADE", fontSize: 4, border: [true, true, true, false]},
                        {text: "ESPÉCIE", fontSize: 4, border: [true, true, true, false]},
                        {text: "MARCA", fontSize: 4, border: [true, true, true, false]},
                        {text: "NUMERAÇÃO", fontSize: 4, border: [true, true, true, false]},
                        {text: "PESO BRUTO", fontSize: 4, border: [true, true, true, false]},
                        {text: "PESO LÍQUIDO", fontSize: 4, border: [true, true, true, false]}
                    ],
                    ...tranportadorThirdRow,
                ],
            }
        },
        {text: "DADOS DOS PRODUTOS /SERVIÇOS",  fontSize:8, bold: true, margin: [0, 3, 0, 2]},
        { // transportador primeira fileira 
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ 30, 107, 40, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
                heights: [1, 8, 1],
                body: [
                    [
                        {text: "CÓDIGO DO PRODUTO", fontSize: 4, alignment: "center", border: [true, true, true, true]},
                        {text: "DESCRIÇÃO DO PRODUTO /SERVIÇO", fontSize: 4, alignment: "center", border: [true, true, true, true]},
                        {text: "NCM/SH", fontSize: 4, alignment: "center", border: [true, true, true, true]},
                        {text: "O/CST", fontSize: 4, alignment: "center", border: [true, true, true, true]},
                        {text: "CFOP", fontSize: 4, alignment: "center", border: [true, true, true, true]},
                        {text: "UN", fontSize: 4, alignment: "center", border: [true, true, true, true]},
                        {text: "QUANT", fontSize: 4, alignment: "center", border: [true, true, true, true]},
                        {text: "VALOR UNIT.", fontSize: 4, alignment: "center", border: [true, true, true, true]},
                        {text: "VALOR TOTAL", fontSize: 4, alignment: "center", border: [true, true, true, true]},
                        {text: "B. CÁLC. ICMS", fontSize: 4, alignment: "center", border: [true, true, true, true]},
                        {text: "VALOR ICMS", fontSize: 4, alignment: "center", border: [true, true, true, true]},
                        {text: "ALIQ. ICMS", fontSize: 4, alignment: "center", border: [true, true, true, true]},
                        {text: "ALIQ. IPI", fontSize: 4, alignment: "center", border: [true, true, true, true]}
                    ],
                    ...produtosTable,
                    ...produtosLastRow,
                ],
            }
        },
        {text: "DADOS ADICIONAIS / INFORMAÇÕES COMPLEMENTARES", fontSize:8, bold: true, margin: [0, 3, 0, -10]},
        {text: "DUPLICATAS", fontSize:8,  alignment: "right", bold: true, margin: [-40, 0, 20, 2]},
         {// obs gerais 
            table:{
                headerRows: 1,
                widths: [ '*', 30, 30, 30],
                heights: [2, 30],
                body: [
                    [
                        {text: "", fontSize: 4, border: [true, true, true, false]},
                        {text: "NÚMERO", fontSize: 4, border: [true, true, false, true]},
                        {text: "VENC.", fontSize: 4, border: [false, true, false, true]},
                        {text: "VALOR", fontSize: 4, border: [false, true, true, true]},
                    ],
                    ...lastTable
                ]
            }
        },
    ];


    const docDefinitios: TDocumentDefinitions = {
        pageSize: 'A4',
        styles: {
            myStyle: {
                margin: [0, 5, 0, 0]
            },
            innerStyle: {
                margin: [0, 2, 0, 0]
            }
        },
      
        content: [details],
    }

     pdfMake.createPdf(docDefinitios).open();
}

export default Danfe;