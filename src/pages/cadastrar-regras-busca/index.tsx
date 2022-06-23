import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import { AddBtn } from '@styles/buttons';
import { InputStyles, RowStyle, Form, InputBoxStyle, BoxTitles } from './style';
import * as request from '@services/regras-busca';
import { IUpdateRegrasBusca } from '@services/regras-busca/types';

export default function CadastrarRegrasDeBusca() {
    const [, setToast] = useToasts();
    const router = useRouter();
    const [registro, setRegistro] = useState({} as IUpdateRegrasBusca);


    function inputHandler(evt: any) {
        const value = evt.target.value;
        setRegistro({
        ...registro,
        [evt.target.id]: value,
        });
    }

    async function registerNewAppConfig() {
        try {

            
            await request.CreateRegrasDeBusca({
            ...registro,
            });
            setToast({
            text: 'Cadastro concluído',
            type: 'success',
            });
            router.back();
        } catch (error) {
            console.log(error);
            setToast({
            text: 'Houve um problema. Por favor tente novamente',
            type: 'warning',
        });
        }
    }


    return (
    <>
    <Head>
        <title>Orion | Cadastrar Regra de Busca</title>
    </Head>
    <BotaoVoltar />
    <h2>Cadastrar Regra de Busca</h2>
    <AddBtn>
        <button onClick={() => registerNewAppConfig()}>Confirmar</button>
    </AddBtn>
    <Form>
    <InputBoxStyle>
        <div>
            <InputStyles>
            <label htmlFor="cnpj_emitente">CNPJ Emitente</label>
            <input
                type="text"
                id="cnpj_emitente"
                className="chave"
                placeholder="Por favor, preencha o campo"
                value={registro.cnpj_emitente}
                onChange={inputHandler}
            />
            <label htmlFor="tipo_nota">Tipo Nota</label>
            <input
                type="text"
                id="tipo_nota"
                className="chave"
                placeholder="Por favor, preencha o campo"
                value={registro.tipo_nota}
                onChange={inputHandler}
            />
            <label htmlFor="tipo_informacao">Tipo Informacao</label>
            <input
                type="text"
                id="tipo_informacao"
                className="chave"
                placeholder="Por favor, preencha o campo"
                value={registro.tipo_informacao}
                onChange={inputHandler}
            />
            <label htmlFor="tag_xml">Tag XML</label>
            <input
                type="text"
                id="tag_xml"
                className="chave"
                placeholder="Por favor, preencha o campo"
                value={registro.tag_xml}
                onChange={inputHandler}
            />
            <label htmlFor="dado_inicio">Dado Inicio</label>
            <input
                type="text"
                id="dado_inicio"
                className="chave"
                placeholder="Por favor, preencha o campo"
                value={registro.dado_inicio}
                onChange={inputHandler}
            />
            <label htmlFor="dado_final">Dado Final</label>
            <input
                type="text"
                id="dado_final"
                className="chave"
                placeholder="Por favor, preencha o campo"
                value={registro.dado_final}
                onChange={inputHandler}
            />
            </InputStyles>
        </div>
    </InputBoxStyle>
    </Form>
    </>)


}

CadastrarRegrasDeBusca.auth = true;