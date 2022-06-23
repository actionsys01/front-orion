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
import * as request from '@services/referencia-cruzada';
import { IFornecedores } from '@services/referencia-cruzada/types';
import { TableGrid } from '@styles/tableStyle';
import Popover from '@components/Popover';
import { useFiltro } from '@contexts/filtro-fornecedores-referencia-cruzada';
import Filtro from '@components/Filtro-Referencia-Cruzada-Fornecedores/Filter-Modal';
import Loader from '@components/Loader';




export interface IData {
  option: JSX.Element;
  codigo_pessoa?: number;
  cnpj?: string;
  nome?: string;
}


export default function GetFornecedores() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

  const [dataPessoas, setDataPessoas] = useState<IFornecedores[]>([]);
  const [page, setPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dataId, setDataId] = useState(0);
  const { dadosFornecedores } = useFiltro();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getRefcAndTotalPages = useCallback(async () => {
    try {
      
      const response = await request.GetReferenciaCruzadaFornecedores(
        dadosFornecedores,
        page
      );
      console.log('response', response)
      
        const {pessoas} = response.data
      setDataPessoas(pessoas)
      
    
    setLoading(false);
    setQuantityPage(Math.ceil(pessoas.length / 8));
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }, [page, dadosFornecedores]);

  useEffect(() => {
    getRefcAndTotalPages();
  }, [page, dadosFornecedores]);

  useEffect(() => {
    console.log('dadosFornecedores', dadosFornecedores)
  }, [dadosFornecedores])
  

  useEffect(() => {
    if (page > quantityPage) {
      setPage(1);
    }
  }, [quantityPage, page, dadosFornecedores]);

  const gatheredData = useMemo(() => {
    const allData: IData[] = [];
    
    if (dataPessoas) {
      dataPessoas.forEach((item, i) => {
        allData.push({
          ...item,
          option: (
            <Popover
              num={i}
              quant={1}
              content={[
                {
                  optionName: 'Selecionar',
                  onClick: () => {
                    router.push({
                      pathname: '/referencia-cruzada/referencia-cruzada-itens-fornecedores',
                      query: {
                        codigo_pessoa: Number(item.codigo_pessoa),
                        cnpj: item.cnpj,
                        nome: item.nome,
                        // app: item.aplicacao,
                      },
                    });
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
  }, [dataPessoas]);

  // if (loading) {
  //   return <Loader />;
  // }

  useEffect(() => {
    console.log('data', dataId);
  }, [dataId]);

  return (
    <>
      <Head>
        <title>Orion | Refer. Cruzada - Fornecedores </title>
      </Head>
      <BotaoVoltar />
      <h2>Refer. Cruzada - Fornecedores</h2>
      <BtnRow>
        <Filtro data={dadosFornecedores}/>
      </BtnRow>
      <TableGrid>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Codigo</th>
              <th>CNPJ</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {gatheredData.map((item, i) => (
              <tr key={i}>
                <td>{item.option}</td>
                <td>{item.codigo_pessoa}</td>
                <td>{item.cnpj}</td>
                <td>{item.nome}</td>
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

GetFornecedores.auth = true;
