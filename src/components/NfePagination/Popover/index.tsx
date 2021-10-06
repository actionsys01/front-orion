import { Link, Modal, Popover, Text, Textarea, useModal } from "@geist-ui/react";
import { MoreHorizontal } from "@geist-ui/react-icons";
import { useCallback, useState } from "react";
import router from "next/router";

interface PopoverProps {
  item: any
}

  const PopoverComponent: React.FC<PopoverProps> = ({ item }) => {
    const [visible, setVisible] = useState(false)
    const [action, setAction] = useState("")
    const { setVisible: setVisiblePop, bindings } = useModal();
    const [secondPopoverVisible, setSecondPopoverVisible] = useState(false)

    const changeHandler = useCallback((next) => {
      setVisible(next)
    }, [])

    const changeHandlerSecondPopover = useCallback((next) => {
      setSecondPopoverVisible(next)
    }, [])

  return (
    <>
      <Popover
        visible={visible}
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
                  visible={secondPopoverVisible}
                  onVisibleChange={changeHandlerSecondPopover}
                  style={{ cursor: "pointer" }}
                  placement="right"
                  content={
                    <>
                      <Popover.Item>
                        <Text 
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                          setVisiblePop(true);
                          setAction("Ciência")  
                          setSecondPopoverVisible(false)
                            setVisible(false) 
                        }}>Ciência</Text>
                      </Popover.Item>
                      <Popover.Item>
                        <Text
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                          setVisiblePop(true);
                          setAction("Confirmação")
                          setSecondPopoverVisible(false)
                            setVisible(false)
                        }}
                        >Confirmação</Text>
                      </Popover.Item>
                      <Popover.Item>
                        <Text
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const rowData = item?.rowValue;
                            setAction("Operação não realizada")
                            setVisiblePop(true)
                            setSecondPopoverVisible(false)
                            setVisible(false)
                        }}
                        >Operação não realizada</Text>
                      </Popover.Item>
                      <Popover.Item >
                        <Text
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setAction("Desconhecimento da Operação" )
                            setVisiblePop(true)
                            setSecondPopoverVisible(false)
                            setVisible(false)
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
                onClick={() => setVisible(false)}
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
            <MoreHorizontal  /* onClick={changeHandler} *//>
          </span>
        </Popover>
        <Modal
          style={{zIndex: 1020}}
        disableBackdropClick={true}
        {...bindings}
        onClose={() => {
          // setNome("");
          // setDescricao("");
        }}
      >
        <Modal.Title>{ action }</Modal.Title>
        <Modal.Subtitle>Registrar Evento</Modal.Subtitle>
        {action === "Ciência"  &&
          <Modal.Content>
          <Text small style={{textAlign: 'center'}}>Deseja prosseguir com a operação de {action}?</Text>
        </Modal.Content>
        }
        {action === "Confirmação"  &&
          <Modal.Content>
          <Text small  style={{textAlign: 'center'}}>Deseja prosseguir com a operação de {action}?</Text>
        </Modal.Content>
        }
        {action ===  "Operação não realizada" &&
        
        <Modal.Content>
          <Text small>Motivo</Text>
          <Textarea
            width="100%"
             placeholder="Ex: Essa operação não foi realizada por problemas de logística"
            // value={reason}
            // onChange={(e) => setReason(e.target.value)}
          />
        </Modal.Content>
        }
          {action ===  "Desconhecimento da Operação" &&
        
        <Modal.Content>
          <Text small>Motivo</Text>
          <Textarea
            width="100%"
             placeholder="Ex: Os dados da nota não conferem"
            // value={reason}
            // onChange={(e) => setReason(e.target.value)}
          />
        </Modal.Content>
        }
        <Modal.Action passive onClick={() => setVisiblePop(false)} type="abort">
          CANCELAR
        </Modal.Action>
        <Modal.Action onClick={() => setVisiblePop(false)} >
          CONTINUAR
        </Modal.Action>
      </Modal>
      </>
  );
};

export default PopoverComponent;
