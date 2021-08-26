import NextAuth from "next-auth";

interface Usuario {
  id: number;
  email: string;
  nome: string;
  empresa: {
    nome_fantasia: string;
    id: number;
  };
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    usuario: Usuario;
    token: string;
    expira_em: number;
    error:string
  }
  interface User {
    usuario: Usuario;
    token: string;
  }
}
declare module "next-auth/jwt" {
  /* Returned by the `jwt` callback and `getToken`, when using JWT sessions /
  interface JWT {
    /* OpenID ID Token /
    // idToken?: string;
    usuario: User;
    token: string;
    exp: number;
  }
}