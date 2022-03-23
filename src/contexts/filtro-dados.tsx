import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { createContext } from 'react';
import { InitalDados, ILabels } from '@utils/filtros/colunas_dados';
// import colunas_dados from '@components/Filtro-Dados'
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react';
import { IDados } from '@services/cadastros/types';
import * as request from '@services/cadastros';

interface IUnformCompare {
  campo: string;
  valor: string | number;
  compare: string;
}

interface ILabelProps {
  value: string;
  label: any;
}

interface IFilter {
  dados: IUnformCompare[];
  registerData(categorias: IUnformCompare[]): void;
  cleanDataFilter(): void;
  scopeIgnition(filtro: IUnformCompare[]): IUnformCompare[];
  dataLabels: ILabels;
  colunas_dados: ILabelProps[];
}

interface IFiltroProps {
  children: ReactNode;
}

export const FiltroDadosContext = createContext({} as IFilter);

export function useFiltro() {
  return useContext(FiltroDadosContext);
}

export default function FiltroContextProvider({ children }: IFiltroProps) {
  const [dados, setDados] = useState<IUnformCompare[]>([]);
  const [dataLabels, setDataLabels] = useState({ ...InitalDados });

  const colunas_dados = [
    { value: 'chave_1', label: dataLabels?.chave_1 },
    { value: 'chave_2', label: dataLabels?.chave_2 },
    { value: 'chave_3', label: dataLabels?.chave_3 },
    { value: 'chave_4', label: dataLabels?.chave_4 },
    { value: 'chave_5', label: dataLabels?.chave_5 },
    { value: 'chave_6', label: dataLabels?.chave_6 },
    { value: 'chave_7', label: dataLabels?.chave_7 },
    { value: 'chave_8', label: dataLabels?.chave_8 },
    { value: 'valor_string_1', label: dataLabels?.valor_string_1 },
    { value: 'valor_string_2', label: dataLabels?.valor_string_2 },
    { value: 'valor_string_3', label: dataLabels?.valor_string_3 },
    { value: 'valor_string_4', label: dataLabels?.valor_string_4 },
    { value: 'valor_string_5', label: dataLabels?.valor_string_5 },
    { value: 'valor_string_6', label: dataLabels?.valor_string_6 },
    { value: 'valor_string_7', label: dataLabels?.valor_string_7 },
    { value: 'valor_string_8', label: dataLabels?.valor_string_8 },
    { value: 'valor_string_9', label: dataLabels?.valor_string_9 },
    { value: 'valor_string_10', label: dataLabels?.valor_string_10 },
    { value: 'valor_number_1', label: dataLabels?.valor_number_1 },
    { value: 'valor_number_2', label: dataLabels?.valor_number_2 },
    { value: 'valor_number_3', label: dataLabels?.valor_number_3 },
    { value: 'valor_number_4', label: dataLabels?.valor_number_4 },
    { value: 'valor_number_5', label: dataLabels?.valor_number_5 },
    { value: 'valor_date_1', label: dataLabels?.valor_date_1 },
    { value: 'valor_date_2', label: dataLabels?.valor_date_2 },
    { value: 'valor_date_3', label: dataLabels?.valor_date_3 },
  ];

  async function getData(configId: number) {
    try {
      const response = await request.GetConfigById(configId, []);
      const data = response.data;
      console.log('data', data);
      setDataLabels({
        ...dataLabels,
        chave_1: data.chave_1,
        chave_2: data.chave_2,
        chave_3: data.chave_3,
        chave_4: data.chave_4,
        chave_5: data.chave_5,
        chave_6: data.chave_6,
        chave_7: data.chave_7,
        chave_8: data.chave_8,
        valor_date_1: data.valor_date_1,
        valor_date_2: data.valor_date_2,
        valor_date_3: data.valor_date_3,
        valor_number_1: data.valor_number_1,
        valor_number_2: data.valor_number_2,
        valor_number_3: data.valor_number_3,
        valor_number_4: data.valor_number_4,
        valor_number_5: data.valor_number_5,
        valor_string_1: data.valor_string_1,
        valor_string_2: data.valor_string_2,
        valor_string_3: data.valor_string_3,
        valor_string_4: data.valor_string_4,
        valor_string_5: data.valor_string_5,
        valor_string_6: data.valor_string_6,
        valor_string_7: data.valor_string_7,
        valor_string_8: data.valor_string_8,
        valor_string_9: data.valor_string_9,
        valor_string_10: data.valor_string_10,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function carregarStorage() {
      const categoryStorage = localStorage.getItem('@orion:dados');
      if (categoryStorage) {
        setDados(JSON.parse(categoryStorage));
      }
    }
    carregarStorage();
  }, []);

  function registerData(dados: IUnformCompare[]) {
    setDados(dados);
    localStorage.setItem('@orion:cdados', JSON.stringify(dados));
  }

  function scopeIgnition(array: IUnformCompare[]): IUnformCompare[] {
    // console.log('array', array)
    const filtro = array.map(({ campo, valor, compare }) => {
      const coluna = colunas_dados.find(option => option.value === campo);
      if (coluna) {
        return { campo, valor, compare };
      }
    });

    return filtro;
  }

  async function cleanDataFilter() {
    localStorage.setItem('@orion:dados', JSON.stringify([]));
  }

  useEffect(() => {
    getData(11);
  }, []);

  useEffect(() => {
    console.log('dados', dados);
  }, [dados]);

  useEffect(() => {
    console.log('labels', dataLabels);
  }, [dataLabels]);

  return (
    <FiltroDadosContext.Provider
      value={{
        dados,
        registerData,
        cleanDataFilter,
        scopeIgnition,
        dataLabels,
        colunas_dados,
      }}
    >
      {children}
    </FiltroDadosContext.Provider>
  );
}
