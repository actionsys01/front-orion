import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { useSession } from "next-auth/client";
import { useToasts } from "@geist-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useFiltro } from "@contexts/filtro";
import { NfseTable } from "./style"
import {TableGrid} from "@styles/tableStyle"
import getNfePagesByCompanyId from '@services/nfe';
import {  Pages } from "@styles/pages";
import Pagination from "@material-ui/lab/Pagination";

export default function Nfse() {
   const [ nfseData, setNfseData] = useState<[]>([])
   const  { nfes  } = useFiltro();
   const [page, setPage] = useState(1);
   const [quantityPage, setQuantityPage] = useState(1)
   const [session] = useSession();


   const handleChange = (event : React.ChangeEvent<unknown>, value : number) => {
      setPage(value)
   }

   const getNfsesAndTotalPages = useCallback(async () => {

      const responseNfes = await getNfePagesByCompanyId(Number(session?.usuario.empresa.id), session?.token, page, nfes)

      const { data } = responseNfes;

      setNfseData(data.nfes)
   
      setQuantityPage(Math.ceil(data.total / 8));
   }, [nfes, page])
      

   useEffect(() => {

      getNfsesAndTotalPages();

   }, [page, nfes])

   useEffect(() => {
      if(page > quantityPage){
      setPage(1)
      }
   }, [nfes, quantityPage, page])


   return <>
      <Head>
            <title>Orion | Controle de Entrada</title>
         </Head>
   <h2>NFS-e</h2>

   <TableGrid>
         <table>
            <thead>
               <tr>
                  <th></th>
                  <th>Data/Hora Emissão</th>
                  <th>Número</th>
                  <th>Série</th>
                  <th>CNPJ Fornecedor</th>
                  <th>Nome Fornecedor</th>
                  <th>Status Prefeitura</th>
                  <th>Chave de Acesso</th>
                  <th>CNPJ Destinatário</th>
                  <th>Destinatário</th>
                  <th>Data/Hora Recebimento</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
               </tr>
            </tbody>
         </table>
   </TableGrid>
   

   <Pages>
      <Pagination onChange={handleChange} count={quantityPage}  shape='rounded' />
      </Pages>
   </>

}




Nfse.auth = true