import React, { useState, useEffect, useCallback} from 'react';
import Head from "next/head";
import BotaoVoltar from "@components/BotaoVoltar";
import { Section, Column, SmallInputs, InputStyle, CheckboxContainer } from './style';
import { Checkbox } from '@material-ui/core';
import {BottomConfirmBtn} from "@styles/buttons";
import { useSession } from "next-auth/client";
import * as companyRequest from "@services/empresas";
import { useToasts } from "@geist-ui/react";
import router from 'next/router';

export default function CadastrarCnpj() {
    const [name, setName] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [uf, setUf] = useState("")
    const [nsu, setNsu] = useState("")
    const [ session ] = useSession()
    const [, setToast] = useToasts();
    const company_id = Number(session.usuario.empresa.id)

    const estados = [ "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
        "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI" , "RJ", "RN",
        "RS", "RO", "RR", "SC", "SP", "SE", "TO"]



    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if(!name || !cnpj || !uf ) {
                setToast({
                    text: "Por favor preencha todos os campos",
                    type: "warning"
                })
                return 
            } 
            await companyRequest.createCnpj(company_id, {
                cnpj: cnpj,
                nome: name,
                uf: uf,
                status_sefaz: 100
            })
            setToast({
                text: "Cadastro realizado com sucesso",
                type: "success"
            })
        } catch (error) {
            setToast({
                text: error.response.data.mensagem,
                type: "warning"
            })
        }
        router.push("/cnpjs-empresa")
    }


    return <>
            <Head>
                <title>Orion | Cadastrar CNPJs</title>
            </Head>
            <BotaoVoltar />
            <h2>Cadastro CNPJ</h2>
            <Section onSubmit={handleSubmit}>
                <section>
                    <div>
                        <InputStyle>
                            <div><span>CNPJ</span></div>
                            <input type="text" onChange={(e) => setCnpj(e.target.value)} />
                        </InputStyle>
                    </div>
                    <div>
                        <InputStyle>
                            <div><span>Nome</span></div>
                            <input type="text" onChange={(e) => setName(e.target.value)}/>
                        </InputStyle>
                    </div>
                    <div>
                    <SmallInputs>
                        <Column>
                        <div className="uf">
                            <span>UF</span>
                            <select onChange={(e) => setUf(e.target.value)}>
                                <option defaultValue=''></option>
                                {estados.map((item, i ) => 
                                <option value={item} key={i}>{item}</option>
                                )}
                                
                            </select>
                        </div>
                        
                        <CheckboxContainer>
                        <span>
                            <span><Checkbox /></span>
                            NF-e
                        </span>
                        <span>
                            <span><Checkbox /></span>
                            CT-e
                        </span>
                        </CheckboxContainer>
                        </Column>
                    </SmallInputs>
                    </div>
                    
                </section>
                <BottomConfirmBtn>
                    <button type="submit">
                        adicionar
                    </button>
                </BottomConfirmBtn>
            </Section>
           
        </>
    
}

CadastrarCnpj.auth = true