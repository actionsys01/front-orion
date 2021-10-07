import { Link, Modal, Popover, Text, Textarea, useModal } from "@geist-ui/react";
import { MoreHorizontal } from "@geist-ui/react-icons";
import { useCallback, useState } from "react";
import router from "next/router";
import {useSecurityContext} from "@contexts/security"


interface PopoverProps {
    item: any
  }

  const PopoverCte: React.FC<PopoverProps> = ({ item }) => {
    const [visible, setVisible] = useState(false)
    // const [secondPopoverVisible, setSecondPopoverVisible] = useState(false)
    const {cteHistoricalPermission} = useSecurityContext()

    const changeHandler = useCallback((next) => {
        setVisible(next)
      }, [])
    
      // const changeHandlerSecondPopover = useCallback((next) => {
      //   setSecondPopoverVisible(next)
      // }, [])

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
                  {/* <Popover.Item>
                    <Popover
                    visible={secondPopoverVisible}
                    onVisibleChange={changeHandlerSecondPopover}
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
                  </Popover.Item> */}
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
               { cteHistoricalPermission &&  <Popover.Item>
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