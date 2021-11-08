import api from "@services/api";

interface VehicleProps {
    placa: string;
    descricao: string;
    empresa: number;
    data_entrada: Date
}

export default async function createVehicle(data: VehicleProps) {
    const response = await api.post("/portaria/veiculos", data);
    return response
}