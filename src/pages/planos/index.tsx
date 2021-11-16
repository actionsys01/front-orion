import React, { useState, useMemo, useEffect, useCallback} from 'react'; 
import { AccountStyle, AccountGrid, ButtonStyle } from './style';
import Head from "next/head";
import { useRouter } from "next/router";
import { Checkbox } from '@material-ui/core';
import { Plus } from "@geist-ui/react-icons"
import {AddBtn} from "../../styles/buttons";
import Popover from '@components/Popover';
import * as accounts from "@services/planos";
import Pagination from "@material-ui/lab/Pagination";
import { Pages } from "../../styles/pages";
import { Modal } from "../../styles/modal"
import { useToasts} from "@geist-ui/react";

interface AccountsProps {
    id: number;
    aplicacoes: AppProps;
    nome: string;
    descricao: string
    desconto: number;
    usuarios: number;
    valor: number;
    dias: number;
    notas: string;
}

interface AppProps {
    id: number;
    categoria: string
}

interface GatheredProps {
    id: number;
    nome: string;
    desconto: number;
    usuarios: number;
    valor: number;
    dias: number;
    option: any;
    descricao: string;
    notas: string
}

export default function Planos() {
    const router = useRouter();
    const [accountData, setAccountData] = useState<AccountsProps[]>([]);
    const [page, setPage] = useState(1);
    const [quantityPage, setQuantityPage] = useState(1);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [accountId, setAccountId] = useState<number>(0);
    const [, setToast] = useToasts();

    const handleChange = (event : React.ChangeEvent<unknown>, value : number) => {setPage(value)}

    const getAccountsData = useCallback(async () => {
        const response = await accounts.getAccountsByPage(page);
        const data = response.data
        setQuantityPage(Math.ceil(data.total / 8));

        return data.planos
        },[page, accountData])
    
    useEffect(() => {
        getAccountsData().then(response => setAccountData(response))

    },[page])

    function exclude(id: number) {
        setAccountId(id)
        setVisibleModal(true)
        }

        async function deleteAccount() {
            await accounts.deletar(accountId);
            const updatedAccount = accountData?.filter((item) => item.id !== accountId);
            setAccountData(updatedAccount)
            try {
                setToast({
                    text: "O plano foi deletado com sucesso",
                    type: "success"
                })
            } catch (error) {
                setToast({
                    text: "Houve um problema, por favor tente novamente",
                    type: "warning"
                })
            }
            setVisibleModal(false);
            setAccountId(0)
        }
        


   const edit = useCallback( ({nome, desconto, usuarios, notas, valor, dias, descricao, id }: AccountsProps, apps: any) => {
        const appIds =  apps.map((item: any) => item.id);
        router.push({
            pathname: "/atualizar-plano",
            query: {
                nome,
                desconto,
                usuarios,
                notas,
                valor,
                dias,
                id,
                descricao,
                appIds, 
            },
        })
    }, [])


    const gatheredData = useMemo(() => {
        const allData: any = [];
        if(accountData) {
            accountData.forEach((item) => {
                allData.push({
                    ...item,
                    option: <Popover content={[
                        {optionName: "Editar", 
                        onClick: () => {const apps = item.aplicacoes;
                        edit(item, apps)}},
                        {optionName: "Deletar", 
                        onClick: () => exclude(item.id)}
                    ]}/>,
                    descricao: `Detalhes do ${item.nome}`
                })
            })
        }
        return allData
      }, [accountData])


    return <>
     <Head>
        <title>Orion | Planos</title>
      </Head>
    <AccountStyle>
        <h2>Cadastro de Planos</h2>
    </AccountStyle>
    <AddBtn>
    <button
    type='button'
    onClick={() => router.push({pathname: "/cadastrar-plano"})}
    >   
        <span><Plus /></span>
        Adicionar
    </button>
    </AddBtn>
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
                {gatheredData.map((item: GatheredProps, i: number) => (
                    <tr key={i}>
                        <td>{item.option}</td>
                        <td>{item.nome}</td>
                        <td>{item.descricao}</td>
                        <td>{item.dias}</td>
                        <td>15Gb</td>
                        <td>{item.notas}</td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    </AccountGrid>

    <Pages>               
        <Pagination style={{margin : "0 auto"}} onChange={handleChange} count={quantityPage}  shape='rounded' />
    </Pages> 

    {visibleModal && 
            <Modal>
                <div style={{textAlign:"center"}}>
                    <h4 >Deseja realmente excluir o plano selecionado?</h4>
                    <div>
                        <button onClick={() => setVisibleModal(false)}>CANCELAR</button>
                        <button onClick={deleteAccount}>CONFIRMAR</button>
                    </div>
                </div>            
            </Modal>  }    
    </>
}

Planos.auth = true