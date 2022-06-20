import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import { AddBtn, BtnRow } from '@styles/buttons';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import { Pages } from '@styles/pages';
import Pagination from '@material-ui/lab/Pagination';
import * as request from '@services/regras-busca';
import { IRegrasBusca } from '@services/regras-busca/types';
import { TableGrid } from '@styles/tableStyle';
import Popover from '@components/Popover';
import { useFiltro } from '@contexts/filtro-regras-busca';
import Filtro from '@components/Filtro-Regras-Busca/Filter-Modal';
import DeleteModal from './modal';

export interface IData {
  option: JSX.Element;
  cnpj_emitente?: string;
  tipo_nota?: string;
  tipo_informacao?: string;
  tag_xml?: string;
  dado_inicio?: string;
  dado_final?: string;
}

export default function RegrasDeBusca() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();
  const [visibleModal, setVisibleModal] = useState(false);
  const [dataRegrasBusca, setDataRegrasBusca] = useState<IRegrasBusca[]>([]);
  const [appData, setAppData] = useState<IData[]>([]);
  const [page, setPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dataId, setDataId] = useState(0);
  const { dadosRegrasBusca } = useFiltro();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getRegrasDeBuscaPagination = useCallback(async () => {
    try {
      
      const response = await request.GetRegrasBuscaPagination(
        dadosRegrasBusca,
        page
      );
      console.log('response', response)
      
        const {regras_busca} = response.data
        setDataRegrasBusca(regras_busca)
      
    
    setLoading(false);
    setQuantityPage(Math.ceil(regras_busca.length / 8));
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }, [page, dadosRegrasBusca]);

  useEffect(() => {
    getRegrasDeBuscaPagination();
  }, [page, dadosRegrasBusca]);

  useEffect(() => {
    if (page > quantityPage) {
      setPage(1);
    }
  }, [quantityPage, page, dadosRegrasBusca]);

  const gatheredData = useMemo(() => {
    const allData: IData[] = [];
    if (dataRegrasBusca) {
      dataRegrasBusca.forEach((item, i) => {
        allData.push({
          ...item,
          option: (
            <Popover
              num={i}
              quant={1}
              content={[
                {
                  optionName: 'Editar',
                  onClick: () => {
                    router.push({
                      pathname: '/atualizar-regras-busca',
                    });
                  },
                  className: 'able',
                },
                {
                  optionName: 'Excluir',
                  onClick: () => {
                    setVisibleModal(true), setDataId(item.id);
                  },
                  className: 'able',
                },
              ]}
            />
          ),
        });
      });
    }
    return allData;
  }, [dataRegrasBusca]);

  return (
    <>
      <Head>
        <title>Orion | Regras de Busca </title>
      </Head>
      <BotaoVoltar />
      <h2>Regras de Busca</h2>
      {visibleModal && (
        <DeleteModal
          setVisibleModal={setVisibleModal}
          data={appData}
          setData={setAppData}
          id={dataId}
        />
      )}
      <AddBtn style={{ gap: '10px' }}>
        <Filtro data={dadosRegrasBusca}/>
        <button onClick={() => router.push('/cadastrar-regras-busca')}>Adicionar</button>
      </AddBtn>
      <TableGrid>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>CNPJ Emitente</th>
              <th>Tipo Nota</th>
              <th>Tipo Informação</th>
              <th>Tag XML</th>
              <th>Inicio Dado</th>
              <th>Final Dado</th>
            </tr>
          </thead>
          <tbody>
            {gatheredData.map((item, i) => (
              <tr key={i}>
                <td>{item.option}</td>
                <td>{item.cnpj_emitente}</td>
                <td>{item.tipo_nota}</td>
                <td>{item.tipo_informacao}</td>
                <td>{item.tag_xml}</td>
                <td>{item.dado_inicio}</td>
                <td>{item.dado_final}</td>
              </tr>
            ))}
          </tbody>
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

RegrasDeBusca.auth = true;
