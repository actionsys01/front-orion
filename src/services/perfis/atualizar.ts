import api from "@services/api";

interface IUpdateProfile{
  id_profile : number;
  nome : string;
  descricao : string;
  permissions : Number[];
}

export default async function atualizar(data: IUpdateProfile) {
  return await api.put(`/perfil/`, data);
}
