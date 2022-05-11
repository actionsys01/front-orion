import React, { useMemo, useCallback, useState, useEffect } from 'react';

import { useFiltro } from '@contexts/filtro';
import { useSecurityContext } from '@contexts/security';

import Head from 'next/head';
import { useSession } from 'next-auth/client';
import { Dot, Tooltip } from '@geist-ui/react';
import Pagination from '@material-ui/lab/Pagination';
import { useRouter } from 'next/router';
import { useToasts } from '@geist-ui/react';
import { RefreshCw } from '@geist-ui/react-icons';
import { format } from 'date-fns';

import getNfeData from '@services/nfe/getNfeData';
import INfeDto from '@services/nfe/dtos/INfeDTO';
import getNfePagesByCompanyId from '@services/nfe';

import Filtro from '@components/Filtro-Notas/Filter-Modal';
import Danfe from '@components/danfe';
import Loader from '@components/Loader';
import Popover from '@components/Popover';

import { TableGrid } from '@styles/tableStyle';
import { Pages } from '@styles/pages';
import { RowBtn } from './style';
import { RefreshBtn } from '@styles/RefreshBtn';

interface Props {
  sefaz?: {
    cor: 'secondary' | 'success' | 'error' | 'warning' | 'default';
    message: string;
  };
  portaria?: {
    cor: 'success' | 'warning' | 'default' | 'error';
    message: string;
  };
}

export default function Nfe({ sefaz, portaria }: Props) {
  const { nfes } = useFiltro();
  const [session] = useSession();
  const router = useRouter();
  const [nfe, setNfes] = useState<INfeDto[]>([]);
  const [page, setPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1);
  const { nfePermissions } = useSecurityContext();
  const [, setToast] = useToasts();
  const [loading, setLoading] = useState(true);
  const company_id = Number(session?.usuario.empresa.id);
  // const [visible, setVisible] = useState(false);
  // const [item, setItem] = useState<any>();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getNfesAndTotalPages = useCallback(async () => {
    try {
      const responseNfes = await getNfePagesByCompanyId(
        page,
        Number(company_id),
        nfes,
      );
      const { data } = responseNfes;
      setLoading(false);
      setNfes(data.nfes);
      setQuantityPage(Math.ceil(data.total / 8));
    } catch (error) {
      setToast({
        text: 'Notas não localizadas',
        type: 'warning',
      });
    }
  }, [nfes, page]);

  useEffect(() => {
    getNfesAndTotalPages();
  }, [page, nfes]);

  useEffect(() => {
    if (page > quantityPage) {
      setPage(1);
    }
  }, [nfes, quantityPage, page]);

  const printData = async (nota, front) => {
    const nfeData: any = [];
    const nfeFrontData: any = [];
    const produtos: any = [];
    nfeFrontData.push(front);
    try {
      const response = await getNfeData(nota, company_id);
      const nfeResponse = response.data;
      if (Array.isArray(nfeResponse)) {
        const products = nfeResponse.map(item => item.produtos_servicos);
        Danfe(nfeResponse, nfeFrontData, products);
      } else {
        nfeData.push(nfeResponse);
        const products = nfeResponse.produtos_servicos;
        if (Array.isArray(products)) {
          Danfe(nfeData, nfeFrontData, products);
        } else {
          produtos.push(products);
          Danfe(nfeData, nfeFrontData, produtos);
        }
      }
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema, por favor tente novamente',
        type: 'warning',
      });
    }
  };

  const gatheredData = useMemo(() => {
    const newData: any = [];
    if (nfe) {
      nfe.forEach((item, i) => {
        newData.push({
          ...item,
          sefaz_status: (
            <Tooltip
              text={
                item?.sefaz_status === 999
                  ? 'Indisponível'
                  : item?.sefaz_status === 100
                  ? 'Autorizada'
                  : item?.sefaz_status === 101
                  ? 'Cancelada'
                  : 'Indisponível'
              }
              type={sefaz?.cor}
            >
              <Dot
                type={
                  item?.sefaz_status === 100
                    ? 'success'
                    : item?.sefaz_status === 101
                    ? 'warning'
                    : 'default'
                }
              />
            </Tooltip>
          ),
          portaria_status: (
            <Tooltip
              text={
                item?.controle_entrada?.status === 0
                  ? 'Na Portaria'
                  : item?.controle_entrada?.status === 1
                  ? 'Entrada Autorizada'
                  : item?.controle_entrada?.status === 2
                  ? 'Entrada Fechada'
                  : item?.controle_entrada?.status === 3
                  ? 'Não se Aplica'
                  : item?.controle_entrada?.status === 4
                  ? 'Entrega Cancelada'
                  : 'Aguardando Chegada'
              }
              type={portaria?.cor}
            >
              <Dot
                type={
                  item?.controle_entrada?.status === 0
                    ? 'warning'
                    : item?.controle_entrada?.status === 1
                    ? 'success'
                    : item?.controle_entrada?.status === 2
                    ? 'success'
                    : item?.controle_entrada?.status === 3
                    ? 'error'
                    : item?.controle_entrada?.status === 4
                    ? 'error'
                    : 'default'
                }
              />
            </Tooltip>
          ),
          emissionDate: format(new Date(item.dt_hr_emi), 'dd/MM/yyyy HH:mm:ss'),
          receiveDate: format(new Date(item.criado_em), 'dd/MM/yyyy HH:mm:ss'),
          option: (
            <Popover
              num={i}
              quant={5}
              content={[
                {
                  optionName: 'Visualizar',
                  onClick: nfePermissions.VISUALIZAR
                    ? () => {
                        const chave_nota = item?.chave_nota;
                        const status_sefaz = Number(item?.sefaz_status);
                        const desc_status_sefaz = item?.sefaz_status_desc;
                        router.push({
                          pathname: `/nfe-detalhes`,
                          query: {
                            chave_nota,
                            status_sefaz,
                            desc_status_sefaz,
                          },
                        });
                      }
                    : () => '',
                  className: nfePermissions.VISUALIZAR ? 'able' : 'disabled',
                },
                {
                  optionName: 'Registrar Evento',
                  onClick: () => '' /* {
                    setItem(item);
                    setVisible(!visible);
                  }, */,
                  className:
                    nfePermissions.CIENCIA ||
                    nfePermissions.CONFIRMACAO ||
                    nfePermissions.OPERACAO_NAO_REALIZADA ||
                    nfePermissions.DESCONHECIMENTO
                      ? 'able'
                      : 'disabled',
                },
                {
                  optionName: 'Histórico de nota',
                  onClick: nfePermissions.HISTORICO
                    ? () => {
                        const chave_nota = item?.chave_nota;
                        const empresa_id = item?.empresa_id;
                        router.push({
                          pathname: `/historico-notas`,
                          query: { chave_nota, empresa_id },
                        });
                      }
                    : () => '',
                  className: nfePermissions.HISTORICO ? 'able' : 'disabled',
                },
                {
                  optionName: (
                    <a href={item?.xml} download>
                      Download
                    </a>
                  ),
                  onClick: () => '',
                  className: 'able',
                },
                {
                  optionName: 'Imprimir Nota',
                  onClick: () => {
                    const front = item;
                    const nota = item.chave_nota;
                    printData(nota, front);
                  },
                  className: 'able',
                },
              ]}
            />
          ),
        });
      });
    }
    return newData;
  }, [nfe]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Orion | Painel de Controle NF-e</title>
      </Head>
      <h2>Painel de Controle NF-e</h2>
      <RowBtn>
        <RefreshBtn>
          <RefreshCw
            onClick={() => {
              setLoading(true);
              getNfesAndTotalPages();
            }}
          />
        </RefreshBtn>
        <Filtro abaAtual="nfe" data={nfes} />
      </RowBtn>
      {/* <PopoverEvento item={item} visible={visible} setVisible={setVisible} /> */}
      <TableGrid>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Data/hora Emissão</th>
              <th>Número</th>
              <th>Série</th>
              <th>CNPJ Fornecedor</th>
              <th>Nome Fornecedor</th>
              <th>Status Sefaz</th>
              <th>Status Entrada</th>
              <th>Chave de Acesso</th>
              <th>CNPJ Destinatário</th>
              <th>Destinatári</th>
              <th>Data/hora Recebimento</th>
            </tr>
          </thead>
          {nfePermissions.VISUALIZAR && (
            <tbody>
              {gatheredData.map((item, i) => (
                <tr key={i}>
                  <td>{item.option}</td>
                  <td>{item.emissionDate}</td>
                  <td>{item.nota}</td>
                  <td>{item.serie}</td>
                  <td>{item.emit_cnpj}</td>
                  <td>{item.emit_nome}</td>
                  <td>{item.sefaz_status}</td>
                  <td>{item.portaria_status}</td>
                  <td>{item.chave_nota}</td>
                  <td>{item.dest_cnpj}</td>
                  <td>{item.dest_nome}</td>
                  <td>{item.receiveDate}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </TableGrid>
      <Pages>
        <Pagination
          onChange={handleChange}
          count={quantityPage}
          shape="rounded"
        />
      </Pages>
    </>
  );
}

Nfe.auth = true;
