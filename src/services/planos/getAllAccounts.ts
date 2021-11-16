import api from "@services/api";

export default async function getAllAccounts() {
    const response = await api.get("planos/all/plains");
    return response
}