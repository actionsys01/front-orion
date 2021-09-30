import React, { useMemo , useCallback} from "react";
import getNfePagesByCompanyId from '@services/nfe';
import INfeDto from '@services/nfe/dtos/INfeDTO';
import { Dot, Link, Popover, Table, Text, Tooltip } from "@geist-ui/react";
import { useFiltro } from "@contexts/filtro";
import { useEffect } from "react";
import { MoreHorizontal } from "@geist-ui/react-icons";
import { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Grid, Pages } from "./style";




interface Props  {
  company_id: number | undefined;
  token: string | undefined;
  sefaz: {
    cor: "secondary" | "success" | "error" | "warning" | "default";
    message: string
  }
  portaria: {
    cor: "success" | "warning" | "default";
    message: string
  }
}

export default function NfePagination({ company_id, token, sefaz, portaria }: Props) {
  const [nfe, setNfes] = useState<INfeDto[]>([])
  const [page, setPage] = useState(1);
  const  { nfes  } = useFiltro();
  const [quantityPage, setQuantityPage] = useState(1)
  

  const handleChange = (event : React.ChangeEvent<unknown>, value : number) => {
    setPage(value)
  }

  const getCtesAndTotalPages = useCallback(async () => {

    const responseNfes = await getNfePagesByCompanyId(company_id, token, page, nfes)

    const { data } = responseNfes;


    setNfes(data.nfes)

    setQuantityPage(Math.ceil(data.total / 5));
    }, [nfes, page])
      

  useEffect(() => {

    getCtesAndTotalPages();


  }, [page, nfes])




  const dataFormatted = useMemo(() => {
    const newData: any = [];
    if (nfe) {
      nfe.forEach((item) => {
        newData.push({
          ...item,
          sefaz_status: (
            <Tooltip text={item?.sefaz_status === 999 ? "Indisponível" : item?.sefaz_status === 100 ? "Autorizada" : item?.sefaz_status === 101 ? "Cancelada" : null} type={sefaz?.cor} >
              <Dot type={item?.sefaz_status === 100 ? "success" : item?.sefaz_status === 101 ? "warning" : "default"  } />
            </Tooltip>
          ),
          portaria_status: (
            <Tooltip text={item?.portaria_status === 0 ? "Na Portaria" : item?.portaria_status === 1 ? "Autorizada" : null} type={portaria?.cor}
             >
               
               <Dot type={item?.portaria_status === 0 ? "warning" : item?.portaria_status === 1 ? "success" : "default"} />
               
             </Tooltip>
          ),
          option: (actions: any, item: any) => (
            <Popover
              placement="right"
              content={
                <>
                  <Popover.Item>
                    <Text
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const chave_nota = item?.rowValue.chave_nota;
                        const status_sefaz = Number(item?.rowValue.sefaz_status);
                        const desc_status_sefaz =
                          item?.rowValue.sefaz_status_desc;
                        console.log(item);
                       /*  router.push({
                          pathname,
                          query: {
                            chave_nota,
                            status_sefaz,
                            desc_status_sefaz,
                          },
                        }); */
                      }}
                    >
                      Visualizar
                    </Text>
                  </Popover.Item>
                  <Popover.Item>
                    <Popover
                    style={{ cursor: "pointer" }}
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
                    <Link href="#">Histórico de nota</Link>
                  </Popover.Item>
                  <Popover.Item>
                    <Link href="#">Download</Link>
                  </Popover.Item>
                  <Popover.Item>
                    <Link href="#">Imprimir Nota</Link>
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
  }, [nfe]);



  return (
    <>
      <Grid>
      <Table data={dataFormatted}>
            <Table.Column prop="option" />
            <Table.Column prop="dt_hr_emi" label="Emissão" />
            <Table.Column prop="nota" label="Número" />
            <Table.Column prop="serie" label="Série" />
            <Table.Column prop="emit_cnpj" label="CNPJ emitente" />
            <Table.Column prop="emit_nome" label="Fornecedor" />
            <Table.Column prop="sefaz_status" label="Status sefaz" />
            <Table.Column prop="portaria_status" label="Status portaria" />
            <Table.Column prop="chave_nota" label="Chave de acesso" />
            <Table.Column prop="dest_cnpj" label="CNPJ destinatário" />
            <Table.Column prop="dest_nome" label="Destinatário" />
            <Table.Column prop="criado_em" label="data/hora recebimento" />
          </Table>
          
      </Grid>
      <Pages>
          <Pagination onChange={handleChange} count={quantityPage}  shape='rounded' />
          </Pages>
          </>
  )
}