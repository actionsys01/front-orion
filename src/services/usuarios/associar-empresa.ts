import api from "../api";

type IUsuario = {
  usuario_id: number;
  empresa_id: number;
};

export default async function associarEmpresa(data: IUsuario) {
  const response = await api.post("/usuarios/empresas", data);
  return response;
}
