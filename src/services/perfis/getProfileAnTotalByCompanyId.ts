import api from "@services/api"

export default async function getProfileAnTotalByCompanyId(company : number | undefined,page : number){

    const response  = await api.get(`/perfil/${company}`, {
       params : {
           page
       }
    })


    return response
    
}