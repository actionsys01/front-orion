import { fromUnixTime, isBefore } from "date-fns";
import jwtDecode from "jwt-decode";
import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Providers from "next-auth/providers";
import api from "../../../services/api";

interface IUser {
  email: string;
  senha: string;
}

export default NextAuth({
  callbacks: {
    jwt(token: JWT, user: User) {
      if (user) {
        token.usuario = user.usuario;
        token.token = user.token;
      }
      // if (token) {
      //   const { exp } = jwtDecode(token.token) as IJwtDecode;
      //   const dataToken = fromUnixTime(Number(exp));

      //   if (isBefore(dataToken, Date.now()))
      //     return { error: "RefreshAccessTokenError", ...token };
      // }

      return token;
    },
    session(session: Session, jwt: JWT) {
      session.usuario = jwt.usuario;
      session.token = jwt.token;
      return session;
    },
  },
  session: {
    //1 dia em segundos
    maxAge: 86400,
  },
  providers: [
    Providers.Credentials({
      name: "Credentials",
      async authorize(credentials, request) {
        try {
          const res = await api.post("/sessoes", {
            email: request.body.email,
            senha: request.body.senha,
          });

          const user = await res.data;

          if (user) return user;

          return null;
        } catch (error) {
          throw new Error('error.response.data.mensagem');
        }
      },
    }),
  ],
});