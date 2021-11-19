import React, { useState, ChangeEvent,useMemo, useCallback, useEffect} from 'react';
import Head from "next/head";
import {Plus } from "@geist-ui/react-icons";
import router, { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { MainGrid } from './style';
import Popover from '@components/Popover';
import { AddBtn } from '@styles/buttons';
import * as companyRequest from "@services/empresas";
import Pagination from "@material-ui/lab/Pagination";
import  { Pages } from "@styles/pages";
import { useToasts } from "@geist-ui/react";
import ModalCnpjs from  "./modal"
import { BsChevronCompactLeft } from 'react-icons/bs';

interface CnpjProps {
    id: number;
    cnpj: string;
    nome: string;
    uf: string;
    nsu: string;
    status_sefaz: number;
}

interface CnpjDataProps {
    id: number;
    cnpj: string;
    nome: string;
    uf: string;
    nsu: string;
    status_sefaz: number;
    option: any
}

export default function CnpjsEmpresa() {
    const [ page, setPage] = useState(1);
    const [ quantityPage, setQuantityPage] = useState(1)
    const [ session ] = useSession()
    const [ cnpj, setCnpj] = useState<CnpjProps[]>([])
    const [, setToast] = useToasts();
    const [ selectId, setSelectId] = useState(0)
    // modal
    const[ visibleModal, setVisibleModal] = useState(false)

    const handleChange = (event: React.ChangeEvent<unknown>, value : number) => {
        setPage(value)
    }

    const modalHandler = useCallback(() => {
        setVisibleModal(!visibleModal)
    }, [visibleModal])


    const getCompanyCnpj = useCallback(async () => {
        try {
            const response = await companyRequest.getCnpj(Number(session.usuario.empresa.id),page)
        const data = response.data
        setQuantityPage(Math.ceil(data.total / 8));
        setCnpj(data.cnpjs)
        return data.cnpjs
        } catch (error) {
            setToast({
                text: "Houve um problema, por favor tente novamente",
                type: "warning"
            })
        }
        
        }, [page, cnpj])


    useEffect(() => {
        getCompanyCnpj()
    }, [page])    
    

    function handleEdit(item) { 
        router.push({
            pathname: "/atualizar-cnpj",
            query: item
        })
    }

    const handleDelete = useCallback((id) => {
        setSelectId(id)
        setVisibleModal(true)
        },[],)

    async function deleteCnpj ()  {
       console.log("id", selectId)
        try {
            await companyRequest.deleteCnpj(selectId)
            getCompanyCnpj()
            setToast({
                text: "CNPJ excluído com sucesso",
                type: "success"
            })
        } catch (error) {
            console.log(error)
            setToast({
                text: "Houve um problema, por favor tente novamente",
                type: "warning"
            })
        }   
        setVisibleModal(false)  
    }

    const gatheredData = useMemo(() => {
        const allData: any = [];
        if(cnpj) {
            cnpj.forEach((item) => {
                allData.push({
                    ...item,
                    option: <Popover content={[
                        {
                            optionName: "Editar",
                            onClick: () => handleEdit(item)
                        },
                        {
                            optionName: "Deletar",
                            onClick: ()  => handleDelete(item.id)
                        }
                    ]} />
                })
            })
        }
        return allData
    }, [cnpj])
    console.log(cnpj)

    return <>
            <Head>
                <title>Orion | CNPJs da Empresa</title>
            </Head>
            <h2>CNPJs da Empresa</h2>
            <AddBtn>
                <button
                onClick={() => router.push("/cadastrar-cnpj")} >
                    <span><Plus /></span>
                    Adicionar
                </button>
            </AddBtn>
            <MainGrid>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>CNPJ</th>
                            <th>Nome</th>
                            <th>Código UF</th>
                            <th>Status Sefaz</th>
                            {/* <th>Motivo</th>
                            <th>Data Resposta</th>
                            <th>Hora Resposta</th>
                            <th>Indicador de Continuação</th>
                            <th>Minutos</th>
                            <th>Tipo Ambiente</th>
                            <th>Tipo Nota</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {gatheredData.map((item: CnpjDataProps, i: any) => (
                             <tr key={i}>
                            <td>{item.option}</td>
                            <td>{item.cnpj}</td>
                            <td>{item.nome}</td>
                            <td>{item.uf}</td>
                            <td>{item.status_sefaz}</td>
                            {/* <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td> */}
                        </tr>
                        ))}
                       
                    </tbody>
                </table>
            </MainGrid>
            <Pages>
                <Pagination onChange={handleChange} count={quantityPage}  shape='rounded' />
            </Pages>
            {visibleModal && 
            <ModalCnpjs modalHandler={modalHandler} deleteCnpj={deleteCnpj} />}  
        </>
    
}

CnpjsEmpresa.auth = true

