import { ExtraDataStyle } from './style';
import { NfseFormattedProps } from "@services/nfse/types/NfseProps"



const AbaDadosComplementares = ({data}) => {
    console.log(`data nos dados`, data)

    return <> 
    {data?.map((item: NfseFormattedProps, i: number) => (
        <div key={i}>
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
        </div>
    ))}
        


    </>
}

export default AbaDadosComplementares