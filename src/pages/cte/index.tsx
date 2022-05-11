import React, { useMemo, useCallback, useState, useEffect } from 'react';
import Filtro from '@components/Filtro-Notas/Filter-Modal';
import { useFiltro } from '@contexts/filtro';
import { RowBtn } from './style';
import Head from 'next/head';
import { RefreshCw } from '@geist-ui/react-icons';
import { RefreshBtn } from '@styles/RefreshBtn';
import Loader from '@components/Loader';
import { useSession } from 'next-auth/client';
import { useSecurityContext } from '@contexts/security';
import { Dot, Tooltip, useToasts } from '@geist-ui/react';
import INfeDto from '@services/nfe/dtos/INfeDTO';
import getCteByCompanyId from '@services/cte';
import { format } from 'date-fns';
import PopoverCte from '@components/CtePagination/Popover';
import Pagination from '@material-ui/lab/Pagination';
import { Pages } from '@styles/pages';
import { TableGrid } from '@styles/tableStyle';
import getCteXml from '@services/cte/getCteXml';
import Dacte from '@components/dacte';
import Popover from '@components/Popover';
import { useRouter } from 'next/router';

interface Props {
  company_id: number;
  sefaz?: {
    cor: 'secondary' | 'success' | 'error' | 'warning' | 'default';
    message: string;
  };
  portaria?: {
    cor: 'secondary' | 'success' | 'error' | 'warning' | 'default';
    message: string;
  };
}

export default function Cte({ sefaz, portaria }: Props) {
  const { ctes } = useFiltro();
  const [cte, setCte] = useState<INfeDto[]>([]);
  const [page, setPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1);
  const { ctePermissions } = useSecurityContext();
  const [, setToast] = useToasts();
  const [loading, setLoading] = useState(true);
  const [session] = useSession();
  const company_id = Number(session?.usuario.empresa.id);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getCtesAndTotalPages = useCallback(async () => {
    try {
      const responseCtes = await getCteByCompanyId(company_id, page, ctes);
      const { data } = responseCtes;
      setCte(data.ctes);

      setLoading(false);
      setQuantityPage(Math.ceil(data.total / 8));
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Notas não localizadas',
        type: 'warning',
      });
    }
  }, [ctes, page]);

  useEffect(() => {
    getCtesAndTotalPages();
  }, [ctes, page]);

  useEffect(() => {
    if (page > quantityPage) {
      setPage(1);
    }
  }, [ctes, quantityPage, page]);

  const printData = useCallback(async chave_nota => {
    const cteData = [];
    const medidasArray = [];
    const produtosArray = [];
    try {
      const response = await getCteXml(chave_nota);
      const cteResponse = response.data;
      if (Array.isArray(cteResponse)) {
        const medidas = cteResponse.map(
          item => item.informacoes_normal_substituto.infCarga.infQ,
        );
        const produtos = cteResponse.map(item => item.valores_servicos.Comp);
        Dacte(cteResponse, medidas, produtos, chave_nota);
      } else {
        cteData.push(cteResponse);
        const medidas = cteResponse.informacoes_normal_substituto.infCarga.infQ;
        const produtos = cteResponse.valores_servicos.Comp;
        // console.log("etapa 1", medidas)
        if (Array.isArray(medidas) && Array.isArray(produtos)) {
          Dacte(cteData, medidas, produtos, chave_nota);
        } else {
          medidasArray.push(medidas);
          produtosArray.push(produtos);
          Dacte(cteData, medidasArray, produtosArray, chave_nota);
        }
      }
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema, por favor tente novamente',
        type: 'warning',
      });
    }
  }, []);

  const gatheredData = useMemo(() => {
    const newData: any = [];
    if (cte) {
      cte.forEach((item, i) => {
        newData.push({
          ...item,
          sefaz_status: (
            <Tooltip
              text={
                item.sefaz_status === 100
                  ? 'Autorizada'
                  : item.sefaz_status === 101
                  ? 'Cancelada'
                  : 'Indisponível'
              }
              type={sefaz?.cor}
            >
              <Dot
                type={
                  item.sefaz_status === 100
                    ? 'success'
                    : item.sefaz_status === 101
                    ? 'warning'
                    : 'default'
                }
              />
            </Tooltip>
          ),
          portaria_status: (
            <Tooltip
              text={
                item.controle_entrada?.status === 0
                  ? 'Na Portaria'
                  : item.controle_entrada?.status === 1
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
                  item.controle_entrada?.status === 0
                    ? 'warning'
                    : item.controle_entrada?.status === 1
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
              quant={4}
              content={[
                {
                  optionName: 'Visualizar',
                  onClick: ctePermissions.VISUALIZAR
                    ? () => {
                        const chave_nota = item?.chave_nota;
                        const status_sefaz = Number(item?.sefaz_status);
                        const desc_status_sefaz = item?.sefaz_status_desc;
                        router.push({
                          pathname: `/cte-detalhes`,
                          query: {
                            chave_nota,
                            status_sefaz,
                            desc_status_sefaz,
                          },
                        });
                      }
                    : () => '',
                  className: ctePermissions.VISUALIZAR ? 'able' : 'disabled',
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
                  optionName: 'Histórico de nota',
                  onClick: ctePermissions.HISTORICO
                    ? () => {
                        const chave_nota = item?.chave_nota;
                        const empresa_id = item?.empresa_id;
                        router.push({
                          pathname: `/historico-notas`,
                          query: { chave_nota, empresa_id },
                        });
                      }
                    : () => '',
                  className: ctePermissions.HISTORICO ? 'able' : 'disabled',
                },
                {
                  optionName: 'Imprimir Nota',
                  onClick: ctePermissions.IMPRIMIR
                    ? () => {
                        const chave_nota = item?.chave_nota;
                        printData(chave_nota);
                      }
                    : () => '',
                  className: ctePermissions.IMPRIMIR ? 'able' : 'disabled',
                },
              ]}
            />
          ),
        });
      });
    }

    return newData;
  }, [cte]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Orion | Painel de Controle CT-e</title>
      </Head>
      <h2>Painel de Controle CT-e</h2>
      <RowBtn>
        <RefreshBtn>
          <RefreshCw
            onClick={() => {
              setLoading(true);
              getCtesAndTotalPages();
            }}
          />
        </RefreshBtn>
        <Filtro abaAtual="cte" data={ctes} />
      </RowBtn>
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
              <th>Destinatário</th>
              <th>Data/hora Recebimento</th>
            </tr>
          </thead>
          {ctePermissions.VISUALIZAR && (
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

Cte.auth = true;
