import api from "@services/api";

export default async function getCteXml(chave :  string) {
    const response = api.get(`/ctes/informations/${chave}`)

    return response
}