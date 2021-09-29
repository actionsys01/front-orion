import api from "@services/api";

interface ICreateProfile {
  name: string;
  descricao: string;
  permissions: number[]
  empresa_id: number;
}

export default async function criar(data: ICreateProfile) {
  const response = await api.post("/perfil", data);
  return response;
}
