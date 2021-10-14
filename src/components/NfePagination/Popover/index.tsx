import { Link, Modal, Popover, Text, Textarea, useModal, useToasts } from "@geist-ui/react";
import { MoreHorizontal } from "@geist-ui/react-icons";
import { useCallback, useState, useEffect } from "react";
import router, { useRouter } from "next/router";
import {useSecurityContext} from "@contexts/security";
import api from "@services/api"
import { eventNames } from "cluster";
interface PopoverProps {
  item: any
}

interface Event {
  company_id: number;
  dest_cnpj: string;
  tipo_evento: string;
  motivo: string;
  cod_estado: string;
  key: string
}

  const PopoverComponent: React.FC<PopoverProps> = ({ item }) => {
    const [visible, setVisible] = useState(false)
    const [action, setAction] = useState("")
    const router = useRouter()
    const { setVisible: setVisiblePop, bindings } = useModal();
    const [secondPopoverVisible, setSecondPopoverVisible] = useState(false)
    const {nfeHistoricalPermission, nfeAwarePermission, nfeConfirmPermission, nfeUnawarePermission, nfeUnauthorizedPermission} = useSecurityContext()
    const [ reason, setReason] = useState<string>("")
    const [eventType, setEventType] = useState< string>("")
    const [stateCode, setStateCode] = useState<string>("") 
    const [invoiceKey, setInvoiceKey] = useState<string>("")
    const [companyId, setCompanyId] = useState<number>()
    const [cnpj, setCnpj] = useState<string>("")
    const [, setToast] = useToasts()

    const changeHandler = useCallback((next) => {
      setVisible(next)
    }, [])

    const changeHandlerSecondPopover = useCallback((next) => {
      setSecondPopoverVisible(next)
    }, [])


    const getEventData = useCallback((key, company_id, dest_cnpj) => {
         const firstString = key.substring(0,1)
         const cod_estado = firstString === "N" ? key.substring(3,5) : key.substring(0,2)
         setStateCode(cod_estado);
         setInvoiceKey(key)
         setCompanyId(company_id)
         setCnpj(dest_cnpj)
         setVisiblePop(true);
         setSecondPopoverVisible(false)
         setVisible(false) 
        //  console.log("cod_estado:",stateCode, key, invoiceKey, company_id, dest_cnpj, "tipo:",eventType,"motivo:", reason)
        },[invoiceKey, cnpj ])
        
        // console.log("cod_estado:",stateCode, "nota:", invoiceKey, "empresa:", companyId, "cnpj", cnpj, "tipo:",eventType,"motivo:", reason)



      //chave_nota: invoiceKey, empresa_id: companyId, dest_cnpj: cnpj, tipo_evento: eventType, motivo: reason, cod_estado: stateCode, ambiente: "HOMOLOGACAO" 
      
    async function eventRegister() {
     try {
      await api.post("/nfe/controle/evento-sefaz",{
        empresa_id: companyId,
        dest_cnpj: cnpj,
        ambiente: "HOMOLOGACAO",
        tipo_evento: eventType,
        motivo: reason,
        cod_estado: stateCode,
        chave_nota: invoiceKey
      })
      setToast({
        text: "Evento registrado com sucesso",
        type: "success"
      })

    } catch (error) {
      setToast({
        text: "Não foi possível registrar o evento, por favor tente novamente",
        type: "warning"
      })
    }
    }
    
    

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
              {(nfeAwarePermission || nfeConfirmPermission || nfeUnauthorizedPermission || nfeUnawarePermission) && (
                <>
                  <Popover.Item>
                    <Popover
                      visible={secondPopoverVisible}
                      onVisibleChange={changeHandlerSecondPopover}
                      style={{ cursor: "pointer" }}
                      placement="right"
                      content={
                        <>
                        {nfeAwarePermission &&
                          <Popover.Item>
                            <Text 
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                              const key = String(item?.rowValue.chave_nota);
                              const company_id = Number(item?.rowValue.empresa_id);
                              const dest_cnpj = String(item?.rowValue.dest_cnpj);
                              const reasonKey = "CIENCIA_DA_OPERAÇÃO";
                              setReason(reasonKey)
                              setEventType(reasonKey)
                              getEventData(key, company_id, dest_cnpj)
                              setAction("Ciência da Operação")
                              
                            }}>Ciência</Text>
                          </Popover.Item>}

                          {nfeConfirmPermission && (
                          <Popover.Item>
                            <Text
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                              const key = String(item?.rowValue.chave_nota);
                              const company_id = Number(item?.rowValue.empresa_id);
                              const dest_cnpj = String(item?.rowValue.dest_cnpj);
                              const reasonKey = "CONFIRMACAO_DA_OPERAÇÃO";
                              setReason(reasonKey)
                              setEventType(reasonKey)
                              getEventData(key, company_id, dest_cnpj)
                              setAction("Confirmação da Operação" )
                            }}
                            >Confirmação</Text>
                          </Popover.Item>
                          )}
                        {nfeUnauthorizedPermission &&
                          <Popover.Item>
                            <Text
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                const key = String(item?.rowValue.chave_nota);
                                const company_id = Number(item?.rowValue.empresa_id);
                                const dest_cnpj = String(item?.rowValue.dest_cnpj);
                                const reasonKey = "OPERACAO_NAO_REALIZADA"
                                setEventType(reasonKey)
                                getEventData(key, company_id, dest_cnpj)
                                setAction("Operação não realizada")
                            }}
                            >Operação não realizada</Text>
                          </Popover.Item>}
                        {nfeUnawarePermission &&
                          <Popover.Item >
                            <Text
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              const key = String(item?.rowValue.chave_nota);
                              const company_id = Number(item?.rowValue.empresa_id);
                              const dest_cnpj = String(item?.rowValue.dest_cnpj);
                              const reasonKey = "DESCONHECIMENTO_DA_OPERACAO"
                              setEventType(reasonKey)
                              getEventData(key, company_id, dest_cnpj)
                              setAction("Desconhecimento da Operação")
                          }}
                            >Desconhecimento</Text>
                          </Popover.Item>}
                        </>
                      }
                    >
                        Registrar evento
                    </Popover>
                  </Popover.Item>
                </>
              )}

              {nfeHistoricalPermission && <Popover.Item>
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
              </Popover.Item>}
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
            <MoreHorizontal />
          </span>
        </Popover>
        <Modal
          style={{zIndex: 1020}}
        disableBackdropClick={true}
        {...bindings}
        onClose={() => {
          setEventType("");
          setReason("");
          setStateCode("");
          setInvoiceKey("")
          // setCompanyId()
          setCnpj("")
        }}
      >
        <Modal.Title>{ action }</Modal.Title>
        <Modal.Subtitle>Registrar Evento</Modal.Subtitle>
        {action === "Ciência da Operação"  &&
          <Modal.Content>
          <Text small style={{textAlign: 'center'}}>Deseja prosseguir com a operação?</Text>
        </Modal.Content>
        }
        {action === "Confirmação da Operação"  &&
          <Modal.Content>
          <Text small  style={{textAlign: 'center'}}>Deseja prosseguir com a operação?</Text>
        </Modal.Content>
        }
        {action ===  "Operação não realizada" &&
        <Modal.Content>
          <Text small>Motivo</Text>
          <Textarea
            width="100%"
             placeholder="Ex: Essa operação não foi realizada por problemas de logística"
           
            onChange={(e) => setReason(e.target.value)}
          />
        </Modal.Content>
        }
          {action ===  "Desconhecimento da Operação" &&
        <Modal.Content>
          <Text small>Motivo</Text>
          <Textarea
            width="100%"
            placeholder="Ex: Os dados da nota não conferem"
            onChange={(e) => setReason(e.target.value)}
          />
        </Modal.Content>
        }
        <Modal.Action passive onClick={() => setVisiblePop(false)} type="abort">
          CANCELAR
        </Modal.Action>
        <Modal.Action onClick={() => {setVisiblePop(false), eventRegister()}} >
          CONTINUAR
        </Modal.Action>
      </Modal>
      </>
  );
};

export default PopoverComponent;
