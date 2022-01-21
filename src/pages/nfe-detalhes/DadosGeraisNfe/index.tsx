import { useRouter } from "next/router";
import {  CardStyle } from "@styles/vizualizar";
import { NfeXmlDataProps } from "@services/nfe/dtos/nfeXml"

// interface IProps {
//   data: {
//     informacoes_nfe: {
//       nNF: string;
//     };
//     versao: string;
//   };
// }
export default function DadosGeraisNfe({ data }: NfeXmlDataProps) {
  const router = useRouter();

  return <>
      <CardStyle>
        <div style={{backgroundColor: "#fff"}}>
          <h3>Dados Gerais</h3>
          <div>
            <div>
              <h5>Chave de acesso</h5>
              <h6>{router.query?.chave_nota}</h6>
            </div>
            <div>
              <h5>Número</h5>
              <h6>{data?.informacoes_nfe?.nNF}</h6>
            </div>
            <div>
              <h5>Versão XML</h5>
              <h6>{data?.versao}</h6>
            </div>
          </div>
        </div>
      </CardStyle>
      
    </>
  
}
