import { useRouter } from 'next/router';
import { CardStyle } from '@styles/vizualizar';
interface IProps {
    data: {
        informacoes_cte: {
            nCT: string;
        };
        versao: string;
    };
}
export default function DadosGeraisCte({ data }: IProps) {
    const router = useRouter();
    return (
        <>
            <CardStyle>
                <div style={{ backgroundColor: '#fff' }}>
                    <h3>Dados Gerais</h3>
                    <div>
                        <div>
                            <h5>Chave de Acesso</h5>
                            <h6>{String(router.query?.chave_nota)}</h6>
                        </div>
                        <div>
                            <h5>Número</h5>
                            <h6>{data?.informacoes_cte?.nCT}</h6>
                        </div>
                        <div>
                            <h5>Versão XML</h5>
                            <h6>{data?.versao}</h6>
                        </div>
                    </div>
                </div>
            </CardStyle>
        </>
    );
}
