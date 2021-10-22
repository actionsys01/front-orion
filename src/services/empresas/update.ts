import api from "@services/api";

interface ICompanyUpdate {
    empresa_id: number;
    razao_social: string;
    nome_fantasia: string;
    cnpj: string;
    email: string;
    status: number;
    plano_id: number;
  }

  export default async function update(data: ICompanyUpdate) {
      const response = await api.put("/empresas", data);
      return response 
  }