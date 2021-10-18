import React, {useEffect, useState} from 'react';
import BotaoVoltar from "@components/BotaoVoltar";
import Head from "next/head";
import { useRouter } from "next/router";
import { MoreHorizontal,Plus } from "@geist-ui/react-icons";
import { CompaniesGrid } from './style';
import {AddBtn} from "../../styles/buttons";
import * as companies from "@services/empresas"
import Popover from '@components/Popover';

export default function Empresas() {
    const router = useRouter();
    

//    async function getData() {
//         const response = await companies.getCompanies()
//         const data = response.data
//         // console.log("compa:",data)    
//         return data
//     }

    // useEffect(() => {
    //    getData().then(response => setTest(response))
      
    // }, [])ss
    

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
                        <td><Popover /></td>
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
