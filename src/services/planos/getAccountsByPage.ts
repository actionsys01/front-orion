import api from "@services/api";

export default async function getAccountsByPage(page:number) {
    const response = await api.get("/planos", {
        params : {
            page
        }
    });

    return response
}