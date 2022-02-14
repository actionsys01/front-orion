import React, { useMemo } from 'react';
import { AbaProps } from '@services/cte-mongo/cte-type/cte';
import { CardStyle, LineStyle } from '@styles/vizualizar';

export default function AbaTotais({ data }: AbaProps) {
    const getTotalsData = useMemo(() => {
        const icmsData: any = [];
        if (data) {
            icmsData.push({
                ...data,
                ICMS:
                    data.impostos.ICMS.ICMS00 ||
                    data.impostos.ICMS.ICMS20 ||
                    data.impostos.ICMS.ICMS45 ||
                    data.impostos.ICMS.ICMS60 ||
                    data.impostos.ICMS.ICMS90 ||
                    data.impostos.ICMS.ICMSOutraUF ||
                    data.impostos.ICMS.ICMSSN,
            });
        }

        return icmsData;
    }, [data]);

    //console.log(data)
    return (
        <>
            {/* {getTotalsData.map((item: any, i: any) => ( */}
            <div /* key={i} */>
                <CardStyle>
                    <div>
                        <h3>Totais</h3>
                        <div>
                            <div>
                                <h5>Valor Total da Prestação de Serviços </h5>
                                <h6>{data?.valores_servicos?.vTPrest}</h6>
                            </div>
                            <div>
                                <h5>Valor a Receber </h5>
                                <h6>{data?.valores_servicos?.vRec}</h6>
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
                                <h6>{data?.impostos?.ICMS?.ICMS45?.CST}</h6>
                            </div>
                            <div>
                                <h5>BC do ICMS</h5>
                                <h6>{data?.impostos?.ICMS?.ICMS00?.vBC}</h6>
                            </div>
                            <div>
                                <h5>Alíquota do ICMS</h5>
                                <h6>{data?.impostos?.ICMS?.ICMS00?.pICMS}</h6>
                            </div>
                            <div>
                                <h5>Valor do ICMS</h5>
                                <h6>{data?.impostos?.ICMS?.ICMS00?.vICMS}</h6>
                            </div>
                            <div>
                                <h5>Alíquota de redução da BC</h5>
                                <h6>{data?.impostos?.ICMS?.ICMS20?.pICMS}</h6>
                            </div>
                        </LineStyle>
                        <LineStyle>
                            <div>
                                <h5>BC do ST Ret</h5>
                                <h6>
                                    {data?.impostos?.ICMS?.ICMS60?.vBCSTRet}
                                </h6>
                            </div>
                            <div>
                                <h5>Valor do ICMS ST Ret</h5>
                                <h6>
                                    {data?.impostos?.ICMS?.ICMS60?.vICMSSTRet}
                                </h6>
                            </div>
                            <div>
                                <h5>Alíquota de Redução do ICMS ST Ret</h5>
                                <h6>
                                    {data?.impostos?.ICMS?.ICMS60?.pICMSSTRet}
                                </h6>
                            </div>
                            {/* <div>
              <h5>Alíquota ICMS ST Ret</h5>
              <h6>{}</h6>
            </div> */}
                        </LineStyle>
                        <LineStyle>
                            <div>
                                <h5>BC do ICMS Outra UF</h5>
                                <h6>
                                    {
                                        data?.impostos?.ICMS?.ICMSOutraUF
                                            ?.vBCOutraUF
                                    }
                                </h6>
                            </div>
                            <div>
                                <h5>Alíquota ICMS Outra UF</h5>
                                <h6>
                                    {
                                        data?.impostos?.ICMS?.ICMSOutraUF
                                            ?.pICMSOutraUF
                                    }
                                </h6>
                            </div>
                            <div>
                                <h5>Valor ICMS Outra UF</h5>
                                <h6>
                                    {
                                        data?.impostos?.ICMS?.ICMSOutraUF
                                            ?.vICMSOutraUF
                                    }
                                </h6>
                            </div>
                        </LineStyle>
                    </div>
                </CardStyle>
            </div>
        </>
    );
}
