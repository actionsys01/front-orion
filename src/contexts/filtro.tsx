import { useEffect, Dispatch, SetStateAction } from 'react';
import { useContext, useState } from 'react';
import { createContext } from 'react';
import colunas from '@utils/painel-controle-filtro';
import nfse_colunas from '@utils/controle-nfse-filtros';
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react';

interface IUnform {
    campo: string;
    valor: string;
}
interface IFiltro {
    campo: { label: string; value: string } | undefined;
    valor: string;
}

interface FiltroContextType {
    nfes: IUnform[];
    ctes: IFiltro[];
    nfses: IUnform[];
    cadastrarNfe(nfes: IUnform[]): void;
    cadastrarCte(ctes: IFiltro[]): void;
    cadastrarNfse(nfses: IUnform[]): void;
    inicializarScope(filtro: IUnform[]): IFiltro[];
    scopeIgnition(filtro: IUnform[]): IUnform[];
    limpar(): void;
}

interface IFiltroProps {
    children: ReactNode;
}

export const FiltroContext = createContext({} as FiltroContextType);

export function useFiltro() {
    return useContext(FiltroContext);
}

export default function FiltroProvider({ children }: IFiltroProps) {
    const [nfes, setNfes] = useState<IUnform[]>([]);
    const [ctes, setCtes] = useState<IFiltro[]>([]);
    const [nfses, setNfses] = useState<IUnform[]>([]);

    useEffect(() => {
        async function carregarStorage() {
            const nfesStorage = localStorage.getItem('@orions:nfes');
            const ctesStorage = localStorage.getItem('@orion:ctes');
            const nfsesStorage = localStorage.getItem('@orions:nfses');
            if (nfesStorage) setNfes(JSON.parse(nfesStorage));
            if (ctesStorage) setCtes(JSON.parse(ctesStorage));
            if (nfsesStorage) setNfses(JSON.parse(nfsesStorage));
        }

        carregarStorage();
    }, []);

    // useEffect(() => {

    //   console.log("FILTRO" , nfes)

    // }, [nfes])

    function cadastrarNfe(nfes: IUnform[]) {
        setNfes(nfes);
        localStorage.setItem('@orions:nfes', JSON.stringify(nfes));
    }

    function cadastrarCte(ctes: IFiltro[]) {
        setCtes(ctes);
        localStorage.setItem('@orion:ctes', JSON.stringify(ctes));
    }

    function cadastrarNfse(nfses: IUnform[]) {
        setNfses(nfses);
        localStorage.setItem('@orions:nfses', JSON.stringify(nfses));
    }

    function inicializarScope(array: IUnform[]): IFiltro[] {
        const filtro: IFiltro[] = [];

        array.forEach(item => {
            const { campo, valor } = item;
            const coluna = colunas.find(option => option.value === campo);
            filtro.push({ campo: coluna, valor: valor });
        });

        return filtro;
    }

    function scopeIgnition(array: IUnform[]): IUnform[] {
        const filtro = array.map(({ campo, valor }) => {
            const coluna = nfse_colunas.find(option => option.value === campo);
            if (coluna) {
                return { campo, valor };
            }
        });

        return filtro;
    }

    async function limpar() {
        localStorage.setItem('@orion:ctes', JSON.stringify([]));
        localStorage.setItem('@orions:nfes', JSON.stringify([]));
        localStorage.setItem('@orions:nfses', JSON.stringify([]));
    }

    return (
        <FiltroContext.Provider
            value={{
                nfes,
                ctes,
                nfses,
                cadastrarCte,
                cadastrarNfe,
                cadastrarNfse,
                inicializarScope,
                scopeIgnition,
                limpar,
            }}
        >
            {children}
        </FiltroContext.Provider>
    );
}
