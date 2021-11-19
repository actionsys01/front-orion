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

export default function AtualizarCnpj() {
    const [name, setName] = useState(router.query.nome.toString())
    const [cnpj, setCnpj] = useState(router.query.cnpj.toString())
    const [uf, setUf] = useState(router.query.uf.toString().toUpperCase())
    const [ session ] = useSession()
    const [, setToast] = useToasts();
    const id = Number(router.query.id)
    console.log("curry",router.query)

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
                            <div><span>CNPJ</span></div>
                            <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                        </InputStyle>
                    </div>
                    <div>
                        <InputStyle>
                            <div><span>Nome</span></div>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        </InputStyle>
                    </div>
                    <div>
                    <SmallInputs>
                        <Column>
                        <div className="uf">
                            <span>UF</span>
                            <input type="text" value={uf} onChange={(e) => setUf(e.target.value)}/>
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
                            {/* <span>NSU</span>
                            <input type="text" onChange={(e) => setNsu(e.target.value)}/> */}
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