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
    if (
      compare === 'different' && campo != 'dt_hr_emit' &&
      campo != 'dt_hr_recebimento'
    ) {
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
    if (campo === 'dt_hr_recebimento') {
      compare === 'above' || compare === 'lower' || compare === 'different'
        ? (campo = `${campo}_${compare}`)
        : (campo = 'dt_hr_recebimento');

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
