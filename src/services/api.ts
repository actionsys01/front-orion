import axios from "axios";
import { getSession, signOut } from "next-auth/client";
import { fromUnixTime, isBefore } from "date-fns";
import jwtDecode from "jwt-decode";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BACKEND_URL,
});

interface IJwtDecode {
  exp: string;
}

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session) {
    //verifica se o toke esta valido
    const { exp } = jwtDecode(session?.token) as IJwtDecode;
    const dataToken = fromUnixTime(Number(exp));

    if (isBefore(dataToken, Date.now())) {
      signOut();
    }
  }

  config.headers.Authorization = `Bearer ${session?.token}`;

  return config;
});

export default api;
