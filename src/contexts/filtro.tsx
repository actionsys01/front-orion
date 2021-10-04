import { useEffect } from "react";
import { useContext, useState } from "react";
import { createContext } from "react";
import colunas from "@utils/painel-controle-filtro";
import { ReactNode } from "hoist-non-react-statics/node_modules/@types/react";

interface IUnform {
  campo: string;
  valor: string;
}
interface IFiltro {
  campo: { label: string; value: string } | undefined;
  valor: string;
}

interface FiltroContextType {
  nfes: IFiltro[];
  ctes: IFiltro[];
  cadastrarNfe(nfes: IFiltro[]): void;
  cadastrarCte(ctes: IFiltro[]): void;
  inicializarScope(filtro: IUnform[]): IFiltro[];
  limpar(): void;
}

interface IFiltroProps{
  children : ReactNode
}

export const FiltroContext = createContext({} as FiltroContextType);

export function useFiltro() {
  return useContext(FiltroContext);
}

export default function FiltroProvider({ children } : IFiltroProps) {
  const [nfes, setNfes] = useState<IFiltro[]>([]);
  const [ctes, setCtes] = useState<IFiltro[]>([]);

  useEffect(() => {
    async function carregarStorage() {
      const nfesStorage = localStorage.getItem("@orions:nfes");
      const ctesStorage = localStorage.getItem("@orion:ctes");
      if (nfesStorage) setNfes(JSON.parse(nfesStorage));
      if (ctesStorage) setCtes(JSON.parse(ctesStorage));
    }

    carregarStorage();
  }, []);



  // useEffect(() => {

  //   console.log("FILTRO" , nfes)

  // }, [nfes])

  function cadastrarNfe(nfes: IFiltro[]) {
    setNfes(nfes);
    localStorage.setItem("@orions:nfes", JSON.stringify(nfes));
  }
  function cadastrarCte(ctes: IFiltro[]) {
    setCtes(ctes);
    localStorage.setItem("@orion:ctes", JSON.stringify(ctes));
  }

  function inicializarScope(array: IUnform[]): IFiltro[] {
    let filtro: IFiltro[] = [];

    array.forEach((item) => {
      const { campo, valor } = item;
      const coluna = colunas.find((option) => option.value === campo);
      filtro.push({ campo: coluna, valor: valor });
    });

    return filtro;
  }

  async function limpar() {
    localStorage.setItem("@orion:ctes", JSON.stringify([]));
    localStorage.setItem("@orions:nfes", JSON.stringify([]));
  }

  return (
    <FiltroContext.Provider
      value={{
        nfes,
        ctes,
        cadastrarCte,
        cadastrarNfe,
        inicializarScope,
        limpar,
      }}
    >
      {children}
    </FiltroContext.Provider>
  );
}
