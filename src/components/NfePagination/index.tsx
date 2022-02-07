import React, { useMemo, useCallback } from 'react';
import getNfePagesByCompanyId from '@services/nfe';
import INfeDto from '@services/nfe/dtos/INfeDTO';
import { Dot, Table, Tooltip } from '@geist-ui/react';
import { useFiltro } from '@contexts/filtro';
import { useEffect } from 'react';
import { useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { Grid, Pages } from './style';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import PopoverComponent from './Popover';
import { useSecurityContext } from '@contexts/security';
import { useToasts } from '@geist-ui/react';
import Loader from '@components/Loader';

interface Props {
    company_id: number | undefined;
    token: string | undefined;
    sefaz?: {
        cor: 'secondary' | 'success' | 'error' | 'warning' | 'default';
        message: string;
    };
    portaria?: {
        cor: 'success' | 'warning' | 'default' | 'error';
        message: string;
    };
}

export default function NfePagination({
    company_id,
    token,
    sefaz,
    portaria,
}: Props) {
    const [nfe, setNfes] = useState<INfeDto[]>([]);
    const router = useRouter();
    const { nfes } = useFiltro();
    const [page, setPage] = useState(1);
    const [quantityPage, setQuantityPage] = useState(1);
    const { nfePermissions } = useSecurityContext();
    const [, setToast] = useToasts();
    const [loading, setLoading] = useState(true);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const getNfesAndTotalPages = useCallback(async () => {
        try {
            const responseNfes = await getNfePagesByCompanyId(
                page,
                company_id,
                nfes,
            );
            const { data } = responseNfes;
            setLoading(false);
            setNfes(data.nfes);
            setQuantityPage(Math.ceil(data.total / 8));
        } catch (error) {
            setToast({
                text: 'Notas não localizadas',
                type: 'warning',
            });
        }
    }, [nfes, page]);

    useEffect(() => {
        getNfesAndTotalPages();
    }, [page, nfes]);

    useEffect(() => {
        if (page > quantityPage) {
            setPage(1);
        }
    }, [nfes, quantityPage, page]);

    console.log('nfe.controle_entrada', nfe);

    const dataFormatted = useMemo(() => {
        const newData: any = [];
        if (nfe) {
            nfe.forEach(item => {
                newData.push({
                    ...item,
                    sefaz_status: (
                        <Tooltip
                            text={
                                item?.sefaz_status === 999
                                    ? 'Indisponível'
                                    : item?.sefaz_status === 100
                                    ? 'Autorizada'
                                    : item?.sefaz_status === 101
                                    ? 'Cancelada'
                                    : null
                            }
                            type={sefaz?.cor}
                        >
                            <Dot
                                type={
                                    item?.sefaz_status === 100
                                        ? 'success'
                                        : item?.sefaz_status === 101
                                        ? 'warning'
                                        : 'default'
                                }
                            />
                        </Tooltip>
                    ),
                    portaria_status: (
                        <Tooltip
                            text={
                                item?.controle_entrada?.status === 0
                                    ? 'Na Portaria'
                                    : item?.controle_entrada?.status === 1
                                    ? 'Entrada Autorizada'
                                    : item?.controle_entrada?.status === 2
                                    ? 'Entrada Fechada'
                                    : item?.controle_entrada?.status === 3
                                    ? 'Não se Aplica'
                                    : item?.controle_entrada?.status === 4
                                    ? 'Entrega Cancelada'
                                    : ''
                            }
                            type={portaria?.cor}
                        >
                            <Dot
                                type={
                                    item?.controle_entrada?.status === 0
                                        ? 'warning'
                                        : item?.controle_entrada?.status === 1
                                        ? 'success'
                                        : item?.controle_entrada?.status === 2
                                        ? 'success'
                                        : item?.controle_entrada?.status === 3
                                        ? 'error'
                                        : item?.controle_entrada?.status === 4
                                        ? 'success'
                                        : 'default'
                                }
                            />
                        </Tooltip>
                    ),
                    emissionDate: format(
                        new Date(item.dt_hr_emi),
                        'dd/MM/yyyy HH:mm:ss',
                    ),
                    receiveDate: format(
                        new Date(item.criado_em),
                        'dd/MM/yyyy HH:mm:ss',
                    ),
                    option: (actions: any, item: any) => (
                        <PopoverComponent item={item} />
                    ),
                });
            });
        }
        return newData;
    }, [nfe]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Grid>
                {nfePermissions.VISUALIZAR && (
                    <Table data={dataFormatted}>
                        <Table.Column prop="option" />
                        <Table.Column
                            prop="emissionDate"
                            label="Data/hora Emissão"
                        />
                        <Table.Column prop="nota" label="Número" />
                        <Table.Column prop="serie" label="Série" />
                        <Table.Column
                            prop="emit_cnpj"
                            label="CNPJ Fornecedor"
                        />
                        <Table.Column
                            prop="emit_nome"
                            label="Nome Fornecedor"
                        />
                        <Table.Column
                            prop="sefaz_status"
                            label="Status Sefaz"
                        />
                        <Table.Column
                            prop="portaria_status"
                            label="Status Entrada"
                        />
                        <Table.Column
                            prop="chave_nota"
                            label="Chave de Acesso"
                        />
                        <Table.Column
                            prop="dest_cnpj"
                            label="CNPJ Destinatário"
                        />
                        <Table.Column prop="dest_nome" label="Destinatário" />
                        <Table.Column
                            prop="receiveDate"
                            label="Data/hora Recebimento"
                        />
                    </Table>
                )}
            </Grid>
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
