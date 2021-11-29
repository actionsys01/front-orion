import { createServer } from "miragejs";

export default createServer({
    routes() {
        this.namespace = "api",

        this.get("/nfse", () => [
            {
                id: 1,
                chave_nota: "NFSe45552211548798565652215487896566666666544521",
                empresa_id: 22,
                nota: "5342",
                emit_cnpj: "08109873000149",
                emit_nome: "MINERACAO REZENDE EXTRACAO DE AREIA LTDA",
                dest_cnpj: "20346524000146",
                dest_nome: "KINROSS BRASIL MINERACAO S.A.",
                serie: 33,
                prefeitura_status: 100,
                dt_hr_emi: "2021-05-20T13:55:58.000Z",
                dt_hr_receb: "2021-05-25T16:25:00.000Z"
            }
        ])
    }
})


