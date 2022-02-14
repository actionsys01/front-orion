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
    if (compare === 'different' && campo != 'dt_hr_emit') {
      campo = `${campo}_${compare}`;
    }
    if (compare === 'contain') {
      campo = `${campo}_contain`;
    }
    if (campo === 'dt_hr_emit') {
      compare != 'equal' || compare === undefined
        ? (campo = `${campo}_${compare}`)
        : campo;

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
