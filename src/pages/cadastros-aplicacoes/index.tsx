import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import { BtnRow } from '@styles/buttons';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import { Pages } from '@styles/pages';
import Pagination from '@material-ui/lab/Pagination';
import { Plus, Filter } from '@geist-ui/react-icons';
import * as companyRequest from '@services/empresas';
import * as request from '@services/cadastros';
import { IConfigData } from '@services/cadastros/types';
import { TableGrid } from '@styles/tableStyle';
import Popover from '@components/Popover';
import paginate from '@utils/paginate';
import DeleteModal from './modal';
import { useFiltro } from '@contexts/filtro-cadastros';
import Filtro from '@components/Filtro-cadastros/Filter-Modal';

export interface IData {
  aplicacao: string;
  desc_aplicacao: string;
  option: JSX.Element;
}

export default function CadastroApps() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

  const [data, setData] = useState<IConfigData[]>([]);
  const [page, setPage] = useState(0);
  const [quantityPage, setQuantityPage] = useState(1);
  const [visibleModal, setVisibleModal] = useState(false);
  const [dataId, setDataId] = useState(0);
  const { categorias } = useFiltro();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const getCompanyTables = useCallback(async () => {
    try {
      const company_response = await companyRequest.getCompanyById(
        Number(session?.usuario.empresa.id),
      );
      const company_data = company_response.data.categoria_id;
      const company_id = company_data
        .filter(item => item.cod_categoria === 'Geral')
        .map(i => i.id);
      const response = await request.GetCategoryByCode(
        Number(company_id),
        categorias,
      );
      const data = paginate(response.data);
      setData(data[page]);
      setQuantityPage(Math.ceil(data.length));
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }, [page, categorias]);

  useEffect(() => {
    getCompanyTables();
  }, [page, categorias]);

  const gatheredData = useMemo(() => {
    const allData: IData[] = [];
    if (data) {
      data.forEach((item, i) => {
        allData.push({
          ...item,
          option: (
            <Popover
              num={i}
              content={[
                {
                  optionName: 'Selecionar',
                  onClick: () => {
                    router.push({
                      pathname: '/cadastros-dados',
                      query: {
                        id: item.id,
                        app: item.aplicacao,
                      },
                    });
                  },
                  className: 'able',
                },
                {
                  optionName: 'Editar',
                  onClick: () => {
                    router.push({
                      pathname: '/atualizar-aplicacoes',
                      query: {
                        app: item.aplicacao,
                        id: item.id,
                        desc: item.desc_aplicacao,
                        cod: 'Geral',
                      },
                    });
                  },
                  className: 'able',
                },
                {
                  optionName: 'Excluir',
                  onClick: () => {
                    setVisibleModal(true);
                    setDataId(item.id);
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
  }, [data]);

  useEffect(() => {
    console.log('data', dataId);
  }, [dataId]);

  return (
    <>
      <Head>
        <title>Orion | Aplicações</title>
      </Head>
      <BotaoVoltar />
      <h2>Aplicativos</h2>
      {visibleModal && (
        <DeleteModal
          setVisibleModal={setVisibleModal}
          data={data}
          setData={setData}
          id={dataId}
        />
      )}
      <BtnRow>
        <Filtro data={categorias} />
      </BtnRow>
      <TableGrid>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {gatheredData.map((item, i) => (
              <tr key={i}>
                <td>{item.option}</td>
                <td>{item.aplicacao}</td>
                <td>{item.desc_aplicacao}</td>
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

CadastroApps.auth = true;
