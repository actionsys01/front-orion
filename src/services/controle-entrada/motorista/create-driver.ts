import api from "@services/api";

interface DriverProps {
    rg: string;
    nome: string;
    empresa: number
}

export default async function createDriver(data: DriverProps){
    const response = await api.post("/portaria/motoristas", data);
    return response
}