import api from "@services/api";

export default async function getDashboard(cnpj:string) {
    const response = api.get("/empresas/certificado/buscar", {
        params: {
            cnpj
        }
    })

    return response
}