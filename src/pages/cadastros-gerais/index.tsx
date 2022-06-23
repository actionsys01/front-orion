import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { UserPlus, Inbox, Trello, Server } from '@geist-ui/react-icons';
import { IconLine } from './style';

export default function CadastrosGerais() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Orion | Cadastros Gerais</title>
      </Head>
      <h2>Cadastros Gerais</h2>
      <IconLine>
        <div>
          <label htmlFor="first">
            <p>Cadastro de Pessoas</p>
          </label>
          <UserPlus id="first" />
        </div>
        <div>
          <label htmlFor="second">
            <p>Cadastro de Produtos</p>
          </label>
          <Inbox
            id="second"
            onClick={() => {
              router.push('/itens');
            }}
          />
        </div>
        <div>
          <label htmlFor="third">
            <p>Cadastro de Conversão de UM</p>
          </label>
          <Trello id="third" />
        </div>
      </IconLine>
      <IconLine>
        <div>
          <label htmlFor="first">De/Para Itens de Fornecedor</label>
          <UserPlus id="first" onClick={() => router.push('/referencia-cruzada/referencia-cruzada-fornecedores')}/>
          
        </div>
        <div>
          <label htmlFor="second"> De/Para CNPJ Fornecedor</label>
          <Inbox id="second" onClick={() => router.push('/regras-busca')}/>
        </div>
        <div>
          <label htmlFor="third">Cadastro de Códigos de Categoria</label>
          <Trello
            id="third"
            onClick={() => router.push('/cadastros-aplicacoes')}
          />
        </div>
      </IconLine>
    </>
  );
}

CadastrosGerais.auth = true;
