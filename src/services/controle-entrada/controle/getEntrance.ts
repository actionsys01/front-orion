import api from "@services/api";

interface IFiltro {
    campo: string;
    valor: string | number;
  }

interface FilterProps {
    [key: string] : string;
  }

  export default async function getEntrance(page: number, id: number, filters: IFiltro[]) {
    // console.log("filtros na request", filters)
    const filtros = filters.reduce((acc, {campo, valor}) => {
        if(campo === "data_entrada" || campo === "data_saida") {
            const [dia, mes, ano] = valor.toString().split("/")
            valor = `${ano}-${mes}-${dia}`
        }
        // if (campo === "numero_entrega") {
        //     valor = parseInt(valor, 10)
        // }
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