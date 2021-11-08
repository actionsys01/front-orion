import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import  {format} from "date-fns"

function Dacte (cteData: any) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    console.log("cte", cteData)

    const cteGatheredData: any = []
    const invoiceData = cteData.map((item: any) => {
        cteGatheredData.push({
            ...item,
            emissionDate: format(new Date(item.informacoes_cte.dhEmi), "dd/MM/yyyy HH:mm:ss")
        })
        return cteGatheredData
    })

    // HEADER

    const headerFirstRow = cteData.map((item: any) => {
        return [
            {text: item.emitente.xNome, rowSpan: 2, fontSize: 9, bold: true,  alignment: "center", border: [true, false, false, false]}, 
            {text: "2", fontSize: 7, colSpan: 3, alignment: "center", border: [true, false, false, true]}, 
            {},
            {}, 
            {text: "", fontSize: 7, bold: true, border: [true, false, false, true]},
            {text: item.informacoes_cte.modal, fontSize: 10, bold: true, alignment: "center", border: [false, false, true, true], margin: [12, 0, 0, 0]}
        ]
    })

    const headerSecondRow = cteGatheredData.map((item: any) => {
        return [
            {text: `${item.emitente.enderEmit.xLgr}\n${item.emitente.enderEmit.fone}\n
            CNPJ${item.emitente.CNPJ} - IE${item.emitente.IE}`, 
            fontSize: 7, rowSpan: 2, alignment: "center", border: [true, false, false, true]}, 
            {text: item.informacoes_cte.mod, fontSize: 7, bold: true, alignment: "center", border: [true, false, false, true]}, 
            {text: item.informacoes_cte.serie, alignment: "center", fontSize: 7, bold: true, border: [true, false, false, true]},
            {text: item.informacoes_cte.nCT, alignment: "center", fontSize: 7, bold: true, border: [true, false, false, true]}, 
            {text: item.emissionDate, alignment: "center", fontSize: 6,  bold: true, border: [true, false, false, true]},
            {text: "", alignment: "center", fontSize: 7, bold: true, border: [true, false, true, true]}
        ]
    })

    const headerLastRow = cteData.map((item: any) => {
        return [
            {}, 
            {text: "CÓDIGO DE BARRAS AQUI", colSpan: 5, fontSize: 10, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 4, alignment: "center", border: [true, false, false, false]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, false, false]}, //middle
            {text: "", fontSize: 4, alignment: "center", border: [true, false, false, false]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, false]}
        ]
    })

    // INFORMAÇÕES GERAIS

    const generalFirstRow = cteGatheredData.map((item: any) => {
        return [
            {text: item.informacoes_cte.tpCTe, bold: true,  fontSize: 7, alignment: "center", border: [true, false, false, true]}, //middle
            {text: item.informacoes_cte.tpServ, bold: true,  fontSize: 7, alignment: "center", border: [true, false, false, true]},
            {text: item.informacoes_normal_substituto.infDoc.infNFe.chave, bold: true,  fontSize: 7, alignment: "center", border: [true, false, true, true]}
        ]
    })

    const generalSecondRow = cteData.map((item: any) => {
        return [
            {text: item.informacoes_cte.natOp, fontSize: 7, bold: true,  alignment: "center", border: [true, false, false, true]}, 
            {text: item.emitente.enderEmit.xMun, fontSize: 7, bold: true,  alignment: "center", border: [true, false, false, true]},
            {text: item.destinatario.enderDest.xMun, fontSize: 7, bold: true, alignment: "center", border: [true, false, true, true]}
        ]
    })

    // REMETENTE / DESTINATÁRIO TABELA 1

    const serviceFirstRow = cteData.map((item: any) => {
        return [
            {text: `${item.remetente.xNome}`, bold: true, fontSize: 7, alignment: "center", border: [true,false , true, false]}, 
            {text: `${item.destinatario.xNome}`, bold: true, fontSize: 7, alignment: "center", border: [true, false, true, false]}
        ]
    })
    const serviceSecondRow = cteData.map((item: any) => {
        return [
        {text: `${item.remetente.enderReme.xLgr}                                                                               ${item.remetente.enderReme.UF}`, 
        fontSize: 7,  bold: true, alignment: "justify", border: [true, false, true, false]}, 
        {text: `${item.destinatario.enderDest.xLgr}                                                                            ${item.destinatario.enderDest.UF}`, 
        fontSize: 7, alignment: "justify", border: [true, false, true, false]}
        ]
    })
    const serviceThirdRow = cteData.map((item: any) => {
        return [
            {text: `Município                                                      País                          CEP`, 
            fontSize: 7, alignment: "left", border: [true, false, true, false]}, 
            {text: `Município                                                      País                          CEP`, 
            fontSize: 7, alignment: "left", border: [true, false, true, false]}
        ]
    })
    const serviceFourthRow = cteData.map((item: any) => {
        return [
            {text: `CNPJ/CPF                                               IE                                            Fone`, 
            fontSize: 7, alignment: "left", border: [true, false, true, true]}, 
            {text: `CNPJ/CPF                                               IE                                            Fone`, 
            fontSize: 7, alignment: "left", border: [true, false, true, true]}
        ]
    })

    // EXPEDIDOR / RECEBEDOR 

    
    const serviceDescriptionFirstRow = cteData.map((item: any) => {
        return [
            {text: `Expedidor`, fontSize: 7, alignment: "left", border: [true, true, true, false]}, 
            {text: `Recebedor`, fontSize: 7, alignment: "left", border: [true, true, true, false]}
        ]
    })
    const serviceDescriptionSecondRow = cteData.map((item: any) => {
        return [
        {text: `Endereço                                                                                UF`, 
        fontSize: 7, alignment: "left", border: [true, false, true, false]}, 
        {text: `Endereço                                                                                UF`, 
        fontSize: 7, alignment: "left", border: [true, false, true, false]}
        ]
    })
    const serviceDescriptionThirdRow = cteData.map((item: any) => {
        return [
            {text: `Município                                                      País                          CEP`, 
            fontSize: 7, alignment: "left", border: [true, false, true, false]}, 
            {text: `Município                                                      País                          CEP`, 
            fontSize: 7, alignment: "left", border: [true, false, true, false]}
        ]
    })
    const serviceDescriptionFourthRow = cteData.map((item: any) => {
        return [
            {text: `CNPJ/CPF                                               IE                                            Fone`, 
            fontSize: 7, alignment: "left", border: [true, false, true, true]}, 
            {text: `CNPJ/CPF                                               IE                                            Fone`, 
            fontSize: 7, alignment: "left", border: [true, false, true, true]}
        ]
    })

    //TOMADOR DE SERVIÇO

    const receptorFirstRow = cteData.map((item: any) => {
        return [
            {text: "OUTRO", colSpan: 5, fontSize: 7, alignment: "left", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "left", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "left", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "left", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "left", border: [true, false, true, true]}, 
        ]
    })

    const receptorSecondRow = cteData.map((item: any) => {
        return [
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
        ]
    })

    const receptorThirdRow = cteData.map((item: any) => {
        return [
            {text: "", colSpan: 3, fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
        ]
    })

    // VALORES DO SERVIÇO

    const pricingRow = cteData.map((item: any) => {
        return [
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}
        ]
    })

    // MEDIDAS

    const generalMeasuresRow = cteData.map((item: any) => {
        return [
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
        ]
    })

    // COMPONENTES DE VALOR

    const componentsFirstRow = cteData.map((item: any) => {
        return [
            {text: "", fontSize: 7, alignment: "center", border: [true, false, false, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [false, false, false, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, false, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [false, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, false, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [false, false, false, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, false, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [false, false, true, true]}, 
        ]
    })

    const componentsSecondRow = cteData.map((item: any) => {
        return [
            {text: "", colSpan: 4, fontSize: 7, alignment: "center", border: [true, false, false, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [false, false, false, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, false, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [false, false, true, true]}, 
            {text: "", fontSize: 7, colSpan: 4,  alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [false, false, false, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, false, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [false, false, true, true]}, 
        ]
    })

    // IMPOSTOS

    const impostosFirstRow = cteData.map((item: any) => {
        return [
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
        ]
    })

    // DOCUMENTOS

    const documentsFirstRow = cteData.map((item: any) => {
        return [
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}
        ]
    })

    //FLUXO DE CARGA

    const fluxoRow = cteData.map((item: any) => {
        return [
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, alignment: "center", border: [true, false, true, true]}
        ]
    })

    // FOOTER

    const lastTable = cteData.map((item: any) => {
        return [
            {text: "", fontSize: 7, lineHeight: 1.5, alignment: "center", bold: true, border: [true, false, true, true]},
        ]
    })

    
    const details: any = [
        { // header
            table:{
                headerRows: 1,
                widths: [200, '*', '*', '*', '*', '*'],
                heights: [2, 12, 2, 12, 30],
                body: [
                    [
                        {text: "1", alignment: "center", border: [true, true, false, false]}, 
                        {text: "DACTE\n Documento Auxiliar do Conhecimento\n de Transporte Eletrônico", 
                        colSpan: 3, rowSpan:2, bold: true, fontSize: 8, alignment: "center", border: [true, true, false, true]}, 
                        {},
                        {}, 
                        {text: "Modal", colSpan: 2, alignment: "center", border: [true, true, true, false]},
                        {}
                    ],
                    ...headerFirstRow,
                    [
                        {text: "", border: [true, false, true, false]}, 
                        {text: "MODELO", fontSize: 4, alignment: "center", border: [true, false, true, false]}, 
                        {text: "SÉRIE", fontSize: 4, alignment: "center", border: [true, false, false, false]},
                        {text: "NÚMERO", fontSize: 4, alignment: "center", border: [true, false, false, false]}, 
                        {text: "DATA E HORA\n DA EMISSÃO", fontSize: 4, alignment: "center", border: [true, false, false, false]},
                        {text: "INSC. SUFRAMA\n DESTINATÁRIO", fontSize: 4, alignment: "center", border: [true, false, true, false]}
                    ],
                    ...headerSecondRow,
                    ...headerLastRow
                ]
            }
        },
        { //GENERAL 
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', '*', 220],
                heights: [2, 12, 2, 12,],
                body: [
                    [
                        {text: "TIPO DE CT-e", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "TIPO DE SERVIÇO", fontSize: 4, alignment: "center", border: [true, true, true, false]},
                        {text: "CHAVE DE ACESSO", fontSize: 4, alignment: "center", border: [true, true, true, false]},
                    ],
                    ...generalFirstRow,
                    [
                        {text: "CFOP - NATUREZA DA OPERAÇÃO", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "INÍCIO DA PRESTAÇÃO", fontSize: 4, alignment: "center", border: [true, true, true, false]},
                        {text: "FIM DA PRESTAÇÃO", fontSize: 4, alignment: "center", border: [true, true, true, false]},
                    ],
                    ...generalSecondRow
                ]
            }
        },
        { // REMETENTE E DESTINATÁRIO 
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', '*'],
                heights: [ 2, 15, 2, 15, 15, 15 ],
                body: [
                    [
                        {text: "REMETENTE",  fontSize: 4, alignment: "left", border: [true, true, true, false]},
                        {text: "DESTINATÁRIO",  fontSize: 4, alignment: "left", border: [true, true, true, false]}
                    ],
                    ...serviceFirstRow,
                    [
                        {text: "Endereço                                                                                                                                                          UF", 
                        fontSize: 4, alignment: "left", border: [true, true, true, false]},
                        {text: "Endereço                                                                                                                                                          UF", 
                        fontSize: 4, alignment: "left", border: [true, true, true, false]}
                    ],
                    ...serviceSecondRow,
                    ...serviceThirdRow,
                    ...serviceFourthRow,
                ]
            }
        },
        {
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', '*'],
                heights: [ 15, 15, 15, 15 ],
                body: [
                    ...serviceDescriptionFirstRow,
                    ...serviceDescriptionSecondRow,
                    ...serviceDescriptionThirdRow,
                    ...serviceDescriptionFourthRow,
                ]
            }
        },
        {
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', '*', '*', '*', '*'],
                heights: [ 2, 15, 2, 15, 2, 15 ],
                body: [
                    [
                    {text: "TOMADOR DO SERVIÇO", colSpan: 5, fontSize: 4, alignment: "left", border: [true, true, true, false]}, 
                    {text: "", fontSize: 7, alignment: "left", border: [true, false, true, true]}, 
                    {text: "", fontSize: 7, alignment: "left", border: [true, false, true, true]}, 
                    {text: "", fontSize: 7, alignment: "left", border: [true, false, true, true]}, 
                    {text: "", fontSize: 7, alignment: "left", border: [true, false, true, true]}, 
                    ],
                    ...receptorFirstRow,
                    [
                    {text: "ENDEREÇO", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                    {text: "MUNICÍPIO", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                    {text: "UF", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                    {text: "CEP", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                    {text: "PAÍS", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                    ],
                    ...receptorSecondRow,
                    [
                    {text: "CNPJ/CPF", colSpan: 3, fontSize: 4, alignment: "left", border: [true, true, true, false]}, 
                    {text: "", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                    {text: "", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                    {text: "IE", fontSize: 4, alignment: "left", border: [true, true, true, false]}, 
                    {text: "FONE", fontSize: 4, alignment: "left", border: [true, true, true, false]}, 
                    ],
                    ...receptorThirdRow    
                ]
            }    
        },
        {
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', '*', '*'],
                heights: [ 2, 14 ],
                body: [ 
                    [
                        {text: "PRODUTO PREDOMINANTE",  fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "OUTRA CARACTERÍSTICA", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "VALOR TOTAL DA CARGA", fontSize: 4, alignment: "center", border: [true, true, true, false]}
                        ],
                        ...pricingRow
                ]
            }
        },
        {
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', '*', '*', '*', '*'],
                heights: [ 2, 14 ],
                body: [ 
                        [
                        {text: "TP MED/UND. MED", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "TP MED/UND. MED", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "TO MED/UND. MED", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "CUBAGEM(M3)", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "QTDE(VOL)", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        ],
                        ...generalMeasuresRow
                ]
            }
        },
        {text: "COMPONENTES DO VALOR DA PRESTAÇÃO", fontSize: 9, alignment: "center", bold: true, margin: [0, 4, 0, 2]},
        {
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', 25, '*', 25, '*',25, '*', 25],
                heights: [ 2, 14, 2, 14 ],
                body: [ 
                    [
                        {text: "NOME", fontSize: 4, alignment: "left", border: [true, true, false, false]}, 
                        {text: "VALOR", fontSize: 4, alignment: "center", border: [false, true, true, false]}, 
                        {text: "NOME", fontSize: 4, alignment: "left", border: [false, true, false, false]}, 
                        {text: "VALOR", fontSize: 4, alignment: "center", border: [false, true, true, false]}, 
                        {text: "NOME", fontSize: 4, alignment: "left", border: [false, true, false, false]}, 
                        {text: "VALOR", fontSize: 4, alignment: "center", border: [false, true, true, false]}, 
                        {text: "NOME", fontSize: 4, alignment: "left", border: [false, true, false, false]}, 
                        {text: "VALOR", fontSize: 4, alignment: "center", border: [false, true, true, false]}, 
                        ],
                        ...componentsFirstRow,
                        [
                        {text: "VALOR TOTAL DA PRESTAÇÃO", colSpan: 4, fontSize: 4, alignment: "center", border: [true, true, false, false]}, 
                        {text: "", fontSize: 4, alignment: "center", border: [false, true, true, false]}, 
                        {text: "", fontSize: 4, alignment: "left", border: [false, true, false, false]}, 
                        {text: "", fontSize: 4, alignment: "center", border: [false, true, true, false]}, 
                        {text: "VALOR A RECEBER", colSpan: 4, fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "", fontSize: 4, alignment: "center", border: [false, true, true, false]}, 
                        {text: "", fontSize: 4, alignment: "left", border: [false, true, false, false]}, 
                        {text: "", fontSize: 4, alignment: "center", border: [false, true, true, false]}, 
                        ],
                        ...componentsSecondRow    
                ]
            }
        },
        {text: "INFORMAÇÕES RELATIVAS A IMPOSTOS",fontSize: 9, alignment: "center", bold: true, margin: [0, 4, 0, 2]},
        {
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', '*', '*', '*', '*'],
                heights: [ 2, 14 ],
                body: [ 
                        [
                        {text: "SITUAÇÃO TRIBUTÁRIA", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "BASE DE CÁLCULO", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "ALÍQUOTA DO ICMS", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "VALOR DO ICMS", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "% RED. BC. CALC.", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        ],
                        ...impostosFirstRow
                ]
            }
        },
        {text: "DOCUMENTOS ORIGINÁRIOS", fontSize: 9, alignment: "center", bold: true, margin: [0, 4, 0, 2]},
        {
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', '*', '*'],
                heights: [ 2, 14 ],
                body: [ 
                        [
                        {text: "TIPO DE DOCUMENTO", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "CNPJ/CPF EMITENTE", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "SÉRIE/Nº DOCUMENTO", fontSize: 4, alignment: "center", border: [true, true, true, false]}
                        ],
                        ...documentsFirstRow
                ]
            }
        },
        {text: "PREVISÃO DO FLUXO DA CARGA", fontSize: 9, alignment: "center", bold: true, margin: [0, 4, 0, 2]},
        {
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', '*', '*'],
                heights: [ 2, 14 ],
                body: [ 
                        [
                        {text: "SIGLA/CODIGO INTERNO DA FILIAL/\nESTAÇÕES/PORTO/AÉREO DE ORIGEM", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "SIGLA/CODIGO DA FILIAL/PORTO/\nESTAÇÃO/AEREOPORTO DE PASSAGEM", fontSize: 4, alignment: "center", border: [true, true, true, false]}, 
                        {text: "SIGLA/CODIGO DA FILIA/PORTO/\nESTAÇÃO/AEROPORTO DE DESTINO", fontSize: 4, alignment: "center", border: [true, true, true, false]}
                        ],
                        ...fluxoRow
                ]
            }
        },
        {text: "OBSERVAÇÕES GERAIS", fontSize: 9, alignment: "center", bold: true, margin: [0, 4, 0, 2]},
        {// obs gerais 
            table:{
                headerRows: 1,
                widths: [ '*'],
                heights: [2, 30],
                body: [
                    [
                        {text: "", fontSize: 4, border: [true, true, true, false]}
                    ],
                    ...lastTable
                ]
            }
        },
    ]

    
    const docDefinitios: TDocumentDefinitions = {
        pageSize: 'A4',
        styles: {
            innerStyle: {
                margin: [0, 2, 0, 0]
            }
        },
      
        content: [details],
    }

     pdfMake.createPdf(docDefinitios).open();
}

export default Dacte