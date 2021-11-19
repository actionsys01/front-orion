import api from "@services/api";

export default async function getDriverById( rg : string) {
    const response = await api.get("/portaria/motoristas", {
        params : {
            rg
        }
    } )

    return response
}