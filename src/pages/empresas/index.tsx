import React, {useEffect, useState, useMemo, useCallback} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import {Plus } from "@geist-ui/react-icons";
import { CompaniesGrid } from './style';
import { Modal } from "../../styles/modal"
import {AddBtn} from "../../styles/buttons";
import * as companies from "@services/empresas"
import Popover from '@components/Popover';
import { useToasts } from "@geist-ui/react";
import Pagination from "@material-ui/lab/Pagination";
import { Pages } from "../../styles/pages"

interface CompanyProps {
    id: number;
    razao_social: string;
    nome_fantasia: string;
    email: string;
    cnpj: string;
    plano: PlanoProps
}

interface PlanoProps {
    id: number;
    nome: string;
    dias: number;
    notas: number;
    desconto: number;
}

interface GatheredProps {
    id: number;
    razao_social: string;
    nome_fantasia: string;
    email: string;
    cnpj: string;
    plano: PlanoProps;
    option: any;
}

export default function Empresas() {
    const router = useRouter();
    const [company, setCompany] = useState<CompanyProps[]>([]);
    const [, setToast] = useToasts();
    const [companyId, setCompanyId] = useState<number>(0);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [quantityPage, setQuantityPage] = useState(1);

    
    const handleChange = (event : React.ChangeEvent<unknown>, value : number) => {setPage(value)}

const getCompanyData = useCallback(async () => {
    const response = await companies.getAllCompaniesByPage(page);
    const data = response.data
    setQuantityPage(Math.ceil(data.total / 8))
        return data.empresas;
}, [page])

    useEffect(() => {
        getCompanyData().then(response => setCompany(response))
    
    }, [page])

    function exclude (id: number) {
        setCompanyId(id)
        setVisibleModal(true)
    }

    function edit ({nome_fantasia, razao_social, email, cnpj, id}: 
        CompanyProps, accountData:  PlanoProps) {
        const accountName = accountData.nome
        const accouuntId = accountData.id
        router.push({
            pathname: "/atualizar-empresa",
            query: { nome_fantasia, 
                razao_social, 
                email, cnpj, 
                id, 
                accountName, 
                accouuntId
            },})
    }

    async function deleteCompany() {
        try {
            await companies.deletar(companyId);
            const usuariosAtualizados = company?.filter((item) => item.id !== companyId);
            setCompany(usuariosAtualizados)
        setToast({
            text: "Empresa deletada com sucesso.",
            type: "success"
        })
        } catch (error) {
            setToast({
                text: "Houve um problema, por favor tente novamente.",
                type: "warning"
            })
        }
        setVisibleModal(false);
        setCompanyId(0)
    }

    const gatheredData = useMemo(() => {
        const allData: any = [];
        if(company) {
            company.forEach((item) => {
                allData.push({
                    ...item,
                    option:  <Popover content={[{optionName: "Editar", 
                    onClick: () => {const accountData = item.plano; 
                    edit(item, accountData)} }, {optionName: "Deletar", 
                    onClick: () => exclude(item.id)}]}/>,
                    email: item.email.toLowerCase()
                })
            })
        }
        return allData;
    }, [company])
    

    return <>
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
                    </tr>
                </thead>
                <tbody>
                    {gatheredData?.map((item: GatheredProps, i: any) => (
                            <tr key={i}>
                        <td>{item.option}</td>
                        <td>{item.nome_fantasia}</td>
                        <td>{item.cnpj}</td>
                        <td>{item.plano.nome}</td>
                        <td>{item.email}</td>
                    </tr>
                    ))}

                </tbody>
            </table>
        </CompaniesGrid>
        <Pages>               
        <Pagination style={{margin : "0 auto"}} onChange={handleChange} count={quantityPage}  shape='rounded' />
        </Pages>                 
        {visibleModal && 
            <Modal>
                <div>
                    <h4>Deseja realmente excluir essa empresa?</h4>
                    <div>
                        <button onClick={() => setVisibleModal(false)}>CANCELAR</button>
                        <button onClick={deleteCompany}>CONFIRMAR</button>
                    </div>
                </div>            
            </Modal>  }             
        </>
    
}

Empresas.auth = true
