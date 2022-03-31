import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { createContext } from 'react';
import colunas_itens from '@utils/filtros/colunas/colunas_itens';
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react';

interface IUnformCompare {
  campo: string;
  valor: string | number;
  compare: string;
}

interface IFilter {
  itens: IUnformCompare[];
  registerItem(itens: IUnformCompare[]): void;
  cleanItemFilter(): void;
  scopeIgnition(filtro: IUnformCompare[]): IUnformCompare[];
}

interface IFiltroProps {
  children: ReactNode;
}

export const FiltroItemContext = createContext({} as IFilter);

export function useFiltro() {
  return useContext(FiltroItemContext);
}

export default function FiltroContextProvider({ children }: IFiltroProps) {
  const [itens, setItens] = useState<IUnformCompare[]>([]);

  useEffect(() => {
    async function carregarStorage() {
      const itemStorage = localStorage.getItem('@orion:itens');
      if (itemStorage) {
        setItens(JSON.parse(itemStorage));
      }
    }
    carregarStorage();
  }, []);

  function registerItem(itens: IUnformCompare[]) {
    setItens(itens);
    localStorage.setItem('@orion:itens', JSON.stringify(itens));
  }

  function scopeIgnition(array: IUnformCompare[]): IUnformCompare[] {
    // console.log('array', array)
    const filtro = array.map(({ campo, valor, compare }) => {
      const coluna = colunas_itens.find(option => option.value === campo);
      if (coluna) {
        return { campo, valor, compare };
      }
    });

    return filtro;
  }

  async function cleanItemFilter() {
    localStorage.setItem('@orion:itens', JSON.stringify([]));
  }

  // useEffect(() => {
  //   console.log('itens', itens);
  // }, [itens]);

  return (
    <FiltroItemContext.Provider
      value={{
        itens,
        registerItem,
        cleanItemFilter,
        scopeIgnition,
      }}
    >
      {children}
    </FiltroItemContext.Provider>
  );
}
