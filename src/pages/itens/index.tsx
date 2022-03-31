import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useToasts, Dot, Tooltip } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Pages } from '@styles/pages';
import Pagination from '@material-ui/lab/Pagination';
import { Plus } from '@geist-ui/react-icons';
import { AddBtn } from '@styles/buttons';
import { TableGrid } from '@styles/tableStyle';
import { IProdutos } from '@services/itens/types';
import * as request from '@services/itens';
import Loader from '@components/Loader';
import Popover from '@components/Popover';
import DeleteModal from './modal';
import { useFiltro } from '@contexts/filtro-itens';
import Filtro from '@components/Filtro-Itens/Filter-Modal';
import { useSession } from 'next-auth/client';
import { ImportTableData } from './style';

export default function Produtos() {
  const [page, setPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1);
  const [, setToast] = useToasts();
  const router = useRouter();
  const [session] = useSession();
  const [loading, setLoading] = useState(true);

  const { itens } = useFiltro();

  const [data, setData] = useState<IProdutos[]>([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [productId, setProductId] = useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getProductsData = useCallback(async () => {
    try {
      const response = await request.GetProductsPagination(
        page,
        itens,
        Number(session?.usuario.empresa.id),
      );
      const data = response.data;
      // console.log('data', data);
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
  }, [page, itens]);

  useEffect(() => {
    getProductsData();
  }, [page, itens]);

  const gatheredData = useMemo(() => {
    const allData: IProdutos[] = [];
    if (data) {
      data.forEach((item, i) => {
        allData.push({
          ...item,
          status_rastro: (
            <Tooltip
              text={item.controle_rastro ? 'Possui Rastro' : 'Sem Rastro'}
            >
              <Dot type={item.controle_rastro ? 'success' : 'warning'} />
            </Tooltip>
          ),
          option: (
            <Popover
              num={i}
              quant={4}
              content={[
                {
                  optionName: 'Visualizar',
                  onClick: () => {
                    router.push({
                      pathname: '/itens-detalhes',
                      query: { action: 'visualizar', id: item.id },
                    });
                  },
                  className: 'able',
                },
                {
                  optionName: 'Item/Filial',
                  onClick: () => 'Item/Filial',
                  className: 'able',
                },
                {
                  optionName: 'Editar',
                  onClick: () => {
                    router.push({
                      pathname: '/itens-detalhes',
                      query: { action: 'editar', id: item.id },
                    });
                  },
                  className: 'able',
                },
                {
                  optionName: 'Excluir',
                  onClick: () => {
                    setVisibleModal(true), setProductId(item.id);
                  },
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

  const uploadFileData = useCallback(async e => {
    // console.log('e.target.files[0', e.target.files[0]);
    // console.log('vim aqui');
    try {
      await request.UploadExcelFile(e.target.files[0], {
        id_empresa: session?.usuario.empresa.id,
        arquivo: '',
        status: 0,
        desc_status: 'confirmado',
      });
      setToast({
        text: 'Upload realizado com sucesso',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Orion | Itens</title>
      </Head>
      <h2 style={{ marginBottom: '0' }}>Itens</h2>
      {visibleModal && (
        <DeleteModal
          setVisibleModal={setVisibleModal}
          data={data}
          setData={setData}
          id={productId}
        />
      )}
      <ImportTableData>
        <label htmlFor="upload">
          <h5>Importar dados</h5>
          <input type="file" id="upload" onChange={e => uploadFileData(e)} />
        </label>
      </ImportTableData>
      <AddBtn style={{ gap: '10px' }}>
        <Filtro data={itens} />
        <button onClick={() => router.push('/cadastrar-itens')}>
          <span>
            <Plus />
          </span>
          Adicionar
        </button>
      </AddBtn>
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
                <td>{item.status_rastro}</td>
                <td>{item.ean}</td>
                <td>{item.um_primaria}</td>
                <td>{item.um_secundaria}</td>
                <td>{item.um_compras}</td>
                <td>{item.peso}</td>
                <td>{item.volume}</td>
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
