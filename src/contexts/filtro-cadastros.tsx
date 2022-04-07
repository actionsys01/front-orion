import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { createContext } from 'react';
import colunas_categorias from '@utils/filtros/colunas/colunas_categorias';
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react';

interface IUnformCompare {
  campo: string;
  valor: string | number;
  compare: string;
}

interface IFilter {
  categorias: IUnformCompare[];
  registerCategory(categorias: IUnformCompare[]): void;
  cleanFilter(): void;
  // scopeIgnition(filtro: IUnformCompare[]): IUnformCompare[];
}

interface IFiltroProps {
  children: ReactNode;
}

export const FiltroCadastroContext = createContext({} as IFilter);

export function useFiltro() {
  return useContext(FiltroCadastroContext);
}

export default function FiltroContextProvider({ children }: IFiltroProps) {
  const [categorias, setCategorias] = useState<IUnformCompare[]>([]);

  useEffect(() => {
    async function carregarStorage() {
      const categoryStorage = localStorage.getItem('@orion:categorias');
      if (categoryStorage) {
        setCategorias(JSON.parse(categoryStorage));
      }
    }
    carregarStorage();
  }, []);

  function registerCategory(category: IUnformCompare[]) {
    setCategorias(category);
    localStorage.setItem('@orion:categorias', JSON.stringify(category));
  }

  // function scopeIgnition(array: IUnformCompare[]): IUnformCompare[] {
  //   // console.log('array', array)
  //   const filtro = array.map(({ campo, valor, compare }) => {
  //     const coluna = colunas_categorias.find(option => option.value === campo);
  //     if (coluna) {
  //       return { campo, valor, compare };
  //     }
  //   });

  //   return filtro;
  // }

  async function cleanFilter() {
    localStorage.setItem('@orion:categorias', JSON.stringify([]));
  }

  // useEffect(() => {
  //   console.log('categorias', categorias)
  // }, [categorias])


  return (
    <FiltroCadastroContext.Provider
      value={{
        categorias,
        registerCategory,
        cleanFilter,
        // scopeIgnition,
      }}
    >
      {children}
    </FiltroCadastroContext.Provider>
  );
}
