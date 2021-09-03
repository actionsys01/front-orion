import NextAuth, { Usuario } from "next-auth";
interface permicao {
  categoria : string;
  acao : string;
}

interface plano {
  id : string;
  nome : string
  aplicacoes : {
    categoria : string
  }[];
}

interface perfil{
  id : string;
  nome : string;
  descricao : string;
  permissoes : permicao[] 
}




declare module "next-auth" {

   interface Usuario {
    id: number;
    email: string;
    nome: string;
    empresa: {
      id: number;
      razao_social: string;
      plano : plano
    }
    perfil : perfil;
    token : string;
  }

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
      interface JWT {
       usuario: Usuario;
       token : string;
      }
}