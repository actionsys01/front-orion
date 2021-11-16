import api from "@services/api";


interface IFiltro {
    campo: { label: string; value: string } | undefined;
    valor: string;
  }

export default async function getCteByCompanyId(company_id : number | undefined, token : string | undefined, page : number, filter ? : IFiltro[] | undefined) {


    const ctes = await  api.get(`/ctes${!!filter ? `?filtro=${JSON.stringify(filter)}` : "?filtro=%5B%5D"}`, { 
        params: {
            company_id,
        page
        }
    }
    )

    return ctes    
    
}