import { Table, Text } from '@geist-ui/react';
import { Grid } from '@components/Grid';
import useTransformArray from '@hooks/useTransformArray';

interface IProps {
    data: {
        informacoes_nfe: {
            mod: string;
            serie: string;
            nNF: string;
            verProc: string;
            dhEmi: string;
            dhSaiEnt: string;
        };
        versao: string;
        total: {
            ICMSTot: {
                vNF: string;
            };
        };
        cobranca: {
            dup:
                | [
                      {
                          nDup: string;
                          dVenc: string;
                          vDup: string;
                      },
                  ]
                | { nDup: string; dVenc: string; vDup: string };
        };
    };
}
export default function AbaCobranca({ data }) {
    const cobrancas = useTransformArray(data?.cobranca?.dup);

    return (
        <>
            <Text h3>Duplicatas </Text>
            {cobrancas.length !== 0 && (
                <Grid>
                    <Table data={cobrancas}>
                        <Table.Column prop="nDup" label="Número" />
                        <Table.Column prop="dVenc" label="Vencimento" />
                        <Table.Column prop="vDup" label="Valor" />
                    </Table>
                </Grid>
            )}
        </>
    );
}
