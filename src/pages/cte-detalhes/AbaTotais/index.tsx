import { Grid, Spacer, Text } from "@geist-ui/react";
import { Titulo } from "@components/Titulo";
import { GridAlinhaTextoCentro } from "@components/GridAlinhaTextoCentro";
import { BackgroundCinza } from "@components/BackgroundCinza/styled";
import React, {useMemo} from 'react'
import { AbaProps } from "@services/cte-mongo/cte-type/cte";
import { CardStyle, LineStyle } from "@styles/vizualizar";

// interface IProps {
//   data: {
//     impostos: {
//       ICMS: {
//         ICMS00: { CST: string; vBC: string; vICMS: string; pICMS: string};
//         ICMS20: { CST: string; vBC: string; pRedBC: string; vICMS: string; pICMS: string };
//         ICMS45: { CST: string;};
//         ICMS60: { CST: string; vBCSTRet: string; vICMSSTRet: string; pICMSSTRet: string };
//         ICMS90: { CST: string; pRedBC: string; vBC: string; pICMS: string; vICMS: string };
//         ICMSOutraUF: {
//           CST: string;
//           pRedBCOutraUF: string;
//           vBCOutraUF: string;
//           pICMSOutraUF: string;
//           vICMSOutraUF: string;
//         };
//         ICMSSN: {
//           CST: string;
//           indSN: string;
//           vTotTrib: string;
//           infAdFisco: string;
//         };
//       };
//     };
//     valores_servicos: { vTPrest: string; vRec: string };
//     informacoes_cte: {
//       cCT: string;
//     };
//     versao: string;
//   };
// }
export default function AbaTotais({ data } : AbaProps) {

const getTotalsData = useMemo(() => {
  const icmsData: any = [];
  if(data) {
    icmsData.push({...data,
    ICMS: data.impostos.ICMS.ICMS00 ||
    data.impostos.ICMS.ICMS20 ||
    data.impostos.ICMS.ICMS45 ||
    data.impostos.ICMS.ICMS60 ||
    data.impostos.ICMS.ICMS90 ||
    data.impostos.ICMS.ICMSOutraUF ||
    data.impostos.ICMS.ICMSSN
    })
  }
  
  return icmsData
},[data])

  //console.log(data)
  return (
    <>
        {getTotalsData.map((item: any, i: any) => (
          <div key={i}>
      <CardStyle>
        <div>
          <h3>Totais</h3>
          <div>
            <div>
              <h5>Valor Total da Prestação de Serviços </h5>
              <h6>{item?.valores_servicos?.vTPrest}</h6>
            </div>
            <div>
              <h5>Valor a Receber </h5>
              <h6>{item?.valores_servicos?.vRec}</h6>
            </div>
          </div>
        </div>
      </CardStyle>

      <CardStyle>
        <div>
          <h3>Impostos</h3>
          <LineStyle>
            <div>
              <h5>CST</h5>
              <h6>{item?.ICMS?.CST}</h6>
            </div>
            <div>
              <h5>BC do ICMS</h5>
              <h6>{item?.ICMS?.vBC}</h6>
            </div>
            <div>
              <h5>Alíquota do ICMS</h5>
              <h6>{item?.ICMS?.pICMS}</h6>
            </div>
            <div>
              <h5>Valor do ICMS</h5>
              <h6>{item?.ICMS?.vICMS}</h6>
            </div>
            <div>
              <h5>Alíquota de redução da BC</h5>
              <h6>{item?.ICMS?.vBCSTRet}</h6>
            </div>
          </LineStyle>
          <LineStyle>
            <div>
              <h5>BC do ICMS</h5>
              <h6>{item?.ICMS?.vBC}</h6>
            </div>
            <div>
              <h5>Alíquota do ICMS</h5>
              <h6>{item?.ICMS?.pICMS}</h6>
            </div>
            <div>
              <h5>Valor do ICMS</h5>
              <h6>{item?.ICMS?.vICMS}</h6>
            </div>
            <div>
              <h5>Alíquota de redução da BC</h5>
              <h6>{item?.ICMS?.vBCSTRet}</h6>
            </div>
          </LineStyle>
          
        </div>
      </CardStyle>
    
      </div>
        ))}
      <Spacer />
    </>
  );
}
