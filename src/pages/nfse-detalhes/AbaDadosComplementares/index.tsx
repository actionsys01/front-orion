import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { useSession } from "next-auth/client";
import { useToasts } from "@geist-ui/react";
import { useRouter } from "next/router";
import { ExtraDataStyle } from './style';
import { NfseFormattedProps } from "@services/nfse/types/NfseProps"


interface AbaProps {
    data: string[]
}


const AbaDadosComplementares = ({data}) => {
    console.log(`data nos dados`, data)

    return <> 
    {data.map((item: NfseFormattedProps, i: number) => (
        <>
        <ExtraDataStyle>
            <div>
                <h3>Outras Informações</h3>
                <div>
                    <div>
                        <h6>{item.outrasInformacoes}</h6>
                    </div>
                </div>
            </div>
        </ExtraDataStyle>
        <ExtraDataStyle>
            <div>
                <h3>Informações da Atividade</h3>
                <div>
                    <div>
                        <h6>{item.descricaoAtividade}</h6>
                        <h6>{item.descricaoTipoServico}</h6>
                    </div>
                </div>
            </div>
        </ExtraDataStyle>
        <ExtraDataStyle>
            <div>
                <h3>Particularidades da Nota</h3>
                <div>
                    <div>
                        <h6>{item.particularidades}</h6>
                    </div>
                </div>
            </div>
        </ExtraDataStyle>
        </>
    ))}
        


    </>
}

export default AbaDadosComplementares