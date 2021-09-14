import React from "react";
import getNfePagesByCompanyId from '@services/nfe';
import { Dot, Link, Popover, Table, Text, Tooltip } from "@geist-ui/react";
import INfeDto from '@services/nfe/dtos/INfeDTO';
import { useEffect } from "react";
/* import { Container } from './style' */
import { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Grid } from "./style";


interface Props {
  company_id: number | undefined;
  token: string | undefined
}

export default function NfePagination({ company_id, token }: Props) {
  const [data, setData] = useState<INfeDto[]>([])
  const [page, setPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1)
  console.log(data);
  

  const handleChange = (event : React.ChangeEvent<unknown>, value : number) => {
    setPage(value)
  }

  const getCtesAndTotalPages = async () => {
    const responseNfes = await getNfePagesByCompanyId(company_id, token, page)

    const { data } = responseNfes;

    setData(data.nfes)

    setQuantityPage(Math.ceil(data.total / 5));
     
  }
      

  useEffect(() => {

    getCtesAndTotalPages();


  }, [page])


  return (
    <>
      <Grid>
      <Table data={data}>
            <Table.Column prop="opcoes" />
            <Table.Column prop="dt_hr_emi" label="Emissão" />
            <Table.Column prop="nota" label="Número" />
            <Table.Column prop="serie" label="Série" />
            <Table.Column prop="emit_cnpj" label="CNPJ emitente" />
            <Table.Column prop="emit_nome" label="Fornecedor" />
            <Table.Column prop="sefaz" label="Status sefaz" />
            <Table.Column prop="portaria_status" label="Status portaria" />
            <Table.Column prop="diverg_status" label="Status divergência" />
            <Table.Column
              prop="fisico_status"
              label="Status físico"
              width={0.2}
            />
            <Table.Column prop="integracao_status" label="Status integração" />
            <Table.Column prop="chave_nota" label="Chave de acesso" />
            <Table.Column prop="dest_cnpj" label="CNPJ destinatário" />
            <Table.Column prop="dest_nome" label="Destinatário" />
            <Table.Column prop="criado_em" label="data/hora recebimento" />
          </Table>

       {/*  <table>
          <thead>
            <tr>
            <th></th>
              <th>Emissão</th>
              <th>Número</th>
              <th>Série</th>
              <th>CNPJ Emitente</th>
              <th>Fornecedor</th>
              <th>Status Sefaz</th>
              <th>Status Portaria</th>
              <th>Chave de Acesso</th>
              <th>CNPJ Destinatário</th>
              <th>Destinatário</th>
              <th>Data/ Hora Recebimento</th>
            </tr>
          </thead>

          <tbody>

           {data.map(nota => (
             <tr key={nota.chave_nota}>
                <td></td>
                <td>{nota.dt_hr_emi}</td>
                <td>{nota.nota}</td>
                <td>{nota.serie}</td>
                <td>{nota.emit_cnpj}</td>
                <td>{nota.emit_nome}</td>
                <td>{nota.sefaz_status}</td>
                <td>{nota.portaria_status}</td>
                <td>{nota.chave_nota}</td>
                <td>{nota.dest_cnpj}</td>
                <td>{nota.dest_nome}</td>
                <td>{nota.criado_em}</td>
              </tr>
           ))}

        


          </tbody>
        </table> */}
          
          
      </Grid>
          <Pagination onChange={handleChange} count={quantityPage}  color="primary" />
          </>
  )
}
