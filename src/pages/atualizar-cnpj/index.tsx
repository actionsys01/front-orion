import React, { useState, ChangeEvent, useCallback} from 'react';
import Head from "next/head";
import BotaoVoltar from "@components/BotaoVoltar";
import { Section, Column, SmallInputs, InputStyle, CheckboxContainer } from '../cadastrar-cnpj/style';
import { Checkbox } from '@material-ui/core';
import {BottomConfirmBtn} from "@styles/buttons";
import { useSession } from "next-auth/client";
import * as companyRequest from "@services/empresas";
import { useToasts } from "@geist-ui/react";
import router from 'next/router';
import MaskedInput from '@components/Masked-Input';

export default function AtualizarCnpj() {
    const [name, setName] = useState(router.query.nome.toString());
    const [cnpj, setCnpj] = useState(router.query.cnpj.toString());
    const [uf, setUf] = useState(router.query.uf.toString().toUpperCase());
    const [ session ] = useSession();
    const [, setToast] = useToasts();
    const id = Number(router.query.id);
    // console.log("curry",router.query);

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
            await companyRequest.updateCnpj(id, {
                cnpj: cnpj,
                nome: name,
                nsu: "padrão",
                uf: uf,
                status_sefaz: 100
            })
            setToast({
                text: "Cadastro realizado com sucesso",
                type: "success"
            })
        } catch (error) {
            console.log(error)
            setToast({
                text: "Houve um problema, por favor tente novamente",
                type: "warning"
            })
        }
        router.push("/cnpjs-empresa")
    }


    return <>
               <Head>
                <title>Orion | Atualizar CNPJs</title>
            </Head>
            <BotaoVoltar />
            <h2>Atualizar CNPJ</h2>
            <Section onSubmit={handleSubmit}>
                <section>
                    <div>
                        <InputStyle>
                            <label htmlFor="cnpj">CNPJ</label>
                            <MaskedInput 
                                value={cnpj} 
                                onChange={(event) => setCnpj(event.target.value)}
                            />
                            <label htmlFor="nome">Nome</label>
                            <input type="text" id='nome' value={name} onChange={(e) => setName(e.target.value)}/>
                        </InputStyle>
                    </div>
                    <div>
                    <SmallInputs>
                        <Column>
                        <div className="uf">
                            <span>UF</span>
                            <select onChange={(e) => setUf(e.target.value)}>
                                <option value={uf} selected>{uf}</option>
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

AtualizarCnpj.auth = true