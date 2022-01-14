import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { useSession } from "next-auth/client";
import { useToasts } from "@geist-ui/react";
import BotaoVoltar from "@components/BotaoVoltar";
import Head from "next/head";
import { NfseDetailStyle, NfseCardStyle } from "./style"
import { useRouter } from "next/router";
import { nfseXmlData } from "@utils/mock-data/nfse-xml"
import AbaNfse from './AbaNfse';
import AbaDadosComplementares from './AbaDadosComplementares';
import { NfseFormattedProps } from "@services/nfse/types/NfseProps"
import { format } from 'date-fns';
import * as nfseRequest from "@services/nfse"

export default function NfseDetalhes() {
    const router = useRouter()
    const [ selectTab, setSelectTab] = useState(false)
    const [ xmlData, setXmlData ] = useState([])
    const [, setToast] = useToasts();
    const chave = router?.query.nfse_id.toString()


const getData = useCallback(async() => {
    try {
        const response = await nfseRequest.getNfseMongo(chave)
        const data = response .data
        
        setXmlData([data])
    } catch (error) {
        console.log(error)
        setToast({
            text: 'Notas não localizadas',
            type: 'warning'
          })
    }
    },[])

const formattedData = useMemo(() => {
    const allData: NfseFormattedProps[] = []
    if(xmlData) {
        xmlData.forEach((item) => {
            allData.push({
                ...item,
                emissionDate: format(new Date(item.dtEmissao), "dd/MM/yyyy"),
                chave_nota: router.query?.nfse_id,
                status_prefeitura: router.query?.status.toString() === "100" ? "Autorizado" : "Cancelada",
                expiringIssDate: format(new Date(item.iss.dtVenc),"dd/MM/yyyy")
            })
        }) 
    }
    // console.log(`allD`, allData)
    return allData
}, [xmlData])

useEffect(() => {
    getData()
}, [])


    return <>
            <Head>
                <title>Orion | Detalhes NFS-e</title>
            </Head>
            <BotaoVoltar />
            <NfseDetailStyle>
                <ul>
                    <li onClick={() => setSelectTab(false)} 
                    className={!selectTab ? "active" : ""}>NFS-e</li>
                    <li onClick={() => setSelectTab(true)} 
                    className={selectTab ? "active" : ""}>Dados Complementares</li>
                </ul>
            </NfseDetailStyle>
            <NfseCardStyle>
                <div>
                    <h3>Dados Gerais</h3>
                    {formattedData.map((item, i) => (
                        <div key={i}>
                            <div>
                                <h5>Chave de Acesso</h5>
                                <h6>{item.chave_nota} </h6>  
                            </div>
                            <div>
                                <h5>Número</h5>
                                <h6>{item.numero} </h6>
                            </div>
                            <div>
                                <h5>Status</h5>
                                <h6>{item.status_prefeitura}</h6>
                            </div>
                            <div>
                                <h5>Código de Verificação</h5>
                                <h6>{item.codigoVerificacao}</h6>
                            </div>
                        </div>
                    ) )}
                </div>
            </NfseCardStyle>
            {!selectTab ? <AbaNfse data={formattedData} /> : <AbaDadosComplementares data={xmlData}/>}

            
        </>
    
}

NfseDetalhes.auth = true
