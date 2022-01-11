import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import  {format} from "date-fns"
import JsBarcode from 'jsbarcode';

interface MedidasProps {
    cUnid: string;
    qCraga: string;
    tpMed: string;
}

interface ProdutosProps {
    xNome: string;
    vComp: string
}

function Dacte (cteData: any, medidas: MedidasProps[], produtos: ProdutosProps[], chave_nota : string) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    console.log(`produtos`, produtos)


    const cteGatheredData: any = []
    const invoiceData = cteData.map((item: any) => {
        cteGatheredData.push({
            ...item,
            // data emissão
            emissionDate: format(new Date(item.informacoes_cte.dhEmi), "dd/MM/yyyy HH:mm:ss"),
            // expedidor
            expedLrgUF: (item.expedicao ? 
                `${item.expedicao.enderExped.xLgr}   /  ${item.expedicao.enderExped.UF}` : ""),
            expedMunPCEP: (item.expedicao ? 
                `${item.expedicao.enderExped.xMun}  -  ${item.expedicao.enderExped.xPais}  -  ${item.expedicao.enderExped.CEP}` : "" ),
            expedCNPJIEFone: (item.expedicao ?  
                `${item.expedicao.CNPJ}  -  ${item.expedicao.IE}  -  ${item.expedicao.fone}`: ""),
            // recebedor
            recebLgrUF: (item.recebedor  ? 
                `${item.recebedor.enderReceb.xLgr}   /   ${item.recebedor.enderReceb.UF}` : ""),
            recebMunPCEP: (item.recebedor  ?  
                `${item.recebedor.enderReceb.xMun}  -  ${item.recebedor.enderReceb.xPais}  -  ${item.recebedor.enderReceb.CEP}` : "" ),
            recebCNPJIEFone: (item.recebedor ?  
                `${item.recebedor.CNPJ}  -  ${item.recebedor.IE}  -  ${item.recebedor.fone}`: ""),
            // tomador de serviço
            tomador: (item.informacoes_cte.toma3?.toma === "0" ? item.remetente
                : item.informacoes_cte.toma3?.toma === "1"  ? item.expedidor
                : item.informacoes_cte.toma3?.toma === "2"  ? item.recebedor
                : item.informacoes_cte.toma3?.toma === "3"  ? item.destinatario 
                : item.informacoes_cte.toma03?.toma  === "0" ? item.remetente : null),
            // endereço tomador de serviço
            tomadorEnder: (item.informacoes_cte.toma3?.toma === "0" ? item.remetente.enderReme
                : item.informacoes_cte.toma3?.toma === "1"  ? item.expedidor.enderExped
                : item.informacoes_cte.toma3?.toma === "2"  ? item.recebedor.enderReceb
                : item.informacoes_cte.toma3?.toma === "3"  ? item.destinatario.enderDest 
                : item.informacoes_cte.toma03?.toma  === "0" ? item.remetente : null),
            // fluxo
            fluxoOrig: (item.complemento.fluxo ? item.complemento.fluxo.xOrig : ""),
            fluxoPass: (item.complemento.fluxo ? item.complemento.fluxo.xPass : ""),
            fluxoDest: (item.complemento.fluxo ? item.complemento.fluxo.xDest : ""), 
            priceProPred: (item.informacoes_normal_substituto.infCarga ?  
                item.informacoes_normal_substituto.infCarga.proPred : ""),
            priceXOutCat: (item.informacoes_normal_substituto.infCarga ?  
                item.informacoes_normal_substituto.infCarga.xOutCat : ""),
            priceVCarga: (item.informacoes_normal_substituto.infCarga ?  
                item.informacoes_normal_substituto.infCarga?.vCarga : ""),
            // impostos
            ICMS: (item.impostos.ICMS.ICMS00 || 
                item.impostos.ICMS.ICMS20 || 
                item.impostos.ICMS.ICMS45 || 
                item.impostos.ICMS.ICMS60 || 
                item.impostos.ICMS.ICMS90 ||
                item.impostos.ICMS.ICMSOutraUF ),
        })
        return cteGatheredData
    })


    function textToBase64Barcode(text){
        if(text) {
            if(text?.startsWith("CTe")) {
                const chave = text.slice(3)
                console.log(`chave`, chave)
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

    // HEADER

    const headerFirstRow = cteData.map((item: any) => {
        return [
            {text: item.emitente?.xNome, rowSpan: 2, fontSize: 9, 
                bold: true,  alignment: "center", border: [true, false, false, false], margin: [0, 0]}, 
            {text: "2", fontSize: 7, colSpan: 3, alignment: "center", border: [true, false, false, true], margin: [0, 0]}, 
            {},
            {}, 
            {text: "", fontSize: 7, 
            bold: true, border: [true, false, false, true], margin: [0, 0]},
            {text: item.informacoes_cte?.modal, fontSize: 10, 
                bold: true, alignment: "center", border: [false, false, true, true], margin: [12, 0, 0, 0]}
        ]
    })

    const headerSecondRow = cteGatheredData.map((item: any) => {
        return [
            {text: `${item.emitente?.enderEmit.xLgr}\n${item.emitente.enderEmit.fone}\n
            CNPJ${item.emitente?.CNPJ} - IE${item.emitente.IE}`, 
            fontSize: 7, rowSpan: 2, alignment: "center", border: [true, false, false, true], margin: [0, 0]}, 
            {text: item.informacoes_cte?.mod, fontSize: 7, bold: true, 
                alignment: "center", border: [true, false, false, true], margin: [0, 0]}, 
            {text: item.informacoes_cte?.serie, alignment: "center", 
            fontSize: 7, bold: true, border: [true, false, false, true], margin: [0, 0]},
            {text: item.informacoes_cte?.nCT, alignment: "center", 
            fontSize: 7, bold: true, border: [true, false, false, true], margin: [0, 0]}, 
            {text: item.emissionDate, alignment: "center", 
            fontSize: 6,  bold: true, border: [true, false, false, true], margin: [0, 0]},
            {text: "", alignment: "center", fontSize: 7, bold: true, border: [true, false, true, true]}
        ]
    })

    const headerLastRow = cteData.map((item: any) => {
        return [
            {}, 
            {image: chaveBarcode, width: 275, colSpan: 5, 
            fontSize: 10, alignment: "center", border: [true, false, true, true], margin: [-28, 0, -7, 0]}, 
            {text: "", fontSize: 4, alignment: "center", border: [true, false, false, false]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, false, false]}, //middle
            {text: "", fontSize: 4, alignment: "center", border: [true, false, false, false]},
            {text: "", fontSize: 4, alignment: "center", border: [true, false, true, false]}
        ]
    })

    // INFORMAÇÕES GERAIS

    const generalFirstRow = cteGatheredData.map((item: any) => {
        return [
            {text: item.informacoes_cte?.tpCTe, bold: true,  fontSize: 7, 
                alignment: "center", border: [true, false, false, true]}, //middle
            {text: item.informacoes_cte?.tpServ, bold: true,  fontSize: 7, 
                alignment: "center", border: [true, false, false, true]},
            {text: chave_nota, bold: true,  fontSize: 7, 
                alignment: "center", border: [true, false, true, true]}
        ]
    })

    const generalSecondRow = cteData.map((item: any) => {
        return [
            {text: item.informacoes_cte?.natOp, fontSize: 6, 
                bold: true,  alignment: "center", border: [true, false, false, true]}, 
            {text: item.emitente?.enderEmit.xMun, fontSize: 7, 
                bold: true,  alignment: "center", border: [true, false, false, true]},
            {text: item.destinatario?.enderDest?.xMun, fontSize: 7, 
                bold: true, alignment: "center", border: [true, false, true, true]}
        ]
    })

    // REMETENTE / DESTINATÁRIO TABELA 1

    const serviceFirstRow = cteData.map((item: any) => {
        return [
            {text: `${item.remetente?.xNome}`, bold: true, 
            fontSize: 7, alignment: "center", border: [true,false , true, false], margin: [0, -5, 0, 0]}, 
            {text: `${item.destinatario?.xNome}`, bold: true, 
            fontSize: 7, alignment: "center", border: [true, false, true, false], margin: [0, -5, 0, 0]}
        ]
    })
    const serviceSecondRow = cteData.map((item: any) => {
        return [
        {text: `${item.remetente?.enderReme.xLgr}   /   ${item.remetente.enderReme.UF}`, 
        fontSize: 7, bold: true, alignment: "center", border: [true, false, true, false], margin: [0, -8, 0, 0]}, 
        {text: `${item.destinatario?.enderDest.xLgr}   /   ${item.destinatario.enderDest.UF}`, 
        fontSize: 7, bold: true, alignment: "center", border: [true, false, true, false], margin: [0, -8, 0, 0]}
        ]
    })

    const serviceThirdRow = cteData.map((item: any) => {
        return [
            {text: `${item.remetente?.enderReme.xMun}   /   ${item.remetente.enderReme.xPais}   /   ${item.remetente.enderReme.CEP}`, 
            fontSize: 7, bold: true, alignment: "center", border: [true, false, true, false], margin: [0, -8, 0, 0]}, 
            {text:  `${item.destinatario?.enderDest.xMun}   /   ${item.destinatario.enderDest.xPais}   /   ${item.destinatario.enderDest.CEP}`, 
            fontSize: 7, bold: true, alignment: "center", border: [true, false, true, false], margin: [0, -8, 0, 0]}
        ]
    })
    const serviceFourthRow = cteData.map((item: any) => {
        return [
            {text: `${item.remetente?.CNPJ}  -  ${item.remetente.IE}  -  ${item.remetente.fone}`, 
            fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true], margin: [0, -8, 0, 0]}, 
            {text: `${item.destinatario?.CNPJ}  -  ${item.destinatario.IE}  -  ${item.destinatario.fone}`, 
            fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true], margin: [0, -8, 0, 0]}
        ]
    })

    // EXPEDIDOR / RECEBEDOR 

    
    const serviceDescriptionFirstRow = cteGatheredData.map((item: any) => {
        return [
            {text: item.expedicao?.xNome, fontSize: 7, 
                bold: true, alignment: "center", border: [true, false, true, false], margin: [0, -5, 0, 0]}, 
            {text: item.recebedor?.xNome, fontSize: 7, 
                bold: true, alignment: "center", border: [true, false, true, false], margin: [0, -5, 0, 0]}
        ]
    })
    const serviceDescriptionSecondRow = cteGatheredData.map((item: any) => {
        return [
        {text: item.expedLrgUF, 
        fontSize: 7, alignment: "center", bold: true, border: [true, false, true, false], margin: [0, -8, 0, 0]}, 
        {text: item.recebLgrUF, 
        fontSize: 7, alignment: "center", bold: true, border: [true, false, true, false], margin: [0, -8, 0, 0]}
        ]
    })

    const serviceDescriptionThirdRow = cteGatheredData.map((item: any) => {
        return [
            {text: item.expedMunPCEP, 
            fontSize: 7, alignment: "center", bold: true, border: [true, false, true, false], margin: [0, -8, 0, 0]}, 
            {text: item.recebMunPCEP, 
            fontSize: 7, alignment: "center", bold: true, border: [true, false, true, false], margin: [0, -8, 0, 0]}
        ]
    })

    const serviceDescriptionFourthRow = cteGatheredData.map((item: any) => {
        return [
            {text: item.expedCNPJIEFone, 
            fontSize: 7, alignment: "center", bold: true, border: [true, false, true, true], margin: [0, -8, 0, 0]}, 
            {text: item.recebCNPJIEFone, 
            fontSize: 7, alignment: "center", bold: true,  border: [true, false, true, true], margin: [0, -8, 0, 0]}
        ]
    })

    //TOMADOR DE SERVIÇO

    const receptorFirstRow = cteGatheredData.map((item: any) => {
        return [
            {text: item.tomador?.xNome, bold: true, colSpan: 5, 
                fontSize: 7, alignment: "center", border: [true, false, true, true], margin: [0, -5, 0, 0]}, 
            {text: '', fontSize: 7, alignment: "left", border: [true, false, true, true], margin: [0, -5, 0, 0]}, 
            {text: "", fontSize: 7, alignment: "left", border: [true, false, true, true], margin: [0, -5, 0, 0]}, 
            {text: "", fontSize: 7, alignment: "left", border: [true, false, true, true], margin: [0, -5, 0, 0]}, 
            {text: "", fontSize: 7, alignment: "left", border: [true, false, true, true], margin: [0, -5, 0, 0]}, 
        ]
    })

    const receptorSecondRow = cteGatheredData.map((item: any) => {
        return [
            {text: item.tomadorEnder?.xLgr, fontSize: 7, bold: true, 
                alignment: "center", border: [true, false, true, true]}, 
            {text: item.tomadorEnder?.xMun, fontSize: 7, bold: true, 
                alignment: "center", border: [true, false, true, true]}, 
            {text: item.tomadorEnder?.UF, fontSize: 7, bold: true, 
                alignment: "center", border: [true, false, true, true]}, 
            {text: item.tomadorEnder?.CEP, fontSize: 7, bold: true, 
                alignment: "center", border: [true, false, true, true]}, 
            {text: item.tomadorEnder?.xPais, fontSize: 7, bold: true, 
                alignment: "center", border: [true, false, true, true]}, 
        ]
    })

    const receptorThirdRow = cteGatheredData.map((item: any) => {
        return [
            {text: item.tomador?.CNPJ, colSpan: 3, bold: true, 
                fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: "", fontSize: 7, border: [true, false, true, true]}, 
            {text: "", fontSize: 7, border: [true, false, true, true]}, 
            {text: item.tomador?.IE, fontSize: 7, bold: true, 
                alignment: "center", border: [true, false, true, true]}, 
            {text: item.tomador?.fone, fontSize: 7, bold: true, 
                alignment: "center", border: [true, false, true, true]}, 
        ]
    })

    // VALORES DO SERVIÇO

    const pricingRow = cteGatheredData.map((item: any) => {
        return [
            {text: item.priceProPred, 
                bold: true, fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: item.priceXOutCat, 
                bold: true, fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: item.priceVCarga, 
                bold: true, fontSize: 7, alignment: "center", border: [true, false, true, true]}
        ]
    })

    // MEDIDAS

    const measuresRows = medidas.map((item: any, index: number) => {
        // console.log({ item, cteGatheredData })
        return [
            {text: item.tpMed,
                bold: true, fontSize: 6, alignment: "center", border: [true, false, false, false], margin: [0, -2, 0, 0]}, 
            {text: item.qCarga, 
                bold: true, fontSize: 6, alignment: "center", border: [false, false, false, false], margin: [0, -2, 0, 0]},
            {text: item.cUnid, 
                bold: true, fontSize: 6, alignment: "center", border: [false, false, true, false], margin: [0, -2, 0, 0]},
            {text: (item.cUnid === "00" ? `${item.qCarga}` : ""), 
                bold: true, fontSize: 6, alignment: "center", border: [false, false, true, false], margin: [0, -2, 0, 0]},
        ]
    })

    // COMPONENTES DO VALOR

    const componentsRows = produtos.map((item: any, index: number) => {
        return [
            {text: item.xNome,
                bold: true, fontSize: 6, alignment: "center", border: [true, false, false, false], margin: [0, -2, 0, 0]}, 
            {text: item.vComp, 
                bold: true, fontSize: 6, alignment: "center", border: [false, false, true, false], margin: [0, -2, 0, 0]},
        ]
    })

    const componentsSecondRow = cteData.map((item: any, index: number) => {
        return [
            {text: item.valores_servicos?.vTPrest,
                bold: true, fontSize: 6, alignment: "center", border: [true, false, false, true], margin: [0, -2, 0, 0]}, 
            {text: item.valores_servicos?.vRec, 
                bold: true, fontSize: 6, alignment: "center", border: [false, false, true, true], margin: [0, -2, 0, 0]},
        ]
    })

    // IMPOSTOS

    const impostosFirstRow = cteGatheredData.map((item: any) => {
        return [
            {text: item.ICMS.CST, fontSize: 7, bold: true, 
                alignment: "center", border: [true, false, true, true]}, 
            {text: (item.ICMS.vBC || item.ICMS.vBCOutraUF), fontSize: 7, bold: true, 
                alignment: "center", border: [true, false, true, true]}, 
            {text: (item.ICMS.pICMS || item.ICMS.pICMSOutraUF), fontSize: 7, bold: true, 
                alignment: "center", border: [true, false, true, true]}, 
            {text: (item.ICMS.vICMS || item.ICMS.vICMSOutraUF), fontSize: 7, bold: true, 
                alignment: "center", border: [true, false, true, true]}, 
            {text: (item.ICMS.pRedBC || item.ICMS.pRedBCOutraUF), fontSize: 7, bold: true, 
                alignment: "center", border: [true, false, true, true]}, 
        ]
    })

    // DOCUMENTOS

    const documentsFirstRow = cteData.map((item: any) => {
        return [
            {text: item.informacoes_normal_substituto?.infDoc.infNF?.mod, fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: item.emitente.CNPJ, fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: item.informacoes_normal_substituto?.infDoc.infNF?.serie, fontSize: 7, alignment: "center", border: [true, false, true, true]}
        ]
    })

    //FLUXO DE CARGA

    const fluxoRow = cteGatheredData.map((item: any) => {
        return [
            {text: item.fluxoOrig, bold: true, 
                fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: item.fluxoPass, bold: true, 
                fontSize: 7, alignment: "center", border: [true, false, true, true]}, 
            {text: item.fluxoDest, bold: true, 
                fontSize: 7, alignment: "center", border: [true, false, true, true]}
        ]
    })

    // FOOTER

    const lastTable = cteData.map((item: any) => {
        return [
            {text: item.complemento?.xObs, fontSize: 7, lineHeight: 1.5, alignment: "center", bold: true, border: [true, false, true, true]},
        ]
    })

    
    const details: any = [
        { // header
            table:{
                headerRows: 1,
                widths: [200, '*', '*', '*', '*', '*'],
                heights: [1, 1, 1, 1, 30],
                body: [
                    [
                        {text: "", alignment: "center", border: [true, true, false, false]}, 
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
                heights: [1],
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
                heights: [ 1, 2, 1, 2, 1, 2, 1, 2 ],
                body: [
                    [
                        {text: "REMETENTE",  fontSize: 4, alignment: "left", border: [true, true, true, false], margin: [0, 0, 0, -10]},
                        {text: "DESTINATÁRIO",  fontSize: 4, alignment: "left", border: [true, true, true, false], margin: [0, 0, 0, -10]}
                    ],
                    ...serviceFirstRow,
                    [
                        {text: "Endereço  /   UF", 
                        fontSize: 4, alignment: "left", border: [true, false, true, false], margin: [0, 0, 0, -10]},
                        {text: "Endereço  /  UF", 
                        fontSize: 4, alignment: "left", border: [true, false, true, false], margin: [0, 0, 0, -10]}
                    ],
                    ...serviceSecondRow,
                    [
                        {text: 'Município  /  País  /  CEP', 
                        fontSize: 4, alignment: "left", border: [true, false, true, false], margin: [0, 0, 0, -10]}, 
                        {text: 'Município  /  País  /  CEP', 
                        fontSize: 4, alignment: "left", border: [true, false, true, false], margin: [0, 0, 0, -10]}
                    ],
                    ...serviceThirdRow,
                    [
                        {text: 'CNPJ/CPF  - IE  -  Fone', 
                        fontSize: 4, alignment: "left", border: [true, false, true, false], margin: [0, 0, 0, -10]}, 
                        {text: 'CNPJ/CPF  - IE  -  Fone', 
                        fontSize: 4, alignment: "left", border: [true, false, true, false], margin: [0, 0, 0, -10]}
                    ],
                    ...serviceFourthRow,
                ]
            }
        },
        { // EXPEDIDOR / RECEBEDOR 
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', '*'],
                heights: [ 1, 5, 1, 5, 1, 5, 1, 5],
                body: [
                    [
                        {text: "EXPEDIDOR",  fontSize: 4, alignment: "left", border: [true, true, true, false], margin: [0, 0, 0, -10]},
                        {text: "RECEBEDOR",  fontSize: 4, alignment: "left", border: [true, true, true, false], margin: [0, 0, 0, -10]}
                    ],
                    ...serviceDescriptionFirstRow,
                    [
                        {text: "Endereço  /   UF", 
                        fontSize: 4, alignment: "left", border: [true, false, true, false], margin: [0, 0, 0, -10]},
                        {text: "Endereço  /  UF", 
                        fontSize: 4, alignment: "left", border: [true, false, true, false], margin: [0, 0, 0, -10]}
                    ],
                    ...serviceDescriptionSecondRow,
                    [
                        {text: 'Município  /  País  /  CEP', 
                        fontSize: 4, alignment: "left", border: [true, false, true, false], margin: [0, 0, 0, -10]}, 
                        {text: 'Município  /  País  /  CEP', 
                        fontSize: 4, alignment: "left", border: [true, false, true, false], margin: [0, 0, 0, -10]}
                    ],
                    ...serviceDescriptionThirdRow,
                    [
                        {text: 'CNPJ/CPF  - IE  -  Fone', 
                        fontSize: 4, alignment: "left", border: [true, false, true, false], margin: [0, 0, 0, -10]}, 
                        {text: 'CNPJ/CPF  - IE  -  Fone', 
                        fontSize: 4, alignment: "left", border: [true, false, true, false], margin: [0, 0, 0, -10]}
                    ],
                    ...serviceDescriptionFourthRow,
                ]
            }
        },
        { // TOMADOR DO SERVIÇO
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', '*', '*', '*', '*'],
                heights: [ 1, 5, 1, 5, 1, 5 ],
                body: [
                    [
                    {text: "TOMADOR DO SERVIÇO", colSpan: 5, fontSize: 4, alignment: "left", border: [true, true, true, false], margin: [0, 0, 0, -10]}, 
                    {text: "", fontSize: 7, alignment: "left", border: [true, false, true, true], margin: [0, 0, 0, -10]}, 
                    {text: "", fontSize: 7, alignment: "left", border: [true, false, true, true], margin: [0, 0, 0, -10]}, 
                    {text: "", fontSize: 7, alignment: "left", border: [true, false, true, true], margin: [0, 0, 0, -10]}, 
                    {text: "", fontSize: 7, alignment: "left", border: [true, false, true, true], margin: [0, 0, 0, -10]}, 
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
        { // VALORES DO SERVIÇO
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', '*', '*'],
                heights: [ 1, 5 ],
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
        { // MEDIDAS
            style: "innerStyle",
            table:{
                widths: [ '*', '*', '*', 45],
                heights: [ 1 ],
                body: [ 
                        [
                        {text: "TP MED", fontSize: 4, alignment: "center", border: [true, true, false, false], margin: [0, 0, 0, 0]}, 
                        {text: "QTD", fontSize: 4, alignment: "center", border: [false, true, false, false], margin: [0, 0, 0, 0]}, 
                        {text: "UND. MED", fontSize: 4, alignment: "center", border: [false, true, true, false], margin: [0, 0, 0, 0]}, 
                        {text: "CUBAGEM(M3)", fontSize: 4, alignment: "center", border: [true, true, true, false], margin: [0, 0, 0, 0]}, 
                        ],
                        ...measuresRows,
                        [
                        {text: "", fontSize: 4, alignment: "center", border: [true, false, false, true], margin: [0, -4, 0, 0]}, 
                        {text: "", fontSize: 4, alignment: "center", border: [false, false, false, true], margin: [0, -4, 0, 0]}, 
                        {text: "", fontSize: 4, alignment: "center", border: [false, false, true, true], margin: [0, -4, 0, 0]}, 
                        {text: "", fontSize: 4, alignment: "center", border: [true, false, true, true], margin: [0, -4, 0, 0]}, 
                        ],
                ]
            }
        },
        {text: "COMPONENTES DO VALOR DA PRESTAÇÃO",fontSize: 7, alignment: "center", bold: true, margin: [0, 2, 0, 1]},
        { // COMPONENTES DE VALOR
            style: "innerStyle",
            table:{
                widths: [ '*', '*'],
                heights: [ 1, 2, 0 ],
                body: [ 
                        [
                        {text: "NOME", fontSize: 4, alignment: "center", border: [true, true, false, false], margin: [0, 0]}, 
                        {text: "VALOR", fontSize: 4, alignment: "center", border: [false, true, true, false], margin: [0, 0]}, 
                        ],
                        ...componentsRows,
                        [
                        {text: "VALOR TOTAL", fontSize: 4, alignment: "center", border: [true, true, false, false], margin: [0, 0, 0,0]}, 
                        {text: "VALOR A RECEBER", fontSize: 4, alignment: "center", border: [false, true, true, false], margin: [0, 0, 0, 0]}, 
                        ],
                        ...componentsSecondRow
                ]   
            }
        },
        {text: "INFORMAÇÕES RELATIVAS A IMPOSTOS",fontSize: 7, alignment: "center", bold: true, margin: [0, 2, 0, 1]},
        {// IMPOSTOS
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', '*', '*', '*', '*'],
                heights: [ 1, 5],
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
        {text: "DOCUMENTOS ORIGINÁRIOS", fontSize: 7, alignment: "center", bold: true, margin: [0, 2, 0, 1]},
        { // DOCUMENTOS ORIGINÁRIOS
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', '*', '*'],
                heights: [ 1, 5 ],
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
        {text: "PREVISÃO DO FLUXO DA CARGA", fontSize: 7, alignment: "center", bold: true, margin: [0, 2, 0, 1]},
        { // FLUXO DE CARGA
            style: "innerStyle",
            table:{
                headerRows: 1,
                widths: [ '*', '*', '*'],
                heights: [ 1, 5],
                body: [ 
                        [
                        {text: "SIGLA/CODIGO INTERNO DA FILIAL/\nESTAÇÕES/PORTO/AÉREO DE ORIGEM", fontSize: 3, alignment: "center", border: [true, true, true, false]}, 
                        {text: "SIGLA/CODIGO DA FILIAL/PORTO/\nESTAÇÃO/AEREOPORTO DE PASSAGEM", fontSize: 3, alignment: "center", border: [true, true, true, false]}, 
                        {text: "SIGLA/CODIGO DA FILIA/PORTO/\nESTAÇÃO/AEROPORTO DE DESTINO", fontSize: 3, alignment: "center", border: [true, true, true, false]}
                        ],
                        ...fluxoRow
                ]
            }
        },
        {text: "OBSERVAÇÕES GERAIS", fontSize: 7, alignment: "center", bold: true, margin: [0, 2, 0, 1]},
        {// obs gerais 
            table:{
                headerRows: 1,
                widths: [ '*'],
                heights: [1, 8],
                body: [
                    [
                        {text: "", fontSize: 4, border: [true, true, true, false], margin: [0, 0]}
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