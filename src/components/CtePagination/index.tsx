import React from "react";
import getCteByCompanyId from '@services/cte';
import INfeDto from '@services/nfe/dtos/INfeDTO';
import { useEffect } from "react";
import { Container } from './style'
import { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";


interface Props {
  company_id: number | undefined;
  token: string | undefined
}

export default function CtePagination({ company_id, token }: Props) {
  const [ctes, setCtes] = useState<INfeDto[]>([])
  const [page, setPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(0)


  console.log(page)

  const handleChange = (event : React.ChangeEvent<unknown>, value : number) => {
    setPage(value)
  }

  const getNfesAndTotalPages = async () => {
    const responseNfes = await getCteByCompanyId(company_id, token, page)

    const { data } = responseNfes;

    setCtes(data.ctes)

    console.log(data.ctes)

    setQuantityPage(Math.ceil(data.total / 5));
     
  }
      

  useEffect(() => {

    getNfesAndTotalPages();


  }, [page])


  return (
      <Container>

        <table>
          <thead>
            <tr>
              <th>Emissão</th>
              <th>Número</th>
              <th>Série</th>
              <th>Cnpj Emitente</th>
            </tr>
          </thead>

          <tbody>

           {ctes.map(cte => (
                <tr key={cte.chave_nota}>
                <td>{cte.nota}</td>
                <td>{cte.serie}</td>
                <td>{cte.serie}</td>
                <td>{cte.emit_cnpj}</td>
              </tr>
           ))}

        


          </tbody>
        </table>
          
          <Pagination onChange={handleChange} count={quantityPage}  color="primary" />
          
      </Container>
  )
}
