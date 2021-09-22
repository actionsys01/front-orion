import api from "../api";

type IUsuario = {
  nome: string;
  email: string;
  senha: string;
  perfil_id?: string;
  empresa_id?: string;
};

export default async function criar(data: IUsuario) {
  const response = await api.post("/usuarios", data);
  return response;
}
