import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import  {format} from "date-fns"
import { NfseFormattedProps } from "@services/nfse/types/NfseProps"
import JsBarcode from 'jsbarcode';
import { img64 } from '@utils/image64';

function Danfse(data, chave_nota) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    // console.log(`data em danfse`, data)
    // console.log(`chave_nota`, chave_nota)

    
    const formattedData: any  =[]
    const formatData = data.map((item: NfseFormattedProps) => {
        formattedData.push({
                    ...item,
                    emissionDate: format(new Date(item.dtEmissao), "dd/MM/yyyy"),
                    chave_nota: chave_nota,
                    serviceDate: format(new Date(item.dtPrestacaoServico), "dd/MM/yyyy HH:mm"),
                    // status_prefeitura: router.query?.status.toString() === "100" ? "Autorizado" : "Cancelada",
                    expiringIssDate: format(new Date(item.iss.dtVenc),"dd/MM/yyyy")
                })
        // console.log(`allD`, allData)
        return formattedData
    })
    // console.log(`formattedData`, formattedData)

    function textToBase64Barcode(text){
        if(text.startsWith("NFSe")) {
            const chave = text.slice(4, 47)
            var canvas = document.createElement("canvas");
            JsBarcode(canvas, chave, {format: "CODE128"});
            return canvas.toDataURL("image/png");
        }
      }
  
       const test = textToBase64Barcode("NFSe5555")
      console.log(`test`, test)

// HEADER
    const headerFirstRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {image: img64, rowSpan:3,  fontSize: 9, width: 90,
                bold: true,  alignment: "center", border: [true, false, false, true], margin: [0, 0]}, 
            {text: item.chave_nota , colSpan: 2, fontSize: 6, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 5]}, 
            {text: "", fontSize: 9, 
                bold: true,  alignment: "center", border: [true, false, false, true], margin: [0, 0]}, 
        ]
    })

    const headerSecondRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: "", fontSize: 9, 
                bold: true,  alignment: "center", border: [true, true, true, true], margin: [0, 0]}, 
            {text: item.serviceDate, fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 15]}, 
            {text: item.codigoVerificacao, fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 15]}, 
        ]
    })

    // DADOS PRESTADOR

    const prestadorFirstRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: item.dadosPrestador.razaoSocial, fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: item.dadosPrestador.inscricaoMunicipal, colSpan: 3, fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: "", fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: "", fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
        ]
    })

    const prestadorSecondRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: item.dadosPrestador.cnpj, fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: item.dadosPrestador.endereco.logradouro, fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: item.dadosPrestador.endereco.municipio, fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: item.dadosPrestador.endereco.uf, fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
        ]
    })

    // DADOS DO TOMADOR

    const tomadorFirstRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: item.dadosTomador.razaoSocial, fontSize: 8, colSpan: 4,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: "", fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: "", fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: "", fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
        ]
    })

    const tomadorSecondRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: item.dadosTomador.razaoSocial, fontSize: 8, colSpan: 4,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: "", fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: "", fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: "", fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
        ]
    })

    const tomadorThirdRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: item.dadosTomador.endereco.municipio, fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: item.dadosTomador.endereco.uf, fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: item.dadosTomador.contato.telefone, fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: item.dadosTomador.endereco.cep, fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
        ]
    })

    const tomadorFourthRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: item.dadosTomador.contato.email,  fontSize: 8, colSpan: 4,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: "", fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: "", fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: "", fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
        ]
    })

    const tomadorFifthRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: item.dadosTomador.cnpj,  fontSize: 8, colSpan: 2,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: "", fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: item.dadosTomador.inscricaoMunicipal, fontSize: 8, colSpan: 2,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: "", fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
        ]
    })

    // INTERMEDIÁRIO

    const intermediarioFirstRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: item.dadosIntermediario.razaoSocial,  fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: item.dadosIntermediario.cnpj, fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: item.dadosIntermediario.inscricaoMunicipal, fontSize: 8,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
        ]
    })

    const intermediarioSecondRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: item.dadosIntermediario.contato.email,  fontSize: 8, colSpan: 2,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: '', fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
            {text: item.dadosIntermediario.contato.telefone, fontSize: 8,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2]}, 
        ]
    })

    // DISCRIMINAÇÃO DOS SERVIÇOS

    const servicesTable = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: item.descricaoTipoServico,  fontSize: 7,
                bold: true,  alignment: "left", border: [true, false, true, true], margin: [0, 5]}, 
        ]
    })

    // IMPOSTOS 

    const impostosFirstRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: 'ISS',  fontSize: 6,
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, -2]}, 
            {text: item.iss.aliquota,  fontSize: 6,
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, -2]}, 
            {text: item.iss.vlr,  fontSize: 6,
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, -2]},  
        ]
    })
    const impostosSecondRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: 'IRFF',  fontSize: 6,
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, -2]}, 
            {text: item.impostosRetidos.alqIrrf,  fontSize: 6,
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, -2]}, 
            {text: item.impostosRetidos.vlrIrrf,  fontSize: 6,
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, -2]},  
        ]
    })
    const impostosThirdRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: 'COFINS',  fontSize: 6,
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, -2]}, 
            {text: item.impostosRetidos.alqCofins,  fontSize: 6,
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, -2]}, 
            {text: item.impostosRetidos.vlrCofins,  fontSize: 6,
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, -2]},  
        ]
    })
    const impostosFourthRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: 'INSS',  fontSize: 6,
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, -2]}, 
            {text: item.iss.aliquota,  fontSize: 6,
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, -2]}, 
            {text: item.iss.vlr,  fontSize: 6,
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, -2]},  
        ]
    })
    const impostosFifthhRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: 'CSLL',  fontSize: 6,
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, -2]}, 
            {text: item.iss.aliquota,  fontSize: 6,
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, -2]}, 
            {text: item.iss.vlr,  fontSize: 6,
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, -2]},  
        ]
    })
    const impostosSixthRow = formattedData.map((item: NfseFormattedProps) => {
        return [
        {text: 'PIS-PASEP',  fontSize: 6,
            bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2, 0, 1]}, 
        {text: item.iss.aliquota,  fontSize: 6,
            bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2, 0, 1]}, 
        {text: item.iss.vlr,  fontSize: 6,
            bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, -2, 0, 1]},  
    ]
})


    // VALOR TOTAL

    const totalValueFirstRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: item.impostosRetidos.vlrInss,  fontSize: 7,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: item.impostosRetidos.vlrIrrf, fontSize: 7, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: item.impostosRetidos.vlrCsll, fontSize: 7,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: item.impostosRetidos.vlrCofins, fontSize: 7,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: item.impostosRetidos.vlrPisPasep, fontSize: 7,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: "", fontSize: 7, /* rowSpan: 5, */
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, 0]}, 
        ]
    })

    const totalValueSecondRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: item.itemListaServico,  fontSize: 7, colSpan: 5,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: '', fontSize: 7, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: '', fontSize: 7,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: '', fontSize: 7,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: '', fontSize: 7,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: item.vlrTotal, fontSize: 9, 
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, 0]}, 
        ]
    })
    
    const totalValueThirdRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: item.vlrDeducoes,  fontSize: 7, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: item.iss.baseCalculo, fontSize: 7, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: item.iss.aliquota, fontSize: 7,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: item.impostosRetidos.vlrIssRetido, fontSize: 7,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: item.vlrCredito, fontSize: 7,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: '', fontSize: 7, 
                bold: true,  alignment: "center", border: [true, false, true, false], margin: [0, 0]}, 
        ]
    })

    const totalValueFourthRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: item.municipioIncidencia,  fontSize: 7, colSpan: 2,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: '', fontSize: 7, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: item.construcaoCivil.codigoObra, fontSize: 7, colSpan: 2,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: '', fontSize: 7,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: item.vlrDeducoes, fontSize: 7, colSpan: 2,
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: '', fontSize: 7, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
        ]
    })

    // OUTRAS INFOS

    const outrasInfos = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: item.outrasInformacoes,  fontSize: 6, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
        ]
    })

    const details: any = [
        { // header
            table:{
                headerRows: 1,
                widths: ['*', 100, 100],
                heights: [1, 20, 1, 15],
                body: [
                    [
                        {text: '', fontSize: 4, border: [true, true, true, false]},
                        {text: "CHAVE DE ACESSO",  alignment: "center", colSpan: 2, fontSize: 4, border: [true, true, true, false]}, 
                        {text: '', fontSize: 4, border: [true, true, true, false]},
                    ],
                    ...headerFirstRow,
                    [
                        {text: '', fontSize: 4,  border: [true, true, true, false]},
                        {text: "DATA E HORA DO SERVIÇO", alignment: "center", fontSize: 4, border: [true, true, true, false]}, 
                        {text: 'CÓDIGO VERIFICADOR', fontSize: 4, alignment: "center",  border: [true, true, true, false]},
                    ],
                    ...headerSecondRow,
                ],
            }
        },
        {text: "PRESTADOR DO SERVIÇO",fontSize: 7, alignment: "center", bold: true, margin: [0, 5, 0, 5]},
        { // PRESTADOR
            table:{
                headerRows: 1,
                widths: ['*', 80, 80, 80],
                heights: [1, 10, 1, 10],
                body: [
                    [
                        {text: 'NOME/RAZÃO SOCIAL', alignment: "center", fontSize: 4, border: [true, true, true, false]},
                        {text: "INSCRIÇÃO MUNICIPAL",  alignment: "center", colSpan: 3, fontSize: 4, border: [true, true, true, false]}, 
                        {text: '', fontSize: 4, border: [true, true, true, false]},
                        {text: '', fontSize: 4, border: [true, true, true, false]},
                    ],
                    ...prestadorFirstRow,
                    [
                        {text: 'CNPJ', alignment: "center", fontSize: 4,  border: [true, true, true, false]},
                        {text: "ENDEREÇO", alignment: "center", fontSize: 4, border: [true, true, true, false]}, 
                        {text: 'MUNICÍPIO', fontSize: 4, alignment: "center",  border: [true, true, true, false]},
                        {text: 'UF', fontSize: 4, alignment: "center",  border: [true, true, true, false]},
                    ],
                    ...prestadorSecondRow,
                ],
            }
        },
        {text: "TOMADOR DO SERVIÇO",fontSize: 7, alignment: "center", bold: true, margin: [0, 5, 0, 5]},
        { // TOMADOR
            table:{
                headerRows: 1,
                widths: ['*', 100, 100, 100],
                heights: [ 1, 10, 1, 10, 1, 10, 1, 10, 1, 10],
                body: [
                    [
                        {text: 'NOME/RAZÃO SOCIAL', alignment: "left", colSpan: 4, fontSize: 4, border: [true, true, true, false]},
                        {text: "",  alignment: "center",  fontSize: 4, border: [true, true, true, false]}, 
                        {text: '', fontSize: 4, border: [true, true, true, false]},
                        {text: '', fontSize: 4, border: [true, true, true, false]},
                    ],
                    ...tomadorFirstRow,
                    [
                        {text: 'ENDEREÇO', colSpan: 4, alignment: "left", fontSize: 4,  border: [true, true, true, false]},
                        {text: "", alignment: "center", fontSize: 4, border: [true, true, true, false]}, 
                        {text: '', fontSize: 4, alignment: "center",  border: [true, true, true, false]},
                        {text: '', fontSize: 4, alignment: "center",  border: [true, true, true, false]},
                    ],
                    ...tomadorSecondRow,
                    [
                        {text: 'MUNICÍPIO', alignment: "left", fontSize: 4,  border: [true, true, true, false]},
                        {text: "UF", alignment: "left", fontSize: 4, border: [true, true, true, false]}, 
                        {text: 'FONE', fontSize: 4, alignment: "left",  border: [true, true, true, false]},
                        {text: 'CEP', fontSize: 4, alignment: "left",  border: [true, true, true, false]},
                    ],
                    ...tomadorThirdRow,
                    [
                        {text: 'E-MAIL', colSpan: 4, alignment: "left", fontSize: 4,  border: [true, true, true, false]},
                        {text: "", alignment: "left", fontSize: 4, border: [true, true, true, false]}, 
                        {text: '', fontSize: 4, alignment: "left",  border: [true, true, true, false]},
                        {text: '', fontSize: 4, alignment: "left",  border: [true, true, true, false]},
                    ],
                    ...tomadorFourthRow,
                    [
                        {text: 'CNPJ/ CPF', colSpan: 2, alignment: "left", fontSize: 4,  border: [true, true, true, false]},
                        {text: "", alignment: "left", fontSize: 4, border: [true, true, true, false]}, 
                        {text: 'INCRIÇÃO MUNICIPAL', fontSize: 4, colSpan: 2, alignment: "left",  border: [true, true, true, false]},
                        {text: '', fontSize: 4, alignment: "left",  border: [true, true, true, false]},
                    ],
                    ...tomadorFifthRow,
                ],
            }
        },
        {text: "INTERMEDIÁRIO DO SERVIÇO",fontSize: 7, alignment: "center", bold: true, margin: [0, 5, 0, 5]},
        { // INTERMEDIÁRIO 
            table:{
                headerRows: 1,
                widths: ['*', 100, 100],
                heights: [1, 10, 1, 10],
                body: [
                    [
                        {text: 'NOME/RAZÃO SOCIAL', fontSize: 4, border: [true, true, true, false]},
                        {text: 'CNPJ/ CPF',  alignment: "center", fontSize: 4, border: [true, true, true, false]}, 
                        {text: 'INCRIÇÃO MUNICIPAL', fontSize: 4, border: [true, true, true, false]},
                    ],
                    ...intermediarioFirstRow,
                    [
                        {text: 'E-MAIL', fontSize: 4, colSpan: 2, border: [true, true, true, false]},
                        {text: "", alignment: "center", fontSize: 4, border: [true, true, true, false]}, 
                        {text: 'FONE', fontSize: 4, alignment: "center",  border: [true, true, true, false]},
                    ],
                    ...intermediarioSecondRow,
                ],
            }
        },
        {text: "DISCRIMINAÇÃO DOS SERVIÇOS",fontSize: 7, alignment: "center", bold: true, margin: [0, 5, 0, 5]},
        { //  DISCRIMINAÇÃO DOS SERVIÇOS
            table:{
                headerRows: 1,
                widths: ['*'],
                heights: [1, 20],
                body: [
                    [
                        {text: 'DESCRIÇÃO DO SERVIÇO', alignment: "left", fontSize: 4, border: [true, true, true, false]},
                    ],
                    ...servicesTable,
                ],
            }
        },
        {text: "IMPOSTOS",fontSize: 7, alignment: "center", bold: true, margin: [0, 5, 0, 5]},
        { //  IMPOSTOS
            table:{
                headerRows: 1,
                widths: ['*', '*', '*'],
                heights: [2],
                body: [
                    [
                        {text: 'TRIBUTO', alignment: "center", fontSize: 4, border: [true, true, true, false]},
                        {text: 'ALÍQUOTA', alignment: "center", fontSize: 4, border: [true, true, true, false]},
                        {text: 'VALOR', alignment: "center", fontSize: 4, border: [true, true, true, false]},
                    ],
                    ...impostosFirstRow,
                    ...impostosSecondRow,
                    ...impostosThirdRow,
                    ...impostosFourthRow,
                    ...impostosFifthhRow,
                    ...impostosSixthRow,
                ],
            }
        },
        {text: "VALOR TOTAL DO SERVIÇO",fontSize: 7, alignment: "center", bold: true, margin: [0, 5, 0, 5]},
        { //  VALOR TOTAL DO SERVIÇO
            table:{
                headerRows: 1,
                widths: [ 60, 60, 60, 60, 60, "*"],
                heights: [1, 10, 1, 10],
                body: [
                    [
                        {text: 'INSS (R$)', alignment: "center", fontSize: 4, border: [true, true, true, false]},
                        {text: 'IRRF (R$)', alignment: "center", fontSize: 4, border: [true, true, true, false]}, 
                        {text: 'CSLL (R$)', alignment: "center", fontSize: 4, border: [true, true, true, false]}, 
                        {text: 'COFINS (R$)', alignment: "center", fontSize: 4, border: [true, true, true, false]},
                        {text: 'PIS/PASEP (R$)', alignment: "center", fontSize: 4, border: [true, true, true, false]},
                        {text: 'VALOR TOTAL (R$)', alignment: "center", fontSize: 4, border: [true, true, true, false]},
                    ],
                    ...totalValueFirstRow,
                    [
                        {text: 'CÓDIGO DO SERVIÇO', colSpan: 5, alignment: "center", fontSize: 4, border: [true, true, true, false]},
                        {text: '', alignment: "center", fontSize: 4, border: [true, true, true, true]}, 
                        {text: '', alignment: "center", fontSize: 4, border: [true, true, true, true]}, 
                        {text: '', fontSize: 4, border: [true, true, true, true]},
                        {text: '', fontSize: 4, border: [true, true, true, true]},
                        {text: '', fontSize: 4, border: [true, false, true, false]},
                    ],
                   ...totalValueSecondRow,
                [
                    {text: 'VALOR TOTAL DEDUÇÕES (R$)', alignment: "center", fontSize: 4, border: [true, true, true, false]},
                    {text: 'BASE DE CÁLCULO (R$)', alignment: "center", fontSize: 4, border: [true, true, true, false]}, 
                    {text: 'ALÍQUOTA (%)', alignment: "center", fontSize: 4, border: [true, true, true, false]}, 
                    {text: 'VALORDO ISS (R$)', alignment: "center", fontSize: 4, border: [true, true, true, false]},
                    {text: 'CRÉDITO (R$)', alignment: "center", fontSize: 4, border: [true, true, true, false]},
                    {text: '', fontSize: 4, border: [true, false, true, false]},
                ],
                ...totalValueThirdRow,
                [
                    {text: 'MUNICÍPIO DA PRESTAÇÃO DO SERVIÇO', colSpan: 2, alignment: "center", fontSize: 4, border: [true, true, true, false]},
                    {text: '', alignment: "center", fontSize: 4, border: [true, true, true, false]}, 
                    {text: 'NÚMERO DA INSCRIÇÃO DA OBRA', colSpan: 2, alignment: "center", fontSize: 4, border: [true, true, true, false]}, 
                    {text: '', fontSize: 4, border: [true, true, true, false]},
                    {text: 'VALORAPROXIMADO DOS TRIBUTOS', colSpan: 2, alignment: "center", fontSize: 4, border: [true, true, true, false]},
                    {text: '', fontSize: 4, border: [true, true, true, false]},
                ],
                ...totalValueFourthRow,
                ],
            }
        },
        {text: "OUTRAS INFORMAÇÕES", fontSize: 7, alignment: "center", bold: true, margin: [0, 5, 0, 5]},
        { // OUTRAS INFORMAÇÕES
            table:{
                headerRows: 1,
                widths: ['*'],
                heights: [ 1, 20],
                body: [
                    [
                        {text: '', alignment: "center", fontSize: 4, border: [true, true, true, false]},
                    ],
                    ...outrasInfos,
                ],
            }
        },
    ]


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

export default Danfse