import React from "react";
import {Wrapper} from "./style";
import BotaoVoltar from "@components/BotaoVoltar";
import Head from "next/head";

export default function Historico () {
    

    return <>
    <Head>
        <title>Orion | Histórico da Nota </title>
      </Head>
      <BotaoVoltar />
      <h1>Histórico da Nota</h1>
    <Wrapper>
        <table>
            <thead>
                <tr>
                    <th>Data / Hora</th>
                    <th>Status</th>
                    <th>Definição de Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>22/10/2020 11:30:00</td>
                    <td>100</td>
                    <td>Nota Autorizada</td>
                </tr>
            </tbody>
        </table>
    </Wrapper>

    </>
}



Historico.auth = true