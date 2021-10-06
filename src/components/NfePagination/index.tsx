import React, { useMemo , useCallback} from "react";
import getNfePagesByCompanyId from '@services/nfe';
import INfeDto from '@services/nfe/dtos/INfeDTO';
import { Dot, Table, Tooltip} from "@geist-ui/react";
import { useFiltro } from "@contexts/filtro";
import { useEffect } from "react";
import { MoreHorizontal } from "@geist-ui/react-icons";
import { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Grid, Pages, Visibility } from "./style";
import { useRouter } from "next/router";
import  {format} from "date-fns"
import { inherits } from "util";
import PopoverComponent from "./Popover";




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
  const router = useRouter()
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
          emissionDate: format(new Date(item.dt_hr_emi), "dd/MM/yyyy HH:mm:ss"),
          receiveDate: format(new Date(item.criado_em), "dd/MM/yyyy HH:mm:ss"),
          option: (actions: any, item: any) => (
            <PopoverComponent item={item} />
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

/*  option: (actions: any, item: any) => (
            <Visibility>
            <Popover
            visible={popoverVisibility}
            onVisibleChange={changeHandler}
            
              placement="right"
              content={
                <div className={ "show"}>
                  <Popover.Item >
                    <Text
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const chave_nota = item?.rowValue.chave_nota;
                        const status_sefaz = Number(item?.rowValue.sefaz_status);
                        const desc_status_sefaz =
                          item?.rowValue.sefaz_status_desc;
                        
                        router.push({
                          pathname: `/nfe-detalhes`,
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
                    visible={popoverVisibility}
                    style={{ cursor: "pointer" }}
                      placement="bottom"
                      content={
                        <>
                          <Popover.Item>
                            <Text 
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                              setVisible(true);
                              setAction("Ciência")    
                            }}>Ciência</Text>
                          </Popover.Item>
                          <Popover.Item>
                            <Text
                             style={{ cursor: "pointer" }}
                             onClick={() => {
                             setVisible(true);
                             setAction("Confirmação")    
                           }}
                            >Confirmação</Text>
                          </Popover.Item>
                          <Popover.Item>
                            <Text
                             style={{ cursor: "pointer" }}
                             onClick={() => {
                               const rowData = item?.rowValue;
                               unfinishedOp(rowData)
                               setPopoverVisibility(false)
                                
                           }}
                            >Operação não realizada</Text>
                          </Popover.Item>
                          <Popover.Item >
                            <Text
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              
                            setAction("Desconhecimento da Operação")    
                          }}
                            >Desconhecimento</Text>
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
                    onClick={()=> {
                      const chave_nota = item?.rowValue.chave_nota;
                      const empresa_id = item?.rowValue.empresa_id
                      router.push({
                        pathname: `/historico-notas`,
                        query: {chave_nota, empresa_id }
                      })
                    }}
                    >Histórico de nota</Text>
                  </Popover.Item>
                  <Popover.Item>
                    <a href={item?.rowValue.xml} download>
                    <Text
                    style={{ cursor: "pointer", textDecoration: "none", color: "#1C496A", margin: "0"}}
                    >Download</Text>
                    </a>
                  </Popover.Item>
                  <Popover.Item>
                    <Link href="#">Imprimir Nota</Link>
                  </Popover.Item>
                </div>
              }
            >
              <span style={{ cursor: "pointer" }}>
                <MoreHorizontal  onClick={changeHandler}/>
              </span>
            </Popover>
            </Visibility>
          ), */

          /*     option: (actions: any, item: any) => (
            <>
            <span style={{ cursor: "pointer" }}>
            <MoreHorizontal onClick={handleClick} />
          </span>
            <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            >
                <div >
                    <Text
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const chave_nota = item?.chave_nota;
                        const status_sefaz = Number(item?.sefaz_status);
                        const desc_status_sefaz =
                          item?.sefaz_status_desc;
                       
                        // router.push({
                        //   pathname: `/nfe-detalhes`,
                        //   query: {
                        //     chave_nota,
                        //     status_sefaz,
                        //     desc_status_sefaz,
                        //   },
                        // });
                      }}
                    >
                      Visualizar
                    </Text>
                      <div>
                    <Popover>
                    
                        <>
                            <Text 
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                              setVisible(true);
                              setAction("Ciência")    
                            }}>Ciência</Text>
                            <Text
                             style={{ cursor: "pointer" }}
                             onClick={() => {
                             setVisible(true);
                             setAction("Confirmação")    
                           }}
                            >Confirmação</Text>
                       
                            <Text
                             style={{ cursor: "pointer" }}
                             onClick={() => {
                               const rowData = item?.rowValue;
                               unfinishedOp(rowData)
                               setPopoverVisibility(false)
                                
                           }}
                            >Operação não realizada</Text>
                          
                            <Text
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              
                            setAction("Desconhecimento da Operação")    
                          }}
                            >Desconhecimento</Text>
                          
                        </>
                     
                      Registrar evento
                    </Popover>
                      </div>
                    <Text 
                    style={{ cursor: "pointer" }}
                    onClick={()=> {
                      const chave_nota = item?.chave_nota;
                      const empresa_id = item?.empresa_id
                      router.push({
                        pathname: `/historico-notas`,
                        query: {chave_nota, empresa_id }
                      })
                    }}
                    >Histórico de nota</Text>
                  
                    <a href={item?.rowValue.xml} download>
                    <Text
                    style={{ cursor: "pointer", textDecoration: "none", color: "#1C496A", margin: "0"}}
                    >Download</Text>
                    </a>
                    <Link href="#">Imprimir Nota</Link>
                </div>
            
          
            </Popover>
            </>
          ),   */