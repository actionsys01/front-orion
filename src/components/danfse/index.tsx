import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import  {format} from "date-fns"
import { NfseFormattedProps } from "@services/nfse/types/NfseProps"

function Danfse(data, chave_nota) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    console.log(`data em danfse`, data)
    console.log(`chave_nota`, chave_nota)

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
    console.log(`formattedData`, formattedData)

// header
    const headerFirstRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: "", rowSpan:3,  fontSize: 9, 
                bold: true,  alignment: "center", border: [true, false, false, true], margin: [0, 0]}, 
            {text: item.chave_nota , colSpan: 2, fontSize: 6, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: "", fontSize: 9, 
                bold: true,  alignment: "center", border: [true, false, false, true], margin: [0, 0]}, 
        ]
    })

    const headerSecondRow = formattedData.map((item: NfseFormattedProps) => {
        return [
            {text: "", fontSize: 9, 
                bold: true,  alignment: "center", border: [true, true, true, true], margin: [0, 0]}, 
            {text: item.serviceDate, fontSize: 8, 
                bold: true,  alignment: "center", border: [true, false, true, true], margin: [0, 0]}, 
            {text: item.codigoVerificacao, fontSize: 8, 
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
        {text: "PRESTADOR DO SERVIÇO",fontSize: 7, alignment: "center", bold: true, margin: [0, 2, 0, 1]},
        { // tomador
            table:{
                headerRows: 1,
                widths: ['*', 100, 100, 100],
                heights: [1, 20, 1, 15],
                body: [
                    [
                        {text: 'NOME/RAZÃO SOCIAL', alignment: "center", fontSize: 4, border: [true, true, true, false]},
                        {text: "INSCRIÇÃO MUNICIPAL",  alignment: "center", colSpan: 3, fontSize: 4, border: [true, true, true, false]}, 
                        {text: '', fontSize: 4, border: [true, true, true, false]},
                        {text: '', fontSize: 4, border: [true, true, true, false]},
                    ],
                    ...headerFirstRow,
                    [
                        {text: '', fontSize: 4,  border: [true, true, true, false]},
                        {text: "DATA E HORA DO SERVIÇO", alignment: "center", fontSize: 4, border: [true, true, true, false]}, 
                        {text: 'CÓDIGO VERIFICADOR', fontSize: 4, alignment: "center",  border: [true, true, true, false]},
                        {text: 'CÓDIGO VERIFICADOR', fontSize: 4, alignment: "center",  border: [true, true, true, false]},
                    ],
                    ...headerSecondRow,
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