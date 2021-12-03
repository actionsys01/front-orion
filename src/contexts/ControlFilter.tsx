import { useEffect,  Dispatch, SetStateAction } from "react";
import { useContext, useState } from "react";
import { createContext } from "react";
import colunas from "@utils/filtros-controle";
import { ReactNode } from "hoist-non-react-statics/node_modules/@types/react";

interface IUnform {
  campo: string
  valor: string
}
interface IFiltro {
  campo : string
  valor: string
}



interface FiltroContextType {
  filters: IFiltro[];
  registerFilter( filters: IFiltro[]): void
  scopeIgnition(filtro: IUnform[]): IFiltro[];
  limpar(): void;
}

interface FilterProps {
  [key: string] : string;
}

interface IFiltroProps{
  children : ReactNode
}

export const ControlFilterContext = createContext({} as FiltroContextType);

export function useControlFilter() {
  return useContext(ControlFilterContext);
}

export default function ControlFilterProvider({ children } : IFiltroProps) {
  const [filters, setFilters] = useState<IFiltro[]>([]);


  useEffect(() => {
    async function loadStorage() {
      const controlStorage = localStorage.getItem("filtersObj");
      if (controlStorage) setFilters(JSON.parse(controlStorage));
    }
    // console.log(`filters no context`, filters)
    loadStorage();
  }, []);


  function registerFilter(filters: IFiltro[]) {
    setFilters(filters);
    localStorage.setItem("filtersObj", JSON.stringify(filters));
  }

  function scopeIgnition(array: IUnform[]): IFiltro[] {
    let filtro = array.map(({campo, valor}) => {
      const coluna =  colunas.find((option) => option.value === campo)
      if(coluna) {
        return { campo ,valor}
      }
    });

    return filtro;
  }

  async function limpar() {
    localStorage.setItem("filtersObj", JSON.stringify([]));
  }

  return (
    <ControlFilterContext.Provider
      value={{
        filters,
        registerFilter,
        scopeIgnition,
        limpar,
      }}
    >
      {children}
    </ControlFilterContext.Provider>
  );
}
