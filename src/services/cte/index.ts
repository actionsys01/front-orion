import api from "@services/api";


export default async function getCteByCompanyId(company_id : number | undefined, token : string | undefined, page : number) {

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };


    const ctes = await  api.post('/ctes/', { 
        company_id,
        page
    },
    config
    )


    return ctes
    
}