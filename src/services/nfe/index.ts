import api from '@services/api';

interface IFiltro {
    campo?: string;
    valor?: string | number;
    compare?: string;
}

export default async function getNfe(
    page: number,
    company_id: number,
    nfe: IFiltro[] | undefined,
) {
    const filters = nfe.reduce((acc, { campo, valor, compare }) => {
        if (campo === 'chave_nota' && compare === 'different') {
            campo = 'chave_nota_different';
        }
        if (campo === 'serie' && compare === 'different') {
            campo = 'serie_different';
        }
        if (campo === 'dest_cnpj' && compare === 'different') {
            campo = 'dest_cnpj_different';
        }
        if (campo === 'dest_nome' && compare === 'different') {
            campo = 'dest_nome_different';
        }
        if (campo === 'emit_cnpj' && compare === 'different') {
            campo = 'emit_cnpj_different';
        }
        if (campo === 'emit_nome' && compare === 'different') {
            campo = 'emit_nome_different';
        }
        if (campo === 'nota' && compare === 'different') {
            campo = 'nota_different';
        }
        if (campo === 'dt_hr_emit') {
            compare === 'above'
                ? (campo = 'dt_hr_emit_above')
                : compare === 'lower'
                ? (campo = 'dt_hr_emit_lower')
                : compare === 'different'
                ? (campo = 'dt_hr_emit_different')
                : '';
            const [dia, mes, ano] = valor.toString().trim().split('/');
            valor = `${ano}-${mes}-${dia}T`;
        }
        return { ...acc, [campo]: valor };
    }, {});

    const response = await api.get(`/nfe/pagination/${company_id}`, {
        params: {
            page: page,
            ...filters,
        },
    });
    return response;
}
