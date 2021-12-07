import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { useSession } from "next-auth/client";
import { useToasts, Dot, Tooltip } from "@geist-ui/react";
import { Filter } from "@geist-ui/react-icons";
import Head from "next/head";
import { useRouter } from "next/router";
import { NfseTable } from "./style";
import  {format} from "date-fns";
import {TableGrid} from "@styles/tableStyle"
import {  Pages } from "@styles/pages";
import Pagination from "@material-ui/lab/Pagination";
import { nfseNotas } from '@utils/mock-data/nfse-pages'
import { nfseXmlData } from "@utils/mock-data/nfse-xml"
import { NfseProps } from '@services/nfse/types/NfseProps';
import NfsePopover from './popover';
import { FilterBtn } from "@styles/buttons"

interface GatheredProps {
   id: number,
   chave_nota: string,
   empresa_id: number,
   nota: string,
   emit_cnpj: string,
   emit_nome: string,
   dest_cnpj: string,
   dest_nome: string,
   serie: number,
   prefeitura_status: number,
   dt_hr_emi: string,
   dt_hr_receb: string,
   option: any,
   status_nota: any,
   emissionDate: string,
   receiveDate: string
}

export default function Nfse() {
   const [ nfseData, setNfseData] = useState<NfseProps[]>([])
   // const  { nfes  } = useFiltro();
   const [page, setPage] = useState(1);
   const [quantityPage, setQuantityPage] = useState(1)
   const [session] = useSession();
   const router = useRouter()

   console.log(`nfseXmlData`, nfseXmlData)


   const handleChange = (event : React.ChangeEvent<unknown>, value : number) => {
      setPage(value)
   }

   const getNfsesAndTotalPages = useCallback(async () => {

      
      const total = nfseNotas.length

      setNfseData(nfseNotas)
   
      setQuantityPage(Math.ceil(total / 8));
   }, [nfseData, page])
      

   useEffect(() => {

      getNfsesAndTotalPages();

   }, [page, nfseData])

   useEffect(() => {
      if(page > quantityPage){
      setPage(1)
      }
   }, [nfseData, quantityPage, page])


   const gatheredData = useMemo(() => {
      const allData: GatheredProps[] = []
      if(nfseData){                            
         nfseData.forEach((item, i) => {
            allData.push({
               ...item,
               status_nota: (
                  <Tooltip text={item.prefeitura_status === 100 ? "Autorizado" : "Cancelada"}>
                     <Dot type={item.prefeitura_status === 100 ? "success" : "warning"} />
                  </Tooltip>
               ),
               emissionDate: format(new Date(item.dt_hr_emi), "dd/MM/yyyy HH:mm:ss"),
               receiveDate: format(new Date(item.dt_hr_receb), "dd/MM/yyyy HH:mm:ss"),
               option: <NfsePopover num={i}  content={[
               {
                     optionName: 'Visualizar',
                     onClick: () => {
                        const nfse_id = item.chave_nota;
                        const status = item.prefeitura_status;
                        router.push({
                           pathname: "/nfse-detalhes",
                           query: {nfse_id, status}
                        })
                     }
               },
               {
                     optionName: 'Histórico de Nota',
                     onClick: () => {
                        const chave_nota = item.chave_nota;
                        router.push({
                           pathname: "/historico-notas",
                           query: chave_nota
                        })
                     }
               },
                  {
                     optionName: 'Download',
                     onClick: () => ""
               },
               {
                     optionName: 'Imprimir Nota',
                     onClick: () => ""
               }
            ]}/>
         })
      })
      }
      // console.log(`allData`, allData)
      return allData
   }, [nfseData])


   return <>
      <Head>
            <title>Orion | NFS-e</title>
      </Head>
   <h2>NFS-e</h2>
         <FilterBtn>
            <button>
               <span><Filter/></span>
                  Filtrar
            </button>
         </FilterBtn>
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
                     {gatheredData.map((item , i) => (
                        <tr key={i}>
                        <td >{item.option}</td>
                        <td>{item.emissionDate}</td>
                        <td>{item.nota}</td>
                        <td>{item.serie}</td>
                        <td>{item.emit_cnpj}</td>
                        <td>{item.emit_nome}</td>
                        <td>{item.status_nota}</td>
                        <td>{item.chave_nota}</td>
                        <td>{item.dest_cnpj}</td>
                        <td>{item.dest_nome}</td>
                        <td>{item.receiveDate}</td>
                     </tr>
                     ))}
                  </tbody>
               </table>
         </TableGrid>
   

   <Pages>
      <Pagination onChange={handleChange} count={quantityPage}  shape='rounded' />
      </Pages>
   </>

}




Nfse.auth = true