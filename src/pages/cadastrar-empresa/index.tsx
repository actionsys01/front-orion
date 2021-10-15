import React from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import BotaoVoltar from "@components/BotaoVoltar";
import {CompanyRegister} from "./style";
import { BottomConfirmBtn } from 'src/styles/buttons';
import { Select } from 'src/styles/select'; 

export default function CadastrarEmpresa() {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Orion | Cadastrar Empresas</title>
            </Head>
            <BotaoVoltar />
            <h2>Cadastrar Empresa</h2>
            <CompanyRegister>
                <div>
                    <div className="container">
                    <div className="label"><h6>Empresa</h6></div>
                        <div className="input-style">
                            <input type="text" /* onChange={(e) => setName(e.target.value)} *//>
                        </div>
                        <div className="label"><h6>CNPJ</h6></div>
                        <div className="input-style">
                            <input type="text" /* onChange={(e) => setName(e.target.value)} *//>
                        </div>
                        <div className="label"><h6>E-mail</h6></div>
                        <div className="input-style">
                            <input type="text" /* onChange={(e) => setName(e.target.value)} *//>
                        </div>
                        <div className="label"><h6>Telefone</h6></div>
                        <div className="input-style">
                            <input type="text" /* onChange={(e) => setName(e.target.value)} *//>
                        </div>
                    </div>
                </div>
            </CompanyRegister>
            <BottomConfirmBtn>
                <button>
                    Confirmar
                </button>
            </BottomConfirmBtn>
        </>
    )
}

CadastrarEmpresa.auth = true
