import api from "@services/api";

interface IFiltro {
    campo?: string;
    valor?: string | number;
  }

export default async function getNfe(page: number, company_id: number, nfe : IFiltro[] | undefined) {
    const filters = nfe.reduce((acc, {campo, valor}) => {
        if(campo === "dt_hr_emit" || campo === "dt_hr_recebimento"){
            const [dia, mes, ano] = valor.toString().split("/")
            valor = `${ano}-${mes}-${dia}T`
        }
        return {...acc, [campo] : valor}
    }, {})

    const response = await api.get(`/nfe/pagination/${company_id}`, {
        params: {
            page: page,
            ...filters
        }
    })
    return response
}