import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import { AddBtn } from '@styles/buttons';
import { InputStyles, RowStyle, Form, InputBoxStyle, BoxTitles } from './style';
import * as request from '@services/referencia-cruzada';
import { IUpdateReferenciaCruzada } from '@services/referencia-cruzada/types';

export default function AtualizarReferenciaCruzada() {
    const [, setToast] = useToasts();
    const [session] = useSession();
    const router = useRouter();
    const [mainData, setMainData] = useState({
        id_empresa: Number(session?.usuario.empresa.id),
        cod_categoria: router?.query?.cod,
        aplicacao: router?.query?.app,
        desc_aplicacao: router?.query?.desc,
        id: router?.query?.id,
    });
    const [registro, setRegistro] = useState({} as IUpdateReferenciaCruzada);


    async function getConfigData() {
        try {
            const response = await request.GetConfigById(Number(mainData.id), []);
            const data = response.data;
            setRegistro(data);
            console.log('data atualizar', data);
        } catch (error) {
            console.log(error);
        }
    }

    function inputHandler(evt: any) {
        const value = evt.target.value;
        setRegistro({
        ...registro,
        [evt.target.id]: value,
        });
    }

    async function registerNewAppConfig() {
        try {
            await request.UpdateReferenciaCruzada({
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

    useEffect(() => {
        getConfigData();
    }, []);

    useEffect(() => {
        console.log('register', registro);
    }, [registro]);

    return (
    <>
    <Head>
        <title>Orion | Atualização de Referencia Cruzada</title>
    </Head>
    <BotaoVoltar />
    <h2>Atualização de Referencia Cruzada</h2>
    <AddBtn>
        <button onClick={() => registerNewAppConfig()}>Confirmar</button>
    </AddBtn>
    <Form>
    <InputBoxStyle>
        <div>
            <InputStyles>
            <label htmlFor="item_fornecedor">Item fornecedor</label>
            <input
                type="text"
                id="item_fornecedor"
                className="chave"
                placeholder="Apenas Números"
                value={registro.item_fornecedor}
                onChange={inputHandler}
            />
            <label htmlFor="um_fornecedor">UM fornecedor</label>
            <input
                type="text"
                id="um_fornecedor"
                className="chave"
                placeholder="Apenas Números"
                value={registro.um_fornecedor}
                onChange={inputHandler}
            />
            <label htmlFor="item_cliente">Item Cliente</label>
            <input
                type="text"
                id="item_cliente"
                className="chave"
                placeholder="Apenas Números"
                value={registro.item_cliente}
                onChange={inputHandler}
            />
            <label htmlFor="um_cliente">UM cliente</label>
            <input
                type="text"
                id="um_cliente"
                className="chave"
                placeholder="Apenas Números"
                value={registro.um_cliente}
                onChange={inputHandler}
            />
            <label htmlFor="fator_conversao">Fator Conversão</label>
            <input
                type="number"
                id="fator_conversao"
                className="chave"
                placeholder="Apenas Números"
                value={registro.fator_conversao}
                onChange={inputHandler}
            />
            </InputStyles>
        </div>
    </InputBoxStyle>
    </Form>
    </>)


}

AtualizarReferenciaCruzada.auth = true;