import api from "@services/api";



export default async function getAllCompaniesByPage(page: number) {
    const response = await api.get("/empresas", {
    params : {
        page
    }
    });
    
    return response
}