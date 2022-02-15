import api from '@services/api';

interface IFiltro {
  campo?: string;
  valor?: string | number;
  compare?: string;
}
export default async function getCteByCompanyId(
  company_id: number,
  page: number,
  cte: IFiltro[] | undefined,
) {
  const filters = cte.reduce((acc, { campo, valor, compare }) => {
    if (compare === 'different' && campo != 'dt_hr_emit') {
      campo = `${campo}_${compare}`;
    }
    if (compare === 'contain') {
      campo = `${campo}_contain`;
    }
    if (campo === 'dt_hr_emit') {
      compare === 'above' || compare === 'lower' || compare === 'different'
        ? (campo = `${campo}_${compare}`)
        : (campo = 'dt_hr_emit');
      const [dia, mes, ano] = valor.toString().trim().split('/');
      valor = `${ano}-${mes}-${dia}T`;
    }
    return { ...acc, [campo]: valor };
  }, {});

  const response = await api.get(`/ctes/pagination/${company_id}`, {
    params: {
      page: page,
      ...filters,
    },
  });
  return response;
}
