import React from 'react';
import BotaoVoltar from "@components/BotaoVoltar";
import Head from "next/head";
import { useRouter } from "next/router";
import { MoreHorizontal,Plus } from "@geist-ui/react-icons";
import { CompaniesGrid } from './style';
import {AddBtn} from "../../styles/buttons"

export default function Empresas() {
    const router = useRouter();
    return (
        <>
        <Head>
            <title>Orion | Cadastro de Empresas</title>
        </Head>
        <h2>
            Cadastro de Empresas
        </h2>
        <AddBtn>
            <button onClick={() => router.push({pathname: "/cadastrar-empresa"})}>
                <span><Plus /></span>
                Adicionar
            </button>
        </AddBtn>
        <CompaniesGrid>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>CNPJ</th>
                        <th>Plano</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><MoreHorizontal /></td>
                        <td>AÇUCAR UNIÃO SA</td>
                        <td>85 256 285 0001</td>
                        <td>Master</td>
                        <td>uniao@empresa.com</td>
                        <td>11 9895 4512</td>
                    </tr>
                </tbody>
            </table>
        </CompaniesGrid>
        </>
    )
}

Empresas.auth = true
