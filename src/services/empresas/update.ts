import api from "@services/api";

interface IRequest {
    razao_social: string;
    nome_fantasia: string;
    cnpj: string;
    email: string;
    status: boolean;
    usuario_id: number;
    ip: string;
  }

  export default async function update(data: IRequest) {
      const response = await api.put("/empresas", data);
      return response 
  }