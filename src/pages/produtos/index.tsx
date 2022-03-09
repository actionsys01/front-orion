import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import { Pages } from '@styles/pages';
import Pagination from '@material-ui/lab/Pagination';
import { Plus, Filter } from '@geist-ui/react-icons';
import { BtnRow } from '@styles/buttons';
import { TableGrid } from '@styles/tableStyle';
import { IProdutos } from '@services/produtos/types';
import * as request from '@services/produtos';
import Loader from '@components/Loader';
import Popover from '@components/Popover';

export default function Produtos() {
  const [page, setPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1);
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<IProdutos[]>([]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getProductsData = useCallback(async () => {
    try {
      const response = await request.GetProductsPagination(page);
      const data = response.data;
      setData(data.produtos);
      setLoading(false);
      setQuantityPage(Math.ceil(data.total / 8));
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }, [page]);

  useEffect(() => {
    getProductsData();
  }, [page]);

  const gatheredData = useMemo(() => {
    const allData: IProdutos[] = [];
    if (data) {
      data.forEach((item, i) => {
        allData.push({
          ...item,
          option: (
            <Popover
              num={i}
              quant={4}
              content={[
                {
                  optionName: 'Visualizar',
                  onclick: () => 'Visualizar',
                  className: 'able',
                },
                {
                  optionName: 'Item/Filial',
                  onclick: () => 'Item/Filial',
                  className: 'able',
                },
                {
                  optionName: 'Editar',
                  onclick: () => 'Editar',
                  className: 'able',
                },
                {
                  optionName: 'Excluir',
                  onclick: () => 'Excluir',
                  className: 'able',
                },
              ]}
            />
          ),
        });
      });
    }
    // console.log('allData', allData);
    return allData;
  }, [data]);

  return (
    <>
      <Head>
        <title>Orion | Produtos</title>
      </Head>
      <h2>Produtos</h2>
      <BtnRow>
        <button>
          <span>
            <Filter />
          </span>
          Filtrar
        </button>
        <button onClick={() => router.push('/produtos/dados-gerais')}>
          <span>
            <Plus />
          </span>
          Adicionar
        </button>
      </BtnRow>
      <TableGrid>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Código do Produto</th>
              <th>Classe Contábil</th>
              <th>Origem</th>
              <th>Controle de Rastro/Lote</th>
              <th>EAN</th>
              <th>UM Primária</th>
              <th>UM Secundária</th>
              <th>UM de Compras</th>
              <th>Peso (Kg)</th>
              <th>Volume</th>
              <th>Finalidade da Compra</th>
              {/* <th>Entrada</th>
              <th>Saída</th> */}
            </tr>
          </thead>
          <tbody>
            {gatheredData.map((item: IProdutos, i: number) => (
              <tr key={i}>
                <td>{item.option}</td>
                <td>{item.desc_produto}</td>
                <td>{item.cod_produto}</td>
                <td>{item.classe_contabil}</td>
                <td>{item.origem}</td>
                <td>{item.controle_rastro}</td>
                <td>{item.ean}</td>
                <td>{item.um_primaria}</td>
                <td>{item.um_secundaria}</td>
                <td>{item.um_compras}</td>
                <td>{item.peso}</td>
                <td>{item.volume}</td>
                <td>{item.finalidade_compra}</td>
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

Produtos.auth = true;
