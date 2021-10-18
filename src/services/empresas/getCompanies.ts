import api from "@services/api";

export default async function getCompanies() {
    const response = await api.get("/empresas");
    return response
}