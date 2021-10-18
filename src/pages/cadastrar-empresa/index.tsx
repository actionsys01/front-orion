import React, {useState} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import BotaoVoltar from "@components/BotaoVoltar";
import {CompanyRegister} from "./style";
import { BottomConfirmBtn } from 'src/styles/buttons'; 
import * as companies from "@services/empresas"
import { useCallback } from 'hoist-non-react-statics/node_modules/@types/react';
import { useToasts, Modal, useModal } from "@geist-ui/react";

export default function CadastrarEmpresa() {
    const router = useRouter();
    const [company, setCompany] = useState<string>("");
    const [cnpj, setCnpj] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [account, setAccount] = useState<number[]>([]);
    const [, setToast] = useToasts()
    
    // const gatherData = useCallback(() => {

    // }, [])

    async function createCompany() {
        try {
            
            setToast({
                text: "Empresa cadastrada com sucesso.",
                type: "success"
            })
        } catch (error) {
            setToast({
                text: "Houve um problema, por favor tente novamente.",
                type: "warning"
            })
        }
    }
    
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
                            <input type="text" onChange={(e) => setCompany(e.target.value)}/>
                        </div>
                        <div className="label"><h6>CNPJ</h6></div>
                        <div className="input-style">
                            <input type="text" onChange={(e) => setCnpj(e.target.value)}/>
                        </div>
                        <div className="label"><h6>E-mail</h6></div>
                        <div className="input-style">
                            <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="label"><h6>Telefone</h6></div>
                        <div className="input-style">
                            <input type="text" onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                        <div className="label"><h6>Plano</h6></div>
                        <select name="" id=""></select>
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
