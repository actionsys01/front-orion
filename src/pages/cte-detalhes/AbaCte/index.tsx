import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { CardStyle, DadosStyle, LineStyle } from '@styles/vizualizar';
import { AbaProps } from '@services/cte-mongo/cte-type/cte';
import { ChevronDown, ChevronUp } from '@geist-ui/react-icons';

export default function AbaCte({ data }: AbaProps) {
    const router = useRouter();
    const [modalRemetente, setModalRemetente] = useState(false);
    const [modalEmitente, setModalEmitente] = useState(false);
    const [modalDestinatário, setModalDestinatario] = useState(false);

    const dataEmissao = useMemo(() => {
        let dataEmissao;
        if (data?.informacoes_cte?.dEmi) {
            dataEmissao = format(
                new Date(data?.informacoes_cte?.dEmi),
                'dd-MM-yyyy',
            );
        }
        if (data?.informacoes_cte?.dhEmi) {
            dataEmissao = format(
                new Date(data?.informacoes_cte?.dhEmi),
                'dd-MM-yyyy',
            );
        }
        return dataEmissao;
    }, [data]);

    return (
        <>
            <CardStyle>
                <div>
                    <h3>Dados CT-e</h3>
                    <div>
                        <div>
                            <h5>Modelo</h5>
                            <h6>{data?.informacoes_cte?.mod}</h6>
                        </div>
                        <div>
                            <h5>Série</h5>
                            <h6>{data?.informacoes_cte?.serie}</h6>
                        </div>
                        <div>
                            <h5>Data de emissão</h5>
                            <h6>{dataEmissao}</h6>
                        </div>
                    </div>
                </div>
            </CardStyle>
            <CardStyle>
                <div>
                    <h3>Valores</h3>
                    <div>
                        <div>
                            <h5>Valor Total Prestação de Serviços</h5>
                            <h6>{data?.valores_servicos.vTPrest}</h6>
                        </div>
                        <div>
                            <h5>Valor do BC do IMCS</h5>
                            <h6>{data?.impostos?.ICMS?.ICMS00?.vBC}</h6>
                        </div>
                        <div>
                            <h5>Valor de IMCS</h5>
                            <h6>{data?.impostos?.ICMS?.ICMS00?.vICMS}</h6>
                        </div>
                    </div>
                </div>
            </CardStyle>
            <DadosStyle>
                <div>
                    <div
                        className="header"
                        onClick={() => setModalRemetente(!modalRemetente)}
                    >
                        <h3>Dados Remetente</h3>
                        {!modalRemetente ? <ChevronDown /> : <ChevronUp />}
                    </div>
                    {modalRemetente && (
                        <>
                            <LineStyle>
                                <div>
                                    <h5>Razão social</h5>
                                    <h6>{data?.remetente?.xNome}</h6>
                                </div>
                                <div>
                                    <h5>Nome fantasia</h5>
                                    <h6>{data?.remetente?.xFant}</h6>
                                </div>
                            </LineStyle>
                            <LineStyle>
                                <div>
                                    <h5>CNPJ</h5>
                                    <h6>{data?.remetente?.CNPJ}</h6>
                                </div>
                                <div>
                                    <h5>Inscrição Estadual</h5>
                                    <h6>{data?.remetente?.IE}</h6>
                                </div>
                                <div>
                                    <h5>Inscrição Munincipal</h5>
                                    <h6>{data?.remetente?.IM}</h6>
                                </div>
                                <div>
                                    <h5>CNAE Fiscal</h5>
                                    <h6>{data?.remetente?.CNAE}</h6>
                                </div>
                            </LineStyle>
                            <LineStyle>
                                <div>
                                    <h5>Telefone</h5>
                                    <h6>{data?.remetente?.enderReme?.fone}</h6>
                                </div>
                                <div>
                                    <h5>CEP</h5>
                                    <h6>{data?.remetente?.enderReme?.CEP}</h6>
                                </div>
                                <div>
                                    <h5>UF</h5>
                                    <h6>{data?.remetente?.enderReme?.UF}</h6>
                                </div>
                                <div>
                                    <h5>País</h5>
                                    <h6>{data?.remetente?.enderReme?.xPais}</h6>
                                </div>
                            </LineStyle>
                            <LineStyle>
                                <div>
                                    <h5>Endereço</h5>
                                    <h6>{data?.remetente?.enderReme?.xLgr}</h6>
                                </div>
                                <div>
                                    <h5>Número</h5>
                                    <h6>{data?.remetente?.enderReme?.nro}</h6>
                                </div>
                            </LineStyle>
                            <LineStyle>
                                <div>
                                    <h5>Bairro</h5>
                                    <h6>
                                        {data?.remetente?.enderReme?.xBairro}
                                    </h6>
                                </div>
                                <div>
                                    <h5>Município</h5>
                                    <h6>{data?.remetente?.enderReme?.xMun}</h6>
                                </div>
                            </LineStyle>
                        </>
                    )}
                </div>
            </DadosStyle>
            <DadosStyle>
                <div>
                    <div
                        className="header"
                        onClick={() => setModalEmitente(!modalEmitente)}
                    >
                        <h3>Dados Emitente</h3>
                        {!modalEmitente ? <ChevronDown /> : <ChevronUp />}
                    </div>
                    {modalEmitente && (
                        <>
                            <LineStyle>
                                <div>
                                    <h5>Razão social</h5>
                                    <h6>{data?.emitente?.xNome}</h6>
                                </div>
                                <div>
                                    <h5>Nome fantasia</h5>
                                    <h6>{data?.emitente?.xFant}</h6>
                                </div>
                            </LineStyle>
                            <LineStyle>
                                <div>
                                    <h5>CNPJ</h5>
                                    <h6>{data?.emitente?.CNPJ}</h6>
                                </div>
                                <div>
                                    <h5>Inscrição Estadual</h5>
                                    <h6>{data?.emitente?.IE}</h6>
                                </div>
                                <div>
                                    <h5>Inscrição Munincipal</h5>
                                    <h6>{data?.emitente?.IE}</h6>
                                </div>
                                <div>
                                    <h5>CNAE Fiscal</h5>
                                    <h6>{data?.emitente?.CNAE}</h6>
                                </div>
                            </LineStyle>
                            <LineStyle>
                                <div>
                                    <h5>Telefone</h5>
                                    <h6>{data?.emitente?.enderEmit?.fone}</h6>
                                </div>
                                <div>
                                    <h5>CEP</h5>
                                    <h6>{data?.emitente?.enderEmit?.CEP}</h6>
                                </div>
                                <div>
                                    <h5>UF</h5>
                                    <h6>{data?.emitente?.enderEmit?.UF}</h6>
                                </div>
                                <div>
                                    <h5>País</h5>
                                    <h6>{data?.emitente?.enderEmit?.xPais}</h6>
                                </div>
                            </LineStyle>
                            <LineStyle>
                                <div>
                                    <h5>Endereço</h5>
                                    <h6>{data?.emitente?.enderEmit?.xLgr}</h6>
                                </div>
                                <div>
                                    <h5>Número</h5>
                                    <h6>{data?.emitente?.enderEmit?.nro}</h6>
                                </div>
                            </LineStyle>
                            <LineStyle>
                                <div>
                                    <h5>Bairro</h5>
                                    <h6>
                                        {data?.emitente?.enderEmit?.xBairro}
                                    </h6>
                                </div>
                                <div>
                                    <h5>Município</h5>
                                    <h6>{data?.emitente?.enderEmit?.xMun}</h6>
                                </div>
                            </LineStyle>
                        </>
                    )}
                </div>
            </DadosStyle>
            <DadosStyle>
                <div>
                    <div
                        className="header"
                        onClick={() => setModalDestinatario(!modalDestinatário)}
                    >
                        <h3>Dados Destinatário</h3>
                        {!modalDestinatário ? <ChevronDown /> : <ChevronUp />}
                    </div>
                    {modalDestinatário && (
                        <>
                            <LineStyle>
                                <div>
                                    <h5>Razão social</h5>
                                    <h6>{data?.destinatario?.xNome}</h6>
                                </div>
                                <div>
                                    <h5>Nome fantasia</h5>
                                    <h6>{data?.destinatario?.xFant}</h6>
                                </div>
                            </LineStyle>
                            <LineStyle>
                                <div>
                                    <h5>CNPJ</h5>
                                    <h6>{data?.destinatario?.CNPJ}</h6>
                                </div>
                                <div>
                                    <h5>Inscrição Estadual</h5>
                                    <h6>{data?.destinatario?.IE}</h6>
                                </div>
                                <div>
                                    <h5>Inscrição Munincipal</h5>
                                    <h6>{data?.destinatario?.IE}</h6>
                                </div>
                                <div>
                                    <h5>CNAE Fiscal</h5>
                                    <h6>{data?.destinatario?.CNAE}</h6>
                                </div>
                            </LineStyle>
                            <LineStyle>
                                <div>
                                    <h5>Telefone</h5>
                                    <h6>
                                        {data?.destinatario?.enderDest?.fone}
                                    </h6>
                                </div>
                                <div>
                                    <h5>CEP</h5>
                                    <h6>
                                        {data?.destinatario?.enderDest?.CEP}
                                    </h6>
                                </div>
                                <div>
                                    <h5>UF</h5>
                                    <h6>{data?.destinatario?.enderDest?.UF}</h6>
                                </div>
                                <div>
                                    <h5>País</h5>
                                    <h6>
                                        {data?.destinatario?.enderDest?.xPais}
                                    </h6>
                                </div>
                            </LineStyle>
                            <LineStyle>
                                <div>
                                    <h5>Endereço</h5>
                                    <h6>
                                        {data?.destinatario?.enderDest?.xLgr}
                                    </h6>
                                </div>
                                <div>
                                    <h5>Número</h5>
                                    <h6>
                                        {data?.destinatario?.enderDest?.nro}
                                    </h6>
                                </div>
                            </LineStyle>
                            <LineStyle>
                                <div>
                                    <h5>Bairro</h5>
                                    <h6>
                                        {data?.destinatario?.enderDest?.xBairro}
                                    </h6>
                                </div>
                                <div>
                                    <h5>Município</h5>
                                    <h6>
                                        {data?.destinatario?.enderDest?.xMun}
                                    </h6>
                                </div>
                            </LineStyle>
                        </>
                    )}
                </div>
            </DadosStyle>
            <CardStyle>
                <div>
                    <h3>Características</h3>
                    <div>
                        <div>
                            <h5>Modal</h5>
                            <h6>{data?.informacoes_cte?.modal}</h6>
                        </div>
                        <div>
                            <h5>Tipo de serviço</h5>
                            <h6>{data?.informacoes_cte?.tpServ}</h6>
                        </div>
                        <div>
                            <h5>Forma</h5>
                            <h6>{data?.informacoes_cte?.tpEmis}</h6>
                        </div>
                        <div>
                            <h5>CFOP</h5>
                            <h6>{data?.informacoes_cte?.nCFOP}</h6>
                        </div>
                        <div>
                            <h5>Descr CFOP</h5>
                            <h6>{data?.informacoes_cte?.nCFOP}</h6>
                        </div>
                        <div>
                            <h5>Início da Prestação</h5>
                            <h6>
                                {data?.informacoes_cte?.UFIni} -{' '}
                                {data?.informacoes_cte?.xMunIni}
                            </h6>
                        </div>
                        <div>
                            <h5>Fim da Prestação</h5>
                            <h6>
                                {data?.informacoes_cte?.UFFim} -{' '}
                                {data?.informacoes_cte?.xMunFim}
                            </h6>
                        </div>
                    </div>
                </div>
            </CardStyle>
            <CardStyle>
                <div>
                    <h3>Situação Atual</h3>
                    <div>
                        <div>
                            <h5>Status Sefaz</h5>
                            <h6>{router.query?.status_sefaz}</h6>
                        </div>
                        <div>
                            <h5>Descrição Status</h5>
                            <h6>{router.query?.desc_status_sefaz}</h6>
                        </div>
                    </div>
                </div>
            </CardStyle>
        </>
    );
}
