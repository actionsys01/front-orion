import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import { useToasts, Dot, Tooltip } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFiltro } from '@contexts/filtro';
import Filtro from '@components/Filter-Compare';
import { format } from 'date-fns';
import { TableGrid } from '@styles/tableStyle';
import { Pages } from '@styles/pages';
import Pagination from '@material-ui/lab/Pagination';
import { nfseXmlData } from '@utils/mock-data/nfse-xml';
import { NfseProps } from '@services/nfse/types/NfseProps';
import Popover from '@components/Popover';
import { RowBtn } from './style';
import Danfse from '@components/danfse';
import { useSecurityContext } from '@contexts/security';
import * as nfseRequest from '@services/nfse';
import Loader from '@components/Loader';

interface GatheredProps {
    id: number;
    chave_nota: string;
    empresa_id: number;
    nota: string;
    emit_cnpj: string;
    emit_nome: string;
    dest_cnpj: string;
    dest_nome: string;
    serie: number;
    prefeitura_status: number;
    dt_hr_emi: string;
    dt_hr_receb: string;
    option: any;
    status_nota: any;
    emissionDate: string;
    receiveDate: string;
    xml: string;
}

export default function Nfse() {
    const [nfseData, setNfseData] = useState<NfseProps[]>([]);
    const { nfses } = useFiltro();
    const [page, setPage] = useState(1);
    const [quantityPage, setQuantityPage] = useState(1);
    const [session] = useSession();
    const router = useRouter();
    const { nfsePermissions } = useSecurityContext();
    const company_id = Number(session?.usuario.empresa.id);
    const [, setToast] = useToasts();
    const [loading, setLoading] = useState(true);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const getNfsesAndTotalPages = useCallback(async () => {
        try {
            const responseNfse = await nfseRequest.getNfse(
                page,
                company_id,
                nfses,
            );
            const { data } = responseNfse;
            setNfseData(data.nfses);
            setLoading(false);
            setQuantityPage(Math.ceil(data.total / 8));
        } catch (error) {
            setToast({
                text: 'Notas não localizadas',
                type: 'warning',
            });
        }
    }, [page, nfses]);

    useEffect(() => {
        getNfsesAndTotalPages();
    }, [page, nfses]);

    useEffect(() => {
        if (page > quantityPage) {
            setPage(1);
        }
    }, [quantityPage, page, nfses]);

    function printData(chave_nota) {
        try {
            // const response = await request
            const data = nfseXmlData;
            Danfse(data, chave_nota);
        } catch (error) {
            console.log(error);
        }
    }

    const gatheredData = useMemo(() => {
        const allData: any = [];
        if (nfseData) {
            nfseData.forEach((item, i) => {
                allData.push({
                    ...item,
                    status_nota: (
                        <Tooltip
                            text={
                                item.status_prefeitura === 100
                                    ? 'Autorizado'
                                    : 'Cancelada'
                            }
                        >
                            <Dot
                                type={
                                    item.status_prefeitura === 100
                                        ? 'success'
                                        : 'warning'
                                }
                            />
                        </Tooltip>
                    ),
                    emissionDate: format(
                        new Date(item.dt_hr_emit),
                        'dd/MM/yyyy HH:mm:ss',
                    ),
                    receiveDate: format(
                        new Date(item.dt_hr_recebimento),
                        'dd/MM/yyyy HH:mm:ss',
                    ),
                    option: (
                        <Popover
                            num={i}
                            quant={4}
                            content={[
                                {
                                    optionName: 'Visualizar',
                                    onClick: nfsePermissions.VISUALIZAR
                                        ? () => {
                                              const nfse_id = item.chave_nota;
                                              const status =
                                                  item.status_prefeitura;
                                              router.push({
                                                  pathname: '/nfse-detalhes',
                                                  query: { nfse_id, status },
                                              });
                                          }
                                        : () => '',
                                    className: nfsePermissions.VISUALIZAR
                                        ? 'able'
                                        : 'disabled',
                                },
                                {
                                    optionName: 'Histórico de Nota',
                                    onClick: nfsePermissions.HISTORICO
                                        ? () => {
                                              const chave_nota =
                                                  item.chave_nota;
                                              router.push({
                                                  pathname: '/historico-notas',
                                                  query: chave_nota,
                                              });
                                          }
                                        : () => '',
                                    className: nfsePermissions.HISTORICO
                                        ? 'able'
                                        : 'disabled',
                                },
                                {
                                    optionName: <a href={item.xml}>Download</a>,
                                    onClick: () => {
                                        <a href={item.xml}></a>;
                                    },
                                    className: 'able',
                                },
                                {
                                    optionName: 'Imprimir Nota',
                                    onClick: nfsePermissions.IMPRIMIR
                                        ? () => {
                                              const chave_nota =
                                                  item.chave_nota;
                                              printData(chave_nota);
                                          }
                                        : () => '',
                                    className: nfsePermissions.IMPRIMIR
                                        ? 'able'
                                        : 'disabled',
                                },
                            ]}
                        />
                    ),
                });
            });
        }
        return allData;
    }, [nfseData]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Head>
                <title>Orion | NFS-e</title>
            </Head>
            <h2>Painel de Controle NFS-e</h2>
            <RowBtn>
                <Filtro abaAtual={'nfse'} data={nfses} />
            </RowBtn>
            <TableGrid>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Data/Hora Emissão</th>
                            <th>Número</th>
                            <th>Série</th>
                            <th>CNPJ Fornecedor</th>
                            <th>Nome Fornecedor</th>
                            <th>Status Prefeitura</th>
                            <th>Chave de Acesso</th>
                            <th>CNPJ Destinatário</th>
                            <th>Destinatário</th>
                            <th>Data/Hora Recebimento</th>
                        </tr>
                    </thead>
                    {nfsePermissions.VISUALIZAR && (
                        <tbody>
                            {gatheredData.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.option}</td>
                                    <td>{item.emissionDate}</td>
                                    <td>{item.nota}</td>
                                    <td>{item.serie}</td>
                                    <td>{item.cnpj_emit}</td>
                                    <td>{item.nome_emit}</td>
                                    <td>{item.status_nota}</td>
                                    <td>{item.chave_nota}</td>
                                    <td>{item.cnpj_tomador}</td>
                                    <td>{item.nome_tomador}</td>
                                    <td>{item.receiveDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </TableGrid>

            <Pages>
                <Pagination
                    onChange={handleChange}
                    count={quantityPage}
                    shape="rounded"
                />
            </Pages>
        </>
    );
}

Nfse.auth = true;
