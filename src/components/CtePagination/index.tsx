import React, {useMemo, useCallback} from "react";
import getCteByCompanyId from '@services/cte';
import INfeDto from '@services/nfe/dtos/INfeDTO';
import { Dot, Link, Popover, Table, Text, Tooltip } from "@geist-ui/react";
import { MoreHorizontal } from "@geist-ui/react-icons";
import { useEffect } from "react";
import { Grid, Pages } from './style'
import { useState } from "react";
import { useFiltro } from "@contexts/filtro";
import Pagination from "@material-ui/lab/Pagination";
import { useRouter } from "next/router";
import  {format} from "date-fns"

interface Props {
  company_id: number | undefined;
  token: string | undefined;
  sefaz: {
    cor: "secondary" | "success" | "error" | "warning" | "default";
    message: string
  };
  portaria: {
    cor: "secondary" | "success" | "error" | "warning" | "default";
    message: string
  }
}

export default function CtePagination({ company_id, token, sefaz, portaria }: Props) {
  const [cte, setCtes] = useState<INfeDto[]>([])
  const router = useRouter()
  const [page, setPage] = useState(1);
  const { ctes } = useFiltro()
  const [quantityPage, setQuantityPage] = useState(0)


  const handleChange = (event : React.ChangeEvent<unknown>, value : number) => {
    setPage(value)
  }

  const getNfesAndTotalPages = useCallback(async () => {
    const responseNfes = await getCteByCompanyId(company_id, token, page, ctes )

    const { data } = responseNfes;

    setCtes(data.ctes)

    setQuantityPage(Math.ceil(data.total / 5));
     
  }, [ctes, page])
      

  useEffect(() => {

    getNfesAndTotalPages();


  }, [page, ctes])

  const dataFormatted = useMemo(() => {
    const newData: any = [];
    if (cte) {
      cte.forEach((item) => {
        newData.push({
          ...item,
          sefaz_status: (
            <Tooltip text={item.sefaz_status === 100 ? "Autorizada" : item.sefaz_status === 101 ? "Cancelada" : "Indisponível"} type={sefaz?.cor} >
              <Dot type={item.sefaz_status === 100 ? "success" : item.sefaz_status === 101 ? "warning" : "default"} />
            </Tooltip>
          ),
          portaria_status: (
            <Tooltip text={item.portaria_status === 0 ? "Na Portaria" : item.portaria_status === 1 ? " Autorizada" : "Indisponível"} type={portaria?.cor}>
              <Dot type={item.portaria_status === 0 ? "warning" : item.portaria_status === 1 ? "success" : "default"} />
            </Tooltip>
          ),
          emissionDate: format(new Date(item.dt_hr_emi), "dd-MM-yyyy HH:mm:ss"),
          receiveDate: format(new Date(item.criado_em), "dd-MM-yyyy HH:mm:ss"),
          option: (actions: any, item: any) => (
            <Popover
              placement="right"
              content={
                <>
                  <Popover.Item>
                    <Text
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const chave_nota = item.rowValue.chave_nota;
                        const status_sefaz = Number(item.rowValue.sefaz_status);
                        const desc_status_sefaz =
                          item.rowValue.sefaz_status_desc;
                        console.log(item);
                        router.push({
                          pathname: "/cte-detalhes",
                          query: {
                            chave_nota,
                            status_sefaz,
                            desc_status_sefaz,
                          },
                        });
                      }}
                    >
                      Visualizar
                    </Text>
                  </Popover.Item>
                  <Popover.Item>
                    <Popover
                      placement="right"
                      content={
                        <>
                          <Popover.Item>
                            <Link href="#">Ciência</Link>
                          </Popover.Item>
                          <Popover.Item>
                            <Link href="#">Confirmação</Link>
                          </Popover.Item>
                          <Popover.Item>
                            <Link href="#">Operação não realizada</Link>
                          </Popover.Item>
                          <Popover.Item>
                            <Link href="#">Desconhecimento</Link>
                          </Popover.Item>
                        </>
                      }
                    >
                      Registrar evento
                    </Popover>
                  </Popover.Item>
                  <Popover.Item>
                    <Text 
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      const chave_nota = item?.rowValue.chave_nota;
                      router.push({
                        pathname: `/historico-notas`,
                        query: {chave_nota}
                      })
                    }}
                    >Histórico de nota</Text>
                  </Popover.Item>
                </>
              }
            >
              <span style={{ cursor: "pointer" }}>
                <MoreHorizontal />
              </span>
            </Popover>
          ),
        });
      });
    }

    return newData;
  }, [cte]);




  return (
    <>
      <Grid>

      <Table data={dataFormatted}>
            <Table.Column prop="option" />
            <Table.Column prop="emissionDate" label="Data/hora Emissão" />
            <Table.Column prop="nota" label="Número" />
            <Table.Column prop="serie" label="Série" />
            <Table.Column prop="emit_cnpj" label="CNPJ Fornecedor" />
            <Table.Column prop="emit_nome" label="Nome Fornecedor" />
            <Table.Column prop="sefaz_status" label="Status Sefaz" />
            <Table.Column prop="portaria_status" label="Status Portaria" />
            <Table.Column prop="chave_nota" label="Chave de Acesso" />
            <Table.Column prop="dest_cnpj" label="CNPJ Destinatário" />
            <Table.Column prop="dest_nome" label="Destinatário" />
            <Table.Column prop="receiveDate" label="Data/hora Recebimento" />
          </Table>
          
      </Grid>
      <Pages>
          <Pagination onChange={handleChange} count={quantityPage}  shape='rounded' />
          </Pages>
      </>
  )
}
