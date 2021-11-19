import api from "@services/api";

export default async function getVehicleById(placa : string) {
    const response = await api.get("/portaria/veiculos", {
        params : {
            placa
        }
    })

    return response
}