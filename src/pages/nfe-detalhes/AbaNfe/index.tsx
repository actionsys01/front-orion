import { useMemo, useState } from 'react'
import { useRouter } from "next/router";
import {  CardStyle, DadosStyle, LineStyle } from "@styles/vizualizar";
import {format} from "date-fns"
import { ChevronDown, ChevronUp } from '@geist-ui/react-icons'
export interface IProps {
  data: {
    informacoes_nfe: {
      mod: string;
      serie: string;
      nNF: string;
      verProc: string;
      dEmi: string;
      dhEmi: string
      hSaiEnt: string;
      dSaiEnt: string;
      dhSaiEnt?: string;
    };
    versao: string;
    total: {
      ICMSTot: { vNF: string };
    };
    emitente: {
      xNome: string;
      xFant: string;
      CNPJ: string;
      CNAE: string;
      IM: string;
      enderEmit: {
        fone: string;
        UF: string;
        nro: string;
        CEP: string;
        xBairro: string;
        xPais: string;
        xMun: string;
        xLgr: string;
      };
      IE: string;
    };
    destinatario: {
      xNome: string;
      xFant: string;
      CNPJ: string;
      CNAE: string;
      IM: string;
      enderDest: {
        fone: string;
        UF: string;
        nro: string;
        CEP: string;
        xBairro: string;
        xPais: string;
        xMun: string;
        xLgr: string;
      };
      IE: string;
    };
  };
}
export default function AbaNfe({ data }) {
  const router = useRouter();
  const [ modalEmitente, setModalEmitente ] = useState(false)
  const [ modalDestinatário, setModalDestinatario ] = useState(false)

  const dataEmissao = useMemo(() => {
    let dataEmissao 
    if(data){
      if(data?.informacoes_nfe?.dEmi) {
      dataEmissao =  format(new Date(data?.informacoes_nfe?.dEmi), "dd-MM-yyyy") 
    } if(data?.informacoes_nfe?.dhEmi) {
      dataEmissao =  format(new Date(data?.informacoes_nfe?.dhEmi), "dd-MM-yyyy")
    }}
    return dataEmissao
  }, [data])


  return (
    <>
      <CardStyle>
        <div>
        <h3>Dados NF-e </h3>
        <div>
          <div>
            <h5>Modelo </h5>
            <h6>{data?.informacoes_nfe?.mod}</h6>
          </div>
          <div>
            <h5>Série</h5>
            <h6>{data?.informacoes_nfe?.serie}</h6>
          </div>
          <div>
            <h5>Número</h5>
            <h6>{data?.informacoes_nfe?.nNF}</h6>
          </div>
          <div>
            <h5>Data de emissão</h5>
            <h6>{dataEmissao}</h6>
          </div>
          <div>
            <h5>Data de saída/entrada</h5>
            <h6>{data?.informacoes_nfe?.dSaiEnt}</h6>
          </div>
          <div>
            <h5>Valor total NF-e</h5>
            <h6>{data?.total?.ICMSTot.vNF}</h6>
          </div>
        </div>
        </div>
      </CardStyle>
      <DadosStyle>
        <div>
          <div className="header"
          onClick={() => setModalEmitente(!modalEmitente)}>
            <h3>Dados Emitente</h3>
            {!modalEmitente ? <ChevronDown /> : <ChevronUp />}
          </div>
          {modalEmitente && 
          <>
            <LineStyle>
              <div>
                <h5>Razão social</h5>
                <h6>{data?.emitente?.xNome}</h6>
              </div>
              <div>
                <h5>Nome fantasia</h5>
                <h6>{data?.emitente?.xFant}</h6>
              </div>
            </LineStyle>
            <LineStyle>
              <div>
                <h5>CNPJ </h5>
                <h6>{data?.emitente?.CNPJ}</h6>
              </div>
              <div>
                <h5>Inscrição Estadual</h5>
                <h6>{data?.emitente?.IE}</h6>
              </div>
              <div>
                <h5>Inscrição Munincipal</h5>
                <h6>{data?.emitente?.IM}</h6>
              </div>
              <div>
                <h5>CNAE Fiscal</h5>
                <h6>{data?.emitente?.CNAE}</h6>
              </div>
            </LineStyle>
            <LineStyle>
              <div>
                <h5>Telefone</h5>
                <h6>{data?.emitente?.enderEmit?.fone}</h6>
              </div>
              <div>
                <h5>CEP</h5>
                <h6>{data?.emitente?.enderEmit?.CEP}</h6>
              </div>
              <div>
                <h5>UF</h5>
                <h6>{data?.emitente?.enderEmit?.UF}</h6>
              </div>
              <div>
                <h5>País</h5>
                <h6>{data?.emitente?.enderEmit?.xPais}</h6>
              </div>
            </LineStyle>
            <LineStyle>
              <div>
                <h5>Endereço </h5>
                <h6>{data?.emitente?.enderEmit?.xLgr}</h6>
              </div>
              <div>
                <h5>Número</h5>
                <h6>{data?.emitente?.enderEmit?.nro}</h6>
              </div>
            </LineStyle>
            <LineStyle>
              <div>
                <h5>Bairro</h5>
                <h6>{data?.emitente?.enderEmit?.xBairro}</h6>
              </div>
              <div>
                <h5>Município</h5>
                <h6>{data?.emitente?.enderEmit?.xMun}</h6>
              </div>
            </LineStyle>
          </>}
        </div>
      </DadosStyle>
      <DadosStyle>
        <div>
          <div className="header"
          onClick={() => setModalDestinatario(!modalDestinatário)}>
            <h3>Dados Destinatário</h3>
            {!modalDestinatário ? <ChevronDown /> : <ChevronUp />}
          </div>
          {modalDestinatário && 
          <>
          <LineStyle>
            <div>
              <h5>Razão social</h5>
              <h6>{data?.destinatario?.xNome}</h6>
            </div>
            <div>
              <h5>Nome fantasia</h5>
              <h6>{data?.destinatario?.xFant}</h6>
            </div>
          </LineStyle>
          <LineStyle>
            <div>
              <h5>CNPJ </h5>
              <h6>{data?.destinatario?.CNPJ}</h6>
            </div>
            <div>
              <h5>Inscrição Estadual</h5>
              <h6>{data?.destinatario?.IE}</h6>
            </div>
            <div>
              <h5>Inscrição Munincipal</h5>
              <h6>{data?.destinatario?.IM}</h6>
            </div>
            <div>
              <h5>CNAE Fiscal</h5>
              <h6>{data?.destinatario?.CNAE}</h6>
            </div>
          </LineStyle>
          <LineStyle>
            <div>
              <h5>Telefone</h5>
              <h6>{data?.destinatario?.enderDest?.fone}</h6>
            </div>
            <div>
              <h5>CEP</h5>
              <h6>{data?.destinatario?.enderDest?.CEP}</h6>
            </div>
            <div>
              <h5>UF</h5>
              <h6>{data?.destinatario?.enderDest?.UF}</h6>
            </div>
            <div>
              <h5>País</h5>
              <h6>{data?.destinatario?.enderDest?.xPais}</h6>
            </div>
          </LineStyle>
          <LineStyle>
            <div>
              <h5>Endereço </h5>
              <h6>{data?.destinatario?.enderDest?.xLgr}</h6>
            </div>
            <div>
              <h5>Número</h5>
              <h6>{data?.destinatario?.enderDest?.nro}</h6>
            </div>
          </LineStyle>
          <LineStyle>
            <div>
              <h5>Bairro</h5>
              <h6>{data?.destinatario?.enderDest?.xBairro}</h6>
            </div>
            <div>
              <h5>Município</h5>
              <h6>{data?.destinatario?.enderDest?.xMun}</h6>
            </div>
          </LineStyle>
          </>}
        </div>
      </DadosStyle>
      <CardStyle>
        <div> 
        <h3>Situação Atual</h3>
          <div>
            <div>
              <h5>Status Sefaz </h5>
              <h6>{router.query.status_sefaz}</h6>
            </div>
            <div>
              <h5>Descrição Status</h5>
              <h6>{router.query.desc_status_sefaz}</h6>
            </div>
          </div> 
        </div>
      </CardStyle>
    </>
  );
}
