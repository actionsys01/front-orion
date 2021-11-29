import api from "@services/api";

interface IQueryParams {
    chave_nota?: string;
    status?: string;
    data_entrada?: string;
    data_saida?: string;
}


interface IFiltro {
    campo: string;
    valor: string;
  }

  interface Teste {
      String : string
  }

  
interface FilterProps {
    [key: string] : string;
  }

  export default async function getEntrance(page: number, id: number, filters: IFiltro[]) {
    console.log("filtros na request", filters) 
    const filtros = filters.reduce((acc, {campo, valor}) => {
        return {...acc, [campo] : valor}
    }, {})

 
    const response = await api.get(`/portaria/controle-entrada/paginacao/${id}`, {
        params: {
            page,
            ...filtros
        }
    })
    return response
}