import api from '@services/api';

interface IFiltro {
    campo?: string;
    valor?: string | number;
    compare?: string;
}

export default async function getNfse(
    page: number,
    company_id: number,
    nfses: IFiltro[] | undefined,
) {
    const filters = nfses.reduce((acc, { campo, valor, compare }) => {
        if (campo === 'chave_nota' && compare === 'different') {
            campo = 'chave_nota_different';
        }
        if (campo === 'dt_hr_emit') {
            compare === 'above'
                ? (campo = 'dt_hr_emit_above')
                : compare === 'lower'
                ? (campo = 'dt_hr_emit_lower')
                : compare === 'different'
                ? (campo = 'dt_hr_emit_different')
                : '';

            const [dia, mes, ano] = valor.toString().split('/');
            valor = `${ano}-${mes}-${dia}T`;
        }
        if (campo === 'dt_hr_recebimento') {
            compare === 'above'
                ? (campo = 'dt_hr_recebimento_above')
                : compare === 'lower'
                ? (campo = 'dt_hr_recebimento_lower')
                : compare === 'different'
                ? (campo = 'dt_hr_recebimento_different')
                : '';

            const [dia, mes, ano] = valor.toString().trim().split('/');
            valor = `${ano}-${mes}-${dia}T`;
        }

        return { ...acc, [campo]: valor };
    }, {});

    const response = await api.get(`/nfse/pagination/${company_id}`, {
        params: {
            page: page,
            ...filters,
        },
    });
    return response;
}
