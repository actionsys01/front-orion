import React, { useState, useMemo, useEffect, useCallback} from 'react'; 
import { AccountStyle, AccountGrid, ButtonStyle } from './style';
import Head from "next/head";
import { useRouter } from "next/router";
import { Checkbox } from '@material-ui/core';
import { MoreHorizontal } from "@geist-ui/react-icons";

export default function Planos() {
    const router = useRouter();

    return <>
     <Head>
        <title>Orion | Planos</title>
      </Head>
    <AccountStyle>
        <h2>Cadastro de Planos</h2>
    </AccountStyle>
    {/* <ButtonStyle>

    </ButtonStyle> */}
    <AccountGrid>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Dias</th>
                    <th>Armazenamento</th>
                    <th>Notas p/ Mês</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><MoreHorizontal /></td>
                    <td>Plano Rover</td>
                    <td>Plano da Empresa Rover</td>
                    <td>365</td>
                    <td>15Gb</td>
                    <td>8000</td>
                </tr>
            </tbody>
        </table>
    </AccountGrid>
    </>
}

Planos.auth = true