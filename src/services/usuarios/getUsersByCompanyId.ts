import api from "@services/api"

export default async function getUsersByCompanyId(page : number){


    
    console.log(page)
    const response  = await api.get(`/usuarios/`, {
       params : {
           page
       }
    })


    return response
    
}