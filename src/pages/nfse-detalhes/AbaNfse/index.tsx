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
                            <h6>{item.Serie} </h6>
                        </div>
                        <div>
                            <h5>Número</h5>
                            <h6>{item.Numero}</h6>
                        </div>
                        <div>
                            <h5>Data de Emissão</h5>
                            <h6>{item.emissionDate}</h6>
                        </div>
                        <div>
                            <h5>Valor</h5>
                            <h6>{item.VlrTotal}</h6>
                        </div>
                        <div>
                            <h5>Natureza da Operação</h5>
                            <h6>{item.NaturezaOperacao}</h6>
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
                        <h6>{item.DadosPrestador.Cnpj}</h6>
                    </div>
                    <div>
                        <h5>Nome/Razão Social</h5>
                        <h6>{item.DadosPrestador.Nome}</h6>
                    </div>
                    <div>
                        <h5>Inscrição Municipal</h5>
                        <h6>{item.DadosPrestador.InscricaoMunicipal}</h6>
                    </div>
                    <div>
                        <h5>UF</h5>
                        <h6>{item.DadosPrestador.Endereco.Uf}</h6>
                    </div>
                </LineStyle>
                <LineStyle>
                    <div>
                        <h5>Logradouro</h5>
                        <h6>{item.DadosPrestador.Endereco.Endereco}</h6>
                    </div>
                    <div>
                        <h5>Número</h5>
                        <h6>{item.DadosPrestador.Endereco.Numero}</h6>
                    </div>
                    <div>
                        <h5>Complemento</h5>
                        <h6>{item.DadosPrestador.Endereco.Complemento}</h6>
                    </div>
                    <div>
                        <h5>Bairro</h5>
                        <h6>{item.DadosPrestador.Endereco.Bairro}</h6>
                    </div>
                    <div>
                        <h5>CEP</h5>
                        <h6>{item.DadosPrestador.Endereco.Cep}</h6>
                    </div>
                    <div>
                        <h5>Código País</h5>
                        <h6>{item.DadosPrestador.Endereco.CodigoIBGE}</h6>
                    </div>
                </LineStyle>
                <LineStyle>
                    <div>
                        <h5>Nome do País</h5>
                        <h6>{item.DadosPrestador.Endereco.Pais}</h6>
                    </div>
                    <div>
                        <h5>Nome do Município</h5>
                        <h6>{item.DadosPrestador.Endereco.Municipio}</h6>
                    </div>
                    <div>
                        <h5>Código do Município</h5>
                        <h6>{item.DadosPrestador.CodigoMobiliario}</h6>
                    </div>
                </LineStyle>
                <LineStyle>
                    <div>
                        <h5>Telefone</h5>
                        <h6>{item.DadosPrestador.Contato.Telefone}</h6>
                    </div>
                    <div>
                        <h5>E-mail</h5>
                        <h6>{item.DadosPrestador.Contato.Email}</h6>
                    </div>
                    <div>
                        <h5>Inscrição Municipal</h5>
                        <h6>{item.DadosPrestador.InscricaoMunicipal}</h6>
                    </div>
                    <div>
                        <h5>Complemento Endereço</h5>
                        <h6>{item.DadosPrestador.Endereco.Complemento}</h6>
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
                        <h6>{item.DadosTomador.Cnpj}</h6>
                    </div>
                    <div>
                        <h5>Nome/Razão Social</h5>
                        <h6>G{item.DadosTomador.Nome}</h6>
                    </div>
                    <div>
                        <h5>Inscrição Municipal</h5>
                        <h6>{item.DadosTomador.InscricaoMunicipal}</h6>
                    </div>
                    <div>
                        <h5>UF</h5>
                        <h6>{item.DadosTomador.Endereco.Uf}</h6>
                    </div>
                </LineStyle>
                <LineStyle>
                    <div>
                        <h5>Logradouro</h5>
                        <h6>{item.DadosTomador.Endereco.Endereco}</h6>
                    </div>
                    <div>
                        <h5>Número</h5>
                        <h6>{item.DadosTomador.Endereco.Numero}</h6>
                    </div>
                    <div>
                        <h5>Complemento</h5>
                        <h6>{item.DadosTomador.Endereco.Complemento}</h6>
                    </div>
                    <div>
                        <h5>Bairro</h5>
                        <h6>{item.DadosTomador.Endereco.Bairro}</h6>
                    </div>
                    <div>
                        <h5>CEP</h5>
                        <h6>{item.DadosTomador.Endereco.Cep}</h6>
                    </div>
                    <div>
                        <h5>Código País</h5>
                        <h6>{item.DadosTomador.Endereco.CodigoIBGE}</h6>
                    </div>
                </LineStyle>
                <LineStyle>
                    <div>
                        <h5>Nome do País</h5>
                        <h6>{item.DadosTomador.Endereco.Pais}</h6>
                    </div>
                    <div>
                        <h5>Nome do Município</h5>
                        <h6>{item.DadosTomador.Endereco.Municipio}</h6>
                    </div>
                    <div>
                        <h5>Código do Município</h5>
                        <h6>{item.DadosTomador.CodigoMobiliario}</h6>
                    </div>
                </LineStyle>
                <LineStyle>
                    <div>
                        <h5>Telefone</h5>
                        <h6>{item.DadosTomador.Contato.Telefone}</h6>
                    </div>
                    <div>
                        <h5>E-mail</h5>
                        <h6>{item.DadosTomador.Contato.Email}</h6>
                    </div>
                    <div>
                        <h5>Inscrição Municipal</h5>
                        <h6>{item.DadosTomador.InscricaoMunicipal}</h6>
                    </div>
                    <div>
                        <h5>Complemento Endereço</h5>
                        <h6>{item.DadosTomador.Endereco.Complemento}</h6>
                    </div>
                </LineStyle>
                </>}
            </div>
        </DadosStyle>
        <TabStyle>
            <div>
                <h3>Discriminação dos Serviços Prestados</h3>
                <div>
                    <div>
                        <h5>Alíquotas:</h5>
                        <h6></h6>
                    </div>
                    <div>
                        <h5>ISS</h5>
                        <h6>{item.ImpostosRetidos.AlqIssRetido}</h6>
                    </div>
                    <div>
                        <h5>INSS</h5>
                        <h6>{item.ImpostosRetidos.AlqInss}</h6>
                    </div>
                    <div>
                        <h5>IR</h5>
                        <h6>{item.ImpostosRetidos.AlqIrrf}</h6>
                    </div>
                    <div>
                        <h5>COFINS</h5>
                        <h6>{item.ImpostosRetidos.AlqCofins}</h6>
                    </div>
                    <div>
                        <h5>CSLL</h5>
                        <h6>{item.ImpostosRetidos.AlqCsll}</h6>
                    </div>
                </div>
                <div>
                    <div>
                        <h5>Valores:</h5>
                        <h6></h6>
                    </div>
                    <div>
                        <h5>ISS</h5>
                        <h6>{item.Iss.Vlr}</h6>
                    </div>
                    <div>
                        <h5>INSS</h5>
                        <h6>{item.ImpostosRetidos.VlrInss}</h6>
                    </div>
                    <div>
                        <h5>IR</h5>
                        <h6>{item.ImpostosRetidos.VlrIrrf}</h6>
                    </div>
                    <div>
                        <h5>COFINS</h5>
                        <h6>{item.ImpostosRetidos.VlrCofins}</h6>
                    </div>
                    <div>
                        <h5>CSLL</h5>
                        <h6>{item.ImpostosRetidos.VlrCsll}</h6>
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
                        <h6>{item.Iss.BaseCalculo}</h6>
                    </div>
                    <div>
                        <h5>Alíquota</h5>
                        <h6>{item.Iss.Aliquota}</h6>
                    </div>
                    <div>
                        <h5>Valor Dividido</h5>
                        <h6>{item.Iss.Vlr}</h6>
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