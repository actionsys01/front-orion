import NaoEncontrado from '@components/NaoEncontrado';
import { Dot, Link, Popover, Table, Text, Tooltip } from '@geist-ui/react';
import { MoreHorizontal } from '@geist-ui/react-icons';
import { TableProps } from '@geist-ui/react/dist/table/table';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Grid } from './styled';

interface Props extends TableProps {
  pathname: string;
  notas: [
    {
      sefaz: {
        cor: 'secondary' | 'success' | 'error' | 'warning' | 'default';
        mensagem: string;
      };
      portaria: {
        cor: 'secondary' | 'success' | 'error' | 'warning' | 'default';
        mensagem: string;
      };
      divergencia: {
        cor: 'secondary' | 'success' | 'error' | 'warning' | 'default';
        mensagem: string;
      };
      fisico: {
        cor: 'secondary' | 'success' | 'error' | 'warning' | 'default';
        mensagem: string;
      };
      frete_vinc_nfe: {
        cor: 'secondary' | 'success' | 'error' | 'warning' | 'default';
        mensagem: string;
      };
      integracao: {
        cor: 'secondary' | 'success' | 'error' | 'warning' | 'default';
        mensagem: string;
      };
    },
  ];
}

export default function TabelaControle({ notas, pathname }: Props) {
  const router = useRouter();

  const xmls = useMemo(() => {
    const xmls: any = [];
    if (notas) {
      notas.forEach(item => {
        xmls.push({
          ...item,
          sefaz: (
            <Tooltip text={item.sefaz?.mensagem} type={item.sefaz?.cor}>
              <Dot type={item.sefaz?.cor} />
            </Tooltip>
          ),

          portaria_status: (
            <Tooltip text={item.portaria?.mensagem} type={item.portaria?.cor}>
              <Dot type={item.portaria?.cor} />
            </Tooltip>
          ),
          diverg_status: (
            <Tooltip
              text={item.divergencia?.mensagem}
              type={item.divergencia?.cor}
            >
              <Dot type={item.divergencia?.cor} />
            </Tooltip>
          ),
          fisico_status: () => (
            <Tooltip text={item.fisico?.mensagem} type={item.fisico?.cor}>
              <Dot type={item.fisico?.cor} />
            </Tooltip>
          ),
          integracao_status: (
            <Tooltip
              text={item.integracao?.mensagem}
              type={item.integracao?.cor}
            >
              <Dot type={item.integracao?.cor} />
            </Tooltip>
          ),
          frete_status: (
            <Tooltip
              text={item.frete_vinc_nfe?.mensagem}
              type={item.frete_vinc_nfe?.cor}
            >
              <Dot type={item.frete_vinc_nfe?.cor} />
            </Tooltip>
          ),

          opcoes: (actions: any, item: any) => (
            <Popover
              placement="right"
              content={
                <>
                  <Popover.Item>
                    <Text
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        const chave_nota = item.rowValue.chave_nota;
                        const status_sefaz = Number(item.rowValue.sefaz_status);
                        const desc_status_sefaz =
                          item.rowValue.sefaz_status_desc;
                        console.log(item);
                        router.push({
                          pathname,
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
                  <Popover.Item>
                    <Popover
                      placement="right"
                      content={
                        <>
                          <Popover.Item>
                            <Link href="#">Ciência</Link>
                          </Popover.Item>
                          <Popover.Item>
                            <Link href="#">Confirmação</Link>
                          </Popover.Item>
                          <Popover.Item>
                            <Link href="#">Operação não realizada</Link>
                          </Popover.Item>
                          <Popover.Item>
                            <Link href="#">Desconhecimento</Link>
                          </Popover.Item>
                        </>
                      }
                    >
                      Registrar evento
                    </Popover>
                  </Popover.Item>
                  <Popover.Item>
                    <Link href="#">Histórico de nota</Link>
                  </Popover.Item>
                </>
              }
            >
              <span style={{ cursor: 'pointer' }}>
                <MoreHorizontal />
              </span>
            </Popover>
          ),
        });
      });
    }
    return xmls;
  }, [notas]);

  return (
    <>
      {xmls.length ? (
        <Grid>
          <Table data={xmls}>
            <Table.Column prop="opcoes" />
            <Table.Column prop="dt_hr_emi" label="Emissão" />
            <Table.Column prop="nota" label="Número" />
            <Table.Column prop="serie" label="Série" />
            <Table.Column prop="emit_cnpj" label="CNPJ emitente" />
            <Table.Column prop="emit_nome" label="Fornecedor" />
            <Table.Column prop="sefaz" label="Status sefaz" />
            <Table.Column prop="portaria_status" label="Status portaria" />
            <Table.Column prop="diverg_status" label="Status divergência" />
            <Table.Column
              prop="fisico_status"
              label="Status físico"
              width={0.2}
            />
            <Table.Column prop="integracao_status" label="Status integração" />
            <Table.Column prop="chave_nota" label="Chave de acesso" />
            <Table.Column prop="dest_cnpj" label="CNPJ destinatário" />
            <Table.Column prop="dest_nome" label="Destinatário" />
            <Table.Column prop="criado_em" label="data/hora recebimento" />
          </Table>
        </Grid>
      ) : (
        <NaoEncontrado />
      )}
    </>
  );
}
