import api from "../api";

type IUsuario = {
  nome: string;
  email: string;
  senha: string;
  perfil_id?: number;
  empresa_id?: number;
};

export default async function criar(data: IUsuario) {
  const response = await api.post("/usuarios", data);
  return response;
}
