import api from "@services/api";


interface IFiltro {
    campo: { label: string; value: string } | undefined;
    valor: string;
  }

export default async function getCteByCompanyId(company_id : number | undefined, token : string | undefined, page : number, filter ? : IFiltro[] | undefined) {

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const ctes = await  api.post(`/ctes${!!filter ? `?filtro=${JSON.stringify(filter)}` : "?filtro=%5B%5D"}`, { 
        company_id,
        page
    },
    config
    )

    return ctes    
    
}