import { Table, Text } from '@geist-ui/react';
import { Grid } from '@components/Grid';
import DadosGeraisNfe from '../DadosGeraisNfe';
import { useEffect, useState } from 'react';

interface IProps {
    data: {
        informacoes_nfe: {
            mod: string;
            serie: string;
            nNF: string;
            verProc: string;
            dhEmi: string;
            dhSaiEnt: string;
            NFref:
                | [
                      {
                          refNFe: string;
                          refNF: {
                              cUF: string;
                              AAMM: string;
                              CNPJ: string;
                              mod: string;
                              serie: string;
                              nNF: string;
                          };
                          refECF: { nCOO: string; nECF: string };
                      },
                  ]
                | {
                      refNFe: string;
                      refNF: {
                          cUF: string;
                          AAMM: string;
                          CNPJ: string;
                          mod: string;
                          serie: string;
                          nNF: string;
                      };
                      refECF: { nCOO: string; nECF: string };
                  };
        };
        versao: string;
    };
}
export default function AbaNotaReferenciada({ data }) {
    const [notasReferenciadas, setNotasReferenciadas] = useState([]);

    useEffect(() => {
        let referenciadas: any = [];
        if (Array.isArray(data?.informacoes_nfe.NFref)) {
            referenciadas = data.informacoes_nfe.NFref.map(item => {
                const { refNFe } = item;
                const { AAMM, CNPJ, cUF, nNF, mod, serie } = item.refNF;

                const { nCOO, nECF } = item.refECF;

                referenciadas.push({
                    refNFe,
                    AAMM,
                    CNPJ,
                    cUF,
                    nNF,
                    mod,
                    serie,
                    nCOO,
                    nECF,
                });
            });
        } else {
            if (
                data?.informacoes_nfe?.NFref?.refECF &&
                data?.informacoes_nfe.NFref?.refNF &&
                data?.informacoes_nfe.NFref?.refNFe
            ) {
                // eslint-disable-next-line no-unsafe-optional-chaining
                const { refNFe } = data?.informacoes_nfe?.NFref;

                const { AAMM, CNPJ, cUF, nNF, mod, serie } =
                    // eslint-disable-next-line no-unsafe-optional-chaining
                    data?.informacoes_nfe.NFref?.refNF;

                // eslint-disable-next-line no-unsafe-optional-chaining
                const { nCOO, nECF } = data?.informacoes_nfe.NFref?.refECF;
                referenciadas.push({
                    refNFe,
                    AAMM,
                    CNPJ,
                    cUF,
                    nNF,
                    mod,
                    serie,
                    nCOO,
                    nECF,
                });
            }
        }

        setNotasReferenciadas(referenciadas);
    }, [data]);

    return (
        <>
            <Text h3>Notas Referenciadas </Text>
            {notasReferenciadas.length !== 0 && (
                <Grid>
                    <Table data={notasReferenciadas}>
                        <Table.Column prop="nDup" label="Sequencia" />
                        <Table.Column
                            prop="refNFe"
                            label="Chave de Acesso NF-e Referenciada"
                        />
                        <Table.Column prop="cUF" label="UF Emitente" />
                        <Table.Column prop="nNF" label="N??mero Documento" />
                        <Table.Column prop="serie" label="S??rie" />
                        <Table.Column
                            prop="AAMM"
                            label="Ano M??s de emiss??o NFe"
                        />
                        <Table.Column prop="CNPJ" label="CNPJ Emitente" />
                        <Table.Column
                            prop="mod"
                            label="Modelo de Documento Fiscal"
                        />
                        <Table.Column prop="nECF" label="N??mero de Ordem" />
                        <Table.Column prop="nCOO" label="N??mero COO" />
                    </Table>
                </Grid>
            )}
        </>
    );
}
