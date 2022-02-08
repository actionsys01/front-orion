import React, { useMemo, useCallback } from 'react';
import getCteByCompanyId from '@services/cte';
import INfeDto from '@services/nfe/dtos/INfeDTO';
import { Dot, Table, Tooltip, useToasts } from '@geist-ui/react';
import { useEffect } from 'react';
import { Grid, Pages } from './style';
import { useState } from 'react';
import { useFiltro } from '@contexts/filtro';
import Pagination from '@material-ui/lab/Pagination';
import { format } from 'date-fns';
import PopoverCte from './Popover';
import { useSecurityContext } from '@contexts/security';
import Loader from '@components/Loader';

interface Props {
    company_id: number | undefined;
    token: string | undefined;
    sefaz?: {
        cor: 'secondary' | 'success' | 'error' | 'warning' | 'default';
        message: string;
    };
    portaria?: {
        cor: 'secondary' | 'success' | 'error' | 'warning' | 'default';
        message: string;
    };
}

export default function CtePagination({
    company_id,
    token,
    sefaz,
    portaria,
}: Props) {
    const [cte, setCte] = useState<INfeDto[]>([]);
    const [page, setPage] = useState(1);
    const { ctes } = useFiltro();
    const [quantityPage, setQuantityPage] = useState(1);
    const { ctePermissions } = useSecurityContext();
    const [, setToast] = useToasts();
    const [loading, setLoading] = useState(true);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const getCtesAndTotalPages = useCallback(async () => {
        try {
            const responseCtes = await getCteByCompanyId(
                company_id,
                token,
                page,
                ctes,
            );
            const { data } = responseCtes;
            setCte(data.ctes);

            setLoading(false);
            setQuantityPage(Math.ceil(data.total / 8));
        } catch (error) {
            setToast({
                text: 'Notas não localizadas',
                type: 'warning',
            });
        }
        console.log('ctes', cte);
    }, [ctes, page]);

    useEffect(() => {
        getCtesAndTotalPages();
    }, [ctes, page]);

    useEffect(() => {
        if (page > quantityPage) {
            setPage(1);
        }
    }, [ctes, quantityPage, page]);

    const dataFormatted = useMemo(() => {
        const newData: any = [];
        if (cte) {
            cte.forEach(item => {
                newData.push({
                    ...item,
                    sefaz_status: (
                        <Tooltip
                            text={
                                item.sefaz_status === 100
                                    ? 'Autorizada'
                                    : item.sefaz_status === 101
                                    ? 'Cancelada'
                                    : 'Indisponível'
                            }
                            type={sefaz?.cor}
                        >
                            <Dot
                                type={
                                    item.sefaz_status === 100
                                        ? 'success'
                                        : item.sefaz_status === 101
                                        ? 'warning'
                                        : 'default'
                                }
                            />
                        </Tooltip>
                    ),
                    portaria_status: (
                        <Tooltip
                            text={
                                item.controle_entrada?.status === 0
                                    ? 'Na Portaria'
                                    : item.controle_entrada?.status === 1
                                    ? 'Entrada Autorizada'
                                    : item?.controle_entrada?.status === 2
                                    ? 'Entrada Fechada'
                                    : item?.controle_entrada?.status === 3
                                    ? 'Não se Aplica'
                                    : item?.controle_entrada?.status === 4
                                    ? 'Entrega Cancelada'
                                    : 'Aguardando Chegada'
                            }
                            type={portaria?.cor}
                        >
                            <Dot
                                type={
                                    item.controle_entrada?.status === 0
                                        ? 'warning'
                                        : item.controle_entrada?.status === 1
                                        ? 'success'
                                        : item?.controle_entrada?.status === 2
                                        ? 'success'
                                        : item?.controle_entrada?.status === 3
                                        ? 'error'
                                        : item?.controle_entrada?.status === 4
                                        ? 'error'
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
                        <PopoverCte item={item} />
                    ),
                });
            });
        }

        return newData;
    }, [cte]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Grid>
                {ctePermissions.VISUALIZAR && (
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
