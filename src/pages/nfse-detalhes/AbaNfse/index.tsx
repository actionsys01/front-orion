import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { useSession } from "next-auth/client";
import { useToasts } from "@geist-ui/react";
import { useRouter } from "next/router";
import { TabStyle, DadosStyle, LineStyle, FullPage } from "./style"
import { ChevronDown, ChevronUp } from '@geist-ui/react-icons'
import { NfseFormattedProps } from "@services/nfse/types/NfseProps"

interface AbaProps {
    data: string[]
}

 
const AbaNfse = ({data}) => {
    const [ openFirstAccordion , setOpenFirstAccordion] = useState(false)
    const [ openSecondAccordion , setOpenSecondAccordion] = useState(false)

    console.log(`data na aba principal`, data)

    const accordionHandler = useCallback(() => {
            setOpenFirstAccordion(!openFirstAccordion)
        }, [openFirstAccordion])

    const secondAccordionHandler = useCallback( () => {
            setOpenSecondAccordion(!openSecondAccordion)
        },[openSecondAccordion])


    return <FullPage>
    {data.map((item: NfseFormattedProps, i: number) => (
        <>
        <TabStyle>
            <div>
                <h3>Dados NFS-e</h3>
                    <div key={i}>
                        <div>
                            <h5>Série</h5>
                            <h6>{item.serie} </h6>
                        </div>
                        <div>
                            <h5>Número</h5>
                            <h6>{item.numero}</h6>
                        </div>
                        <div>
                            <h5>Data de Emissão</h5>
                            <h6>{item.emissionDate}</h6>
                        </div>
                        <div>
                            <h5>Valor</h5>
                            <h6>{item.vlrTotal}</h6>
                        </div>
                        <div>
                            <h5>Natureza da Operação</h5>
                            <h6>{item.naturezaOperacao}</h6>
                        </div>
                </div>
               
                
            </div>
        </TabStyle>
        <DadosStyle>
            <div>
                <div className="header" onClick={accordionHandler}>
                    <h3>Dados Prestador</h3>
                    {!openFirstAccordion ? <ChevronDown /> : <ChevronUp /> }
                </div>
               {openFirstAccordion &&
                <>
                <LineStyle>
                    <div>
                        <h5>CNPJ</h5>
                        <h6>{item.dadosPrestador.cnpj}</h6>
                    </div>
                    <div>
                        <h5>Nome/Razão Social</h5>
                        <h6>{item.dadosPrestador.nome}</h6>
                    </div>
                    <div>
                        <h5>Inscrição Municipal</h5>
                        <h6>{item.dadosPrestador.inscricaoMunicipal}</h6>
                    </div>
                    <div>
                        <h5>UF</h5>
                        <h6>{item.dadosPrestador.endereco.uf}</h6>
                    </div>
                </LineStyle>
                <LineStyle>
                    <div>
                        <h5>Logradouro</h5>
                        <h6>{item.dadosPrestador.endereco.logradouro}</h6>
                    </div>
                    <div>
                        <h5>Número</h5>
                        <h6>{item.dadosPrestador.endereco.numero}</h6>
                    </div>
                    <div>
                        <h5>Complemento</h5>
                        <h6>{item.dadosPrestador.endereco.complemento}</h6>
                    </div>
                    <div>
                        <h5>Bairro</h5>
                        <h6>{item.dadosPrestador.endereco.bairro}</h6>
                    </div>
                    <div>
                        <h5>CEP</h5>
                        <h6>{item.dadosPrestador.endereco.cep}</h6>
                    </div>
                    <div>
                        <h5>Código País</h5>
                        <h6>{item.dadosPrestador.endereco.codigoIBGE}</h6>
                    </div>
                </LineStyle>
                <LineStyle>
                    <div>
                        <h5>Nome do País</h5>
                        <h6>{item.dadosPrestador.endereco.pais}</h6>
                    </div>
                    <div>
                        <h5>Nome do Município</h5>
                        <h6>{item.dadosPrestador.endereco.municipio}</h6>
                    </div>
                    <div>
                        <h5>Código do Município</h5>
                        <h6>{item.dadosPrestador.codigoMobiliario}</h6>
                    </div>
                </LineStyle>
                <LineStyle>
                    <div>
                        <h5>Telefone</h5>
                        <h6>{item.dadosPrestador.contato.telefone}</h6>
                    </div>
                    <div>
                        <h5>E-mail</h5>
                        <h6>{item.dadosPrestador.contato.email}</h6>
                    </div>
                    <div>
                        <h5>Inscrição Municipal</h5>
                        <h6>{item.dadosPrestador.inscricaoMunicipal}</h6>
                    </div>
                    <div>
                        <h5>Complemento Endereço</h5>
                        <h6>{item.dadosPrestador.endereco.complemento}</h6>
                    </div>
                </LineStyle>
                </>}
            </div>
        </DadosStyle>
        <DadosStyle>
            <div>
                <div className="header" onClick={secondAccordionHandler}>
                    <h3>Dados Tomador</h3>
                    {!openSecondAccordion ? <ChevronDown /> : <ChevronUp />}
                </div>
               {openSecondAccordion && 
                <>
               <LineStyle>
                    <div>
                        <h5>CNPJ</h5>
                        <h6>{item.dadosTomador.cnpj}</h6>
                    </div>
                    <div>
                        <h5>Nome/Razão Social</h5>
                        <h6>G{item.dadosTomador.nome}</h6>
                    </div>
                    <div>
                        <h5>Inscrição Municipal</h5>
                        <h6>{item.dadosTomador.inscricaoMunicipal}</h6>
                    </div>
                    <div>
                        <h5>UF</h5>
                        <h6>{item.dadosTomador.endereco.uf}</h6>
                    </div>
                </LineStyle>
                <LineStyle>
                    <div>
                        <h5>Logradouro</h5>
                        <h6>{item.dadosTomador.endereco.logradouro}</h6>
                    </div>
                    <div>
                        <h5>Número</h5>
                        <h6>{item.dadosTomador.endereco.numero}</h6>
                    </div>
                    <div>
                        <h5>Complemento</h5>
                        <h6>{item.dadosTomador.endereco.complemento}</h6>
                    </div>
                    <div>
                        <h5>Bairro</h5>
                        <h6>{item.dadosTomador.endereco.bairro}</h6>
                    </div>
                    <div>
                        <h5>CEP</h5>
                        <h6>{item.dadosTomador.endereco.cep}</h6>
                    </div>
                    <div>
                        <h5>Código País</h5>
                        <h6>{item.dadosTomador.endereco.codigoIBGE}</h6>
                    </div>
                </LineStyle>
                <LineStyle>
                    <div>
                        <h5>Nome do País</h5>
                        <h6>{item.dadosTomador.endereco.pais}</h6>
                    </div>
                    <div>
                        <h5>Nome do Município</h5>
                        <h6>{item.dadosTomador.endereco.municipio}</h6>
                    </div>
                    <div>
                        <h5>Código do Município</h5>
                        <h6>{item.dadosTomador.codigoMobiliario}</h6>
                    </div>
                </LineStyle>
                <LineStyle>
                    <div>
                        <h5>Telefone</h5>
                        <h6>{item.dadosTomador.contato.telefone}</h6>
                    </div>
                    <div>
                        <h5>E-mail</h5>
                        <h6>{item.dadosTomador.contato.email}</h6>
                    </div>
                    <div>
                        <h5>Inscrição Municipal</h5>
                        <h6>{item.dadosTomador.inscricaoMunicipal}</h6>
                    </div>
                    <div>
                        <h5>Complemento Endereço</h5>
                        <h6>{item.dadosTomador.endereco.complemento}</h6>
                    </div>
                </LineStyle>
                </>}
            </div>
        </DadosStyle>
        <TabStyle>
            <div>
                <h3>Discriminação dos serviços prestados</h3>
                <div>
                    <div>
                        <h6>{item.discriminacaoServico}</h6>
                    </div>
                </div>
            </div>
        </TabStyle>
        <TabStyle>
            <div>
                <h3>Impostos</h3>
                <div>
                    <div>
                        <h5>Alíquotas:</h5>
                        <h6></h6>
                    </div>
                    <div>
                        <h5>ISS</h5>
                        <h6>{item.impostosRetidos.alqIssRetido}</h6>
                    </div>
                    <div>
                        <h5>INSS</h5>
                        <h6>{item.impostosRetidos.alqInss}</h6>
                    </div>
                    <div>
                        <h5>IR</h5>
                        <h6>{item.impostosRetidos.alqIrrf}</h6>
                    </div>
                    <div>
                        <h5>COFINS</h5>
                        <h6>{item.impostosRetidos.alqCofins}</h6>
                    </div>
                    <div>
                        <h5>CSLL</h5>
                        <h6>{item.impostosRetidos.alqCsll}</h6>
                    </div>
                </div>
                <div className='second-row'>
                    <div>
                        <h5>Valores:</h5>
                        <h6></h6>
                    </div>
                    <div>
                        <h5>ISS</h5>
                        <h6>{item.iss.vlr}</h6>
                    </div>
                    <div>
                        <h5>INSS</h5>
                        <h6>{item.impostosRetidos.vlrInss}</h6>
                    </div>
                    <div>
                        <h5>IR</h5>
                        <h6>{item.impostosRetidos.vlrIrrf}</h6>
                    </div>
                    <div>
                        <h5>COFINS</h5>
                        <h6>{item.impostosRetidos.vlrCofins}</h6>
                    </div>
                    <div>
                        <h5>CSLL</h5>
                        <h6>{item.impostosRetidos.vlrCsll}</h6>
                    </div>
                </div>
            </div>
        </TabStyle>
        <TabStyle>
            <div>
                <h3>ISS</h3>
                <div>
                    <div>
                        <h5>Base</h5>
                        <h6>{item.iss.baseCalculo}</h6>
                    </div>
                    <div>
                        <h5>Alíquota</h5>
                        <h6>{item.iss.aliquota}</h6>
                    </div>
                    <div>
                        <h5>Valor Dividido</h5>
                        <h6>{item.iss.vlr}</h6>
                    </div>
                    <div>
                        <h5>Data Vencimento</h5>
                        <h6>{item.expiringIssDate}</h6>
                    </div>
                </div>
            </div>
        </TabStyle>
    </>
     ))}
     </FullPage>
}

export default AbaNfse