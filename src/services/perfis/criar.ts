import api from "../api";

interface IPerfil {
  nome: string;
  descricao: string;
}

export default async function criar(data: IPerfil) {
  const response = await api.post(`/perfil/`, data);
  return response;
}
