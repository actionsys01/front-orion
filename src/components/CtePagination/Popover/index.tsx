import { Popover, Text, Textarea, useModal, useToasts } from "@geist-ui/react";
import { MoreHorizontal } from "@geist-ui/react-icons";
import { useCallback, useState } from "react";
import router from "next/router";
import {useSecurityContext} from "@contexts/security";
import buscar from "@services/cte-mongo/buscar";
import Dacte from "@components/dacte"


interface PopoverProps {
    item: any
  }

  const PopoverCte: React.FC<PopoverProps> = ({ item }) => {
    const [visible, setVisible] = useState(false)
    // const [secondPopoverVisible, setSecondPopoverVisible] = useState(false)
    const {ctePermissions} = useSecurityContext()
    const [, setToast] = useToasts()

    const changeHandler = useCallback((next) => {
        setVisible(next)
      }, [])
    
      // const changeHandlerSecondPopover = useCallback((next) => {
      //   setSecondPopoverVisible(next)
      // }, [])

      const printData = useCallback(async (chave_nota) => {
          const cteData: any = []
          const medidasArray: any = []
          const produtosArray: any = []
          try {
            const response = await buscar(chave_nota);
            const cteResponse = response.data;
            if(Array.isArray(cteResponse)){
              const medidas = cteResponse.map((item) => item.informacoes_normal_substituto.infCarga.infQ)
              const produtos = cteResponse.map((item) => item.valores_servicos.Comp)
              Dacte(cteResponse, medidas, produtos)
              
            } else {
              cteData.push(cteResponse)
              const medidas = cteResponse.informacoes_normal_substituto.infCarga.infQ
              const produtos = cteResponse.valores_servicos.Comp
              console.log("etapa 1", medidas)
              if(Array.isArray(medidas) && Array.isArray(produtos)){
                Dacte(cteData, medidas, produtos)
              } else{
                medidasArray.push(medidas)
                produtosArray.push(produtos)
                console.log("etapa 2",medidas)
                Dacte(cteData, medidasArray, produtosArray)
              }
            }
          } catch (error) {
            console.log(error)
            setToast({
              text: "Houve um problema, por favor tente novamente",
              type: "warning"
            })
          }
        },[])

    return <>
      <Popover
            visible={visible}
            onVisibleChange={changeHandler}
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
                    <a href={item?.rowValue.xml} download>
                    <Text
                     onClick={() => setVisible(false)}
                     style={{ cursor: "pointer", textDecoration: "none", color: "#1C496A", margin: "0"}}
                    >
                      Download
                    </Text>
                    </a>
                  </Popover.Item>
               { ctePermissions.HISTORICO &&  
                <Popover.Item>
                    <Text 
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      const chave_nota = item?.rowValue.chave_nota;
                      const empresa_id = item?.rowValue.empresa_id
                      router.push({
                        pathname: `/historico-notas`,
                        query: {chave_nota, empresa_id}
                      })
                    }}
                    >Histórico de nota</Text>
                  </Popover.Item>}
                  <Popover.Item>
                    <Text 
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      const chave_nota = item?.rowValue.chave_nota;
                      printData(chave_nota)
                    }}
                    > 
                      Imprimir Nota
                    </Text>
                  </Popover.Item>
                </>
              }
            >
              <span style={{ cursor: "pointer" }}>
                <MoreHorizontal />
              </span>
            </Popover>
    </>
  }

  export default PopoverCte