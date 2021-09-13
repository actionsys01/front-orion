import React from "react";
import getNfePagesByCompanyId from '@services/nfe';
import INfeDto from '@services/nfe/dtos/INfeDTO';
import { useEffect } from "react";
import { Container } from './style'
import { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import Link from 'next/link'


interface Props {
  company_id: number | undefined;
  token: string | undefined
}

export default function NfePagination({ company_id, token }: Props) {
  const [nfes, setNfes] = useState<INfeDto[]>([])
  const [page, setPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1)


  

  const handleChange = (event : React.ChangeEvent<unknown>, value : number) => {
    setPage(value)
  }

  const getCtesAndTotalPages = async () => {
    const responseNfes = await getNfePagesByCompanyId(company_id, token, page)

    const { data } = responseNfes;


    console.log(data.nfes[0])
    setNfes(data.nfes)

    setQuantityPage(Math.ceil(data.total / 5));
     
  }
      

  useEffect(() => {

    getCtesAndTotalPages();

  }, [page])


  return (
      <Container>

        <table>
          <thead>
            <tr>
              <th>Chave</th>
              <th>Número</th>
              <th>Série</th>
              <th>Cnpj Emitente</th>
            </tr>
          </thead>

          <tbody>

           {nfes.map(nfe => {
             
              console.log(nfe.chave_nota)

             return (
              <tr key={nfe.chave_nota}>
              <td>
                 <Link href={`/nfe-detalhes?chave_nota=${nfe.chave_nota}`}> 
                     <a>{nfe.nota}</a> 
                 </Link>
              </td>
              <td>{nfe.serie}</td>
              <td>{nfe.serie}</td>
              <td>{nfe.emit_cnpj}</td>
            </tr>
             )
           })}

        


          </tbody>
        </table>
          
          <Pagination onChange={handleChange} count={quantityPage}  color="primary" />
          
      </Container>
  )
}
