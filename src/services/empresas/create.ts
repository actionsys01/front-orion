import api from "@services/api";

interface ICriarEmpresaDTO {
    razao_social: string;
    nome_fantasia: string;
    cnpj: string;
    email: string;
    status: number;
    plano_id: number
  }


  export default async function create(data: ICriarEmpresaDTO) {
      const response = await api.post("/empresas", data);
      return response
  }